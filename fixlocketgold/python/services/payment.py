import os
from datetime import datetime, timedelta
from typing import Optional

import aiohttp

SEPAY_API_URL = "https://userapi.sepay.vn/v2/transactions"


class PaymentNotFoundError(Exception):
    pass


class PaymentConfigError(Exception):
    pass


async def verify_bank_transfer(memo: str, amount: int) -> dict:
    """Đối soát chuyển khoản qua SePay API — chỉ trả về khi tìm thấy giao dịch khớp."""
    api_key = (os.getenv("SEPAY_API_KEY") or "").strip()
    if not api_key:
        raise PaymentConfigError(
            "Chưa cấu hình SEPAY_API_KEY. Thêm API key SePay vào file .env để tự động xác nhận thanh toán."
        )

    now = datetime.now()
    date_from = (now - timedelta(hours=24)).strftime("%Y-%m-%d %H:%M:%S")
    date_to = now.strftime("%Y-%m-%d %H:%M:%S")

    params = {
        "q": memo,
        "transfer_type": "in",
        "amount_in_min": amount,
        "amount_in_max": amount,
        "transaction_date_from": date_from,
        "transaction_date_to": date_to,
        "per_page": 50,
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(SEPAY_API_URL, params=params, headers=headers, timeout=15) as res:
            if res.status == 401:
                raise PaymentConfigError("SEPAY_API_KEY không hợp lệ")
            if res.status != 200:
                text = await res.text()
                raise RuntimeError(f"SePay API lỗi {res.status}: {text[:200]}")

            body = await res.json()
            transactions = body.get("data") or []

            memo_upper = memo.upper()
            for tx in transactions:
                content = (tx.get("transaction_content") or tx.get("content") or "").upper()
                code = (tx.get("code") or "").upper()
                amount_in = int(tx.get("amount_in") or tx.get("transferAmount") or 0)

                if amount_in != amount:
                    continue
                if memo_upper not in content and memo_upper not in code:
                    continue

                return {
                    "tx_id": tx.get("id") or tx.get("reference_number"),
                    "amount": amount_in,
                    "content": tx.get("transaction_content") or tx.get("content"),
                    "paid_at": tx.get("transaction_date") or tx.get("transactionDate"),
                }

    raise PaymentNotFoundError("Chưa nhận được chuyển khoản. Vui lòng thanh toán đúng số tiền và nội dung CK.")
