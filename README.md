# banhanglocket

## Chạy (2 terminal)

```bash
# Terminal 1 — API Python (bắt buộc)
cd fixlocketgold/python && python3 app.py

# Terminal 2 — Website
cd locketpro && npm run dev
```

## Luồng thanh toán mới

1. Nhập UserName → tạo đơn hàng
2. Quét QR MoMo chuyển khoản (đúng **số tiền** + **nội dung CK**)
3. Hệ thống **tự đối soát qua SePay API** mỗi 3 giây
4. Chỉ khi ngân hàng xác nhận → mới lên Gold + tạo DNS
5. Màn hình cuối hiện link cài DNS iOS / Android

**Không còn nút "Xác nhận thủ công"** — bấm không chuyển khoản sẽ không lên Gold.

## Cấu hình `.env` (fixlocketgold/python/.env)

```env
# Bắt buộc — đối soát chuyển khoản tự động
SEPAY_API_KEY=your_sepay_api_token

# Receipt lên Gold
RECEIPT_FETCH_TOKEN=...
RECEIPT_APP_TRANSACTION=...

# NextDNS — tách theo gói
NEXTDNS_KEY_MONTH=...   # Gói tháng (trai_nghiem)
NEXTDNS_KEY_YEAR=...    # Gói năm (mot_nam, cap_doi, gia_dinh, sieu_cap)

# Hoặc dùng chung (dự phòng)
NEXTDNS_KEY=...
```

Lấy **SEPAY_API_KEY** tại [my.sepay.vn](https://my.sepay.vn) → Cài đặt → API Access.

## MoMo nhận tiền

- STK: `PSP2601413800000437`
- Chủ TK: PHẠM VĂN PHONG
