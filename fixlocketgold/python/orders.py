import json
import sqlite3
import time
import uuid

from config import ORDERS_DB, PAYMENT


def _conn():
    conn = sqlite3.connect(ORDERS_DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with _conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL,
                plan_id TEXT NOT NULL,
                amount INTEGER NOT NULL,
                memo TEXT NOT NULL,
                status TEXT NOT NULL,
                payment_tx_id TEXT,
                dns_link TEXT,
                dns_hostname TEXT,
                result_json TEXT,
                error_msg TEXT,
                created_at REAL NOT NULL,
                completed_at REAL
            )
            """
        )
        _ensure_columns(conn)


def _ensure_columns(conn):
    cols = {row[1] for row in conn.execute("PRAGMA table_info(orders)").fetchall()}
    migrations = {
        "payment_tx_id": "TEXT",
        "dns_link": "TEXT",
        "dns_hostname": "TEXT",
        "result_json": "TEXT",
        "error_msg": "TEXT",
    }
    for name, col_type in migrations.items():
        if name not in cols:
            conn.execute(f"ALTER TABLE orders ADD COLUMN {name} {col_type}")


def build_memo(price_num, username):
    clean = username.strip().lstrip("@")
    if "locket.cam/" in clean:
        clean = clean.split("locket.cam/")[-1].split("?")[0]
    return f"{PAYMENT['note_prefix']}{price_num}_{clean}"


def create_order(username, plan_id, amount, memo):
    order_id = str(uuid.uuid4())
    with _conn() as conn:
        conn.execute(
            "INSERT INTO orders (id, username, plan_id, amount, memo, status, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (order_id, username, plan_id, amount, memo, "pending_payment", time.time()),
        )
    return order_id


def get_order(order_id):
    with _conn() as conn:
        row = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
    return dict(row) if row else None


def payment_tx_used(tx_id):
    if not tx_id:
        return False
    with _conn() as conn:
        row = conn.execute(
            "SELECT id FROM orders WHERE payment_tx_id = ? AND status = 'completed' LIMIT 1",
            (tx_id,),
        ).fetchone()
    return row is not None


def update_order(order_id, **fields):
    if not fields:
        return
    keys = ", ".join(f"{k} = ?" for k in fields)
    values = list(fields.values()) + [order_id]
    with _conn() as conn:
        conn.execute(f"UPDATE orders SET {keys} WHERE id = ?", values)


def mark_order_done(order_id, status="completed", **extra):
    payload = {"status": status, "completed_at": time.time(), **extra}
    update_order(order_id, **payload)


def order_to_status(order):
    result = None
    if order.get("result_json"):
        try:
            result = json.loads(order["result_json"])
        except json.JSONDecodeError:
            result = None

    return {
        "orderId": order["id"],
        "status": order["status"],
        "username": order["username"],
        "planId": order["plan_id"],
        "amount": order["amount"],
        "memo": order["memo"],
        "paymentVerified": order["status"] not in ("pending_payment", "failed"),
        "dnsLink": order.get("dns_link"),
        "dnsHostname": order.get("dns_hostname"),
        "error": order.get("error_msg"),
        "data": result,
    }
