from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from config import (
    API_PORT,
    DNS_ANDROID_HOST_OVERRIDE,
    IOS_DNS_INSTALL_URL,
    PAYMENT,
    TOKEN_SETS,
    get_nextdns_key,
    get_plan_type,
)
from orders import (
    build_memo,
    create_order,
    get_order,
    init_db,
    mark_order_done,
    order_to_status,
    payment_tx_used,
    update_order,
)
from services.locket import resolve_uid, upgrade_username
from services.nextdns import create_profile
from services.payment import PaymentConfigError, PaymentNotFoundError, verify_bank_transfer

app = FastAPI(title="fixlocketgold")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
init_db()


class UsernameRequest(BaseModel):
    username: str


class CreateOrderRequest(BaseModel):
    username: str
    planId: str
    amount: int


@app.get("/api/health")
async def health():
    import os

    has_tokens = any(s.get("fetch_token") and s.get("app_transaction") for s in TOKEN_SETS)
    has_sepay = bool((os.getenv("SEPAY_API_KEY") or "").strip())
    return {
        "ok": True,
        "service": "fixlocketgold",
        "tokens_ready": has_tokens,
        "sepay_ready": has_sepay,
    }


@app.get("/api/payment-config")
async def payment_config():
    return {"success": True, "data": PAYMENT}


@app.post("/api/user-info")
async def user_info(req: UsernameRequest):
    username = (req.username or "").strip()
    if not username:
        return {"success": False, "msg": "Thiếu UserName"}

    uid = await resolve_uid(username)
    if not uid:
        return {"success": False, "msg": "Không tìm thấy UserName trên Locket"}

    clean = username.lstrip("@")
    if "locket.cam/" in clean:
        clean = clean.split("locket.cam/")[-1].split("?")[0]

    return {"success": True, "data": {"username": clean, "uid": uid}}


@app.post("/api/order/create")
async def create_order_endpoint(req: CreateOrderRequest):
    username = (req.username or "").strip()
    plan_id = (req.planId or "").strip()
    amount = int(req.amount or 0)

    if not username:
        return {"success": False, "msg": "Thiếu UserName"}
    if not plan_id or amount <= 0:
        return {"success": False, "msg": "Thiếu thông tin gói"}

    uid = await resolve_uid(username)
    if not uid:
        return {"success": False, "msg": "Không tìm thấy UserName trên Locket"}

    memo = build_memo(amount, username)
    clean_username = memo.split("_", 1)[-1] if "_" in memo else username.strip().lstrip("@")
    order_id = create_order(clean_username, plan_id, amount, memo)

    return {
        "success": True,
        "orderId": order_id,
        "memo": memo,
        "amount": amount,
        "planId": plan_id,
        "planType": get_plan_type(plan_id),
        "username": clean_username,
    }


async def _process_paid_order(order: dict):
    order_id = order["id"]
    update_order(order_id, status="processing")

    try:
        result = await upgrade_username(order["username"], TOKEN_SETS)
        plan_type = get_plan_type(order["plan_id"])
        nextdns_key = get_nextdns_key(order["plan_id"])

        pid, dns_link = await create_profile(nextdns_key, plan_type=plan_type)
        dns_link = IOS_DNS_INSTALL_URL or dns_link
        host_id = DNS_ANDROID_HOST_OVERRIDE or pid
        dns_hostname = f"{host_id}.dns.nextdns.io" if host_id else None

        import json

        mark_order_done(
            order_id,
            status="completed",
            dns_link=dns_link,
            dns_hostname=dns_hostname,
            result_json=json.dumps({**result, "dns_link": dns_link, "dns_hostname": dns_hostname}),
        )
    except Exception as exc:
        update_order(order_id, status="failed", error_msg=str(exc))
        raise


@app.get("/api/order/{order_id}/status")
async def order_status(order_id: str):
    order = get_order(order_id)
    if not order:
        return {"success": False, "msg": "Không tìm thấy đơn hàng"}

    if order["status"] == "completed":
        return {"success": True, **order_to_status(order)}

    if order["status"] == "failed":
        return {"success": False, **order_to_status(order)}

    if order["status"] == "processing":
        return {"success": True, **order_to_status(order), "message": "Đang lên Locket Gold..."}

    try:
        payment = await verify_bank_transfer(order["memo"], order["amount"])
    except PaymentNotFoundError:
        return {
            "success": True,
            **order_to_status(order),
            "message": "Đang chờ xác nhận chuyển khoản từ ngân hàng...",
        }
    except PaymentConfigError as exc:
        return {"success": False, "msg": str(exc)}
    except Exception as exc:
        return {"success": False, "msg": f"Lỗi đối soát ngân hàng: {exc}"}

    tx_id = payment.get("tx_id")
    if payment_tx_used(tx_id):
        return {"success": False, "msg": "Giao dịch này đã được sử dụng cho đơn khác"}

    update_order(order_id, status="paid", payment_tx_id=tx_id)
    order = get_order(order_id)

    try:
        await _process_paid_order(order)
    except Exception as exc:
        order = get_order(order_id)
        return {"success": False, **order_to_status(order), "msg": str(exc)}

    order = get_order(order_id)
    return {"success": True, **order_to_status(order), "message": "Thanh toán đã xác nhận — lên Gold thành công"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=API_PORT, reload=True)
