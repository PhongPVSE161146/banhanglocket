import { PAYMENT_CONFIG } from '../config/payment.js'

/**
 * Tạo URL ảnh VietQR qua img.vietqr.io
 * Hỗ trợ MoMo, ngân hàng liên kết VietQR / Napas 247
 */
export function buildVietQrUrl({ amount, memo, template = 'compact2' } = {}) {
  const { bankId, accountNo, accountName } = PAYMENT_CONFIG
  const params = new URLSearchParams()

  if (amount != null) params.set('amount', String(amount))
  if (memo) params.set('addInfo', memo)
  if (accountName) params.set('accountName', accountName)

  const query = params.toString()
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png${query ? `?${query}` : ''}`
}
