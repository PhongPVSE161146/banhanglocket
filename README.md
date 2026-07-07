# banhanglocket

Dự án bán dịch vụ nâng cấp Locket Gold, gồm 2 phần:

## `locketpro/`
Website marketing + giao diện người dùng (React + Vite).

```bash
cd locketpro && npm install && npm run dev
```

## `fixlocketgold/`
Module xử lý nâng cấp Locket Gold và thanh toán:
- Cấu hình MoMo / VietQR / Napas 247
- Bảng giá các gói
- Tạo mã QR, nội dung chuyển khoản, liên hệ TikTok

Chỉnh số tài khoản MoMo tại `fixlocketgold/src/config/payment.js`.
