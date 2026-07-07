import aiohttp
import asyncio
import json
import re
import time

HEADERS = {
    "Host": "api.revenuecat.com",
    "Authorization": "Bearer appl_JngFETzdodyLmCREOlwTUtXdQik",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "X-Platform": "iOS",
    "X-Platform-Version": "Version 26.2 (Build 23C55)",
    "X-Platform-Device": "iPhone15,3",
    "X-Platform-Flavor": "native",
    "X-Version": "5.41.0",
    "X-Client-Version": "2.32.2",
    "X-Client-Bundle-ID": "com.locket.Locket",
    "X-Client-Build-Version": "3",
    "X-StoreKit2-Enabled": "true",
    "X-StoreKit-Version": "2",
    "X-Observer-Mode-Enabled": "false",
    "X-Is-Sandbox": "true",
    "X-Storefront": "VNM",
    "X-Apple-Device-Identifier": "39A73C25-1E05-4350-ADA7-5CD3FE1079E8",
    "X-Preferred-Locales": "vi_KR,ko_KR,en_KR",
    "X-Nonce": "w0Mlb6+AmV4WYuVv",
    "X-Is-Backgrounded": "false",
    "X-Retry-Count": "0",
    "X-Is-Debug-Build": "false",
    "User-Agent": "Locket/3 CFNetwork/3860.300.31 Darwin/25.2.0",
    "Accept-Language": "vi-VN,vi;q=0.9",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "X-RevenueCat-ETag": "",
}


def _clean_username(username: str) -> str:
    username = (username or "").strip().lstrip("@")
    if "locket.cam/" in username:
        username = username.split("locket.cam/")[-1].split("?")[0]
    return username.strip()


async def resolve_uid(username: str):
    username = _clean_username(username)
    if not username:
        return None

    url = f"https://locket.cam/{username}"
    headers = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
        "Accept": "text/html",
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, allow_redirects=True, timeout=10) as res:
                html = await res.text()
                redirect_url = str(res.url)

                def extract(text):
                    if not text:
                        return None
                    m = re.search(r"/invites/([A-Za-z0-9]{28})", text)
                    if m:
                        return m.group(1)

                    lp = re.search(r'link=([^\s"\'>]+)', text)
                    if lp:
                        try:
                            d = lp.group(1).replace("%3A", ":").replace("%2F", "/")
                            dm = re.search(r"/invites/([A-Za-z0-9]{28})", d)
                            if dm:
                                return dm.group(1)
                        except Exception:
                            pass
                    return None

                return extract(redirect_url) or extract(html)
    except Exception:
        return None


async def check_status(uid: str):
    url = f"https://api.revenuecat.com/v1/subscribers/{uid}"
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=HEADERS, timeout=10) as res:
                if 200 <= res.status < 300:
                    data = await res.json()
                    entitlements = data.get("subscriber", {}).get("entitlements", {}).get("Gold", {})
                    if entitlements:
                        return {"active": True, "expires": entitlements.get("expires_date")}
                    return {"active": False}
                return {"active": False}
    except Exception:
        return None


async def inject_gold(uid: str, token_config: dict):
    url = "https://api.revenuecat.com/v1/receipts"

    fetch_token = token_config["fetch_token"]
    app_transaction = token_config["app_transaction"]
    is_sandbox = token_config["is_sandbox"]

    body = {
        "product_id": "locket_1600_1y",
        "fetch_token": fetch_token,
        "app_transaction": app_transaction,
        "app_user_id": uid,
        "is_restore": True,
        "store_country": "VNM",
        "currency": "USD",
        "price": "15.99",
        "normal_duration": "P1Y",
        "subscription_group_id": "21419447",
        "observer_mode": False,
        "initiation_source": "restore",
        "offers": [],
        "attributes": {
            "$attConsentStatus": {
                "updated_at_ms": int(time.time() * 1000),
                "value": "notDetermined",
            }
        },
    }

    current_headers = HEADERS.copy()
    current_headers["Content-Length"] = str(len(json.dumps(body)))

    if token_config.get("hash_params"):
        current_headers["X-Post-Params-Hash"] = token_config["hash_params"]
    if token_config.get("hash_headers"):
        current_headers["X-Headers-Hash"] = token_config["hash_headers"]

    current_headers["X-Is-Sandbox"] = str(is_sandbox).lower()

    async with aiohttp.ClientSession() as session:
        for attempt in range(5):
            try:
                async with session.post(url, headers=current_headers, json=body, timeout=15) as res:
                    if res.status == 200:
                        status = await check_status(uid)
                        if status and status.get("active"):
                            return True, "SUCCESS"

                        await asyncio.sleep(2)
                        status = await check_status(uid)
                        if status and status.get("active"):
                            return True, "SUCCESS"
                        return False, "Accepted but NO Gold (Expired?)"

                    if res.status == 529:
                        await asyncio.sleep(2)
                        continue

                    try:
                        resp_json = await res.json()
                        msg = resp_json.get("message", str(res.status))
                    except Exception:
                        msg = str(res.status)
                    return False, f"Rejected: {msg}"
            except Exception as exc:
                if attempt == 4:
                    return False, f"Request Error: {exc}"
                await asyncio.sleep(2)

    return False, "Timeout / Failed after retries"


async def upgrade_username(username: str, token_sets: list):
    username = _clean_username(username)
    if not username:
        raise ValueError("UserName không được để trống")

    uid = await resolve_uid(username)
    if not uid:
        raise RuntimeError("Không tìm thấy UserName trên Locket. Kiểm tra lại username.")

    last_error = "Tất cả token sets đều thất bại."
    for idx, token_config in enumerate(token_sets):
        if not token_config.get("fetch_token") or not token_config.get("app_transaction"):
            continue
        success, msg = await inject_gold(uid, token_config)
        if success:
            return {
                "username": username,
                "uid": uid,
                "token_set": idx + 1,
                "message": "Đã lên Locket Gold thành công",
            }
        last_error = msg

    raise RuntimeError(last_error)
