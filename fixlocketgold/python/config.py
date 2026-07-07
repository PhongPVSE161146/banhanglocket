import json
import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

load_dotenv(BASE_DIR / ".env")

PAYMENT = {
    "provider": "momo",
    "bank_id": "momo",
    "bank_name": "MoMo",
    "bank_label": "MoMo (VietQR · Napas 247)",
    "account_no": "PSP2601413800000437",
    "account_name": "PHAM VAN PHONG",
    "account_name_display": "PHẠM VĂN PHONG",
    "note_prefix": "LKT",
}

API_PORT = int(os.getenv("API_PORT", "5001"))
ORDERS_DB = DATA_DIR / "orders.db"
RECEIPT_FILE = BASE_DIR / "receipt_tokens.json"

MONTHLY_PLAN_IDS = {"trai_nghiem"}
YEARLY_PLAN_IDS = {"mot_nam", "cap_doi", "gia_dinh", "sieu_cap"}

IOS_DNS_INSTALL_URL = (os.getenv("IOS_DNS_INSTALL_URL") or "").strip()
DNS_ANDROID_HOST_OVERRIDE = (os.getenv("DNS_ANDROID_HOST_OVERRIDE") or "").strip()


def is_monthly_plan(plan_id: str) -> bool:
    return plan_id in MONTHLY_PLAN_IDS


def get_plan_type(plan_id: str) -> str:
    return "month" if is_monthly_plan(plan_id) else "year"


def get_nextdns_key(plan_id: str) -> str:
    if is_monthly_plan(plan_id):
        return (
            os.getenv("NEXTDNS_KEY_MONTH")
            or os.getenv("NEXTDNS_KEY_THANG")
            or os.getenv("NEXTDNS_KEY")
            or ""
        ).strip()
    return (
        os.getenv("NEXTDNS_KEY_YEAR")
        or os.getenv("NEXTDNS_KEY_NAM")
        or os.getenv("NEXTDNS_KEY")
        or ""
    ).strip()


def _receipt_tokens_from_env():
    ft = (os.getenv("RECEIPT_FETCH_TOKEN") or "").strip().strip('"').strip("'")
    at = (os.getenv("RECEIPT_APP_TRANSACTION") or "").strip().strip('"').strip("'")
    return ft, at


def _receipt_tokens_from_file():
    if not RECEIPT_FILE.is_file():
        return "", ""
    try:
        with open(RECEIPT_FILE, encoding="utf-8") as f:
            data = json.load(f)
        ft = (data.get("fetch_token") or "").strip()
        at = (data.get("app_transaction") or "").strip()
        return ft, at
    except (OSError, json.JSONDecodeError, TypeError):
        return "", ""


def build_token_sets():
    sets = [
        {
            "name": "sandbox",
            "fetch_token": "",
            "app_transaction": "",
            "hash_params": "",
            "hash_headers": "",
            "is_sandbox": True,
        },
        {
            "name": "production",
            "fetch_token": "",
            "app_transaction": "",
            "hash_params": "",
            "hash_headers": "",
            "is_sandbox": False,
        },
    ]

    ft, at = _receipt_tokens_from_env()
    if not ft or not at:
        ft, at = _receipt_tokens_from_file()

    if ft and at:
        sets[1]["fetch_token"] = ft
        sets[1]["app_transaction"] = at
        if not (sets[0]["fetch_token"] and sets[0]["app_transaction"]):
            sets[0] = {**sets[1]}

    return sets


TOKEN_SETS = build_token_sets()
