import asyncio
import sys

from dotenv import load_dotenv

from config import TOKEN_SETS
from services.locket import upgrade_username

load_dotenv()


def main():
    if len(sys.argv) < 2:
        print("Cách dùng: python upgrade_gold.py <username>")
        return 1

    username = sys.argv[1].strip()
    try:
        result = asyncio.run(upgrade_username(username, TOKEN_SETS))
        print(f"✅ Lên Gold thành công cho @{result['username']} (UID: {result['uid']})")
        return 0
    except Exception as exc:
        print(f"❌ Lỗi: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
