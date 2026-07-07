import { PAYMENT_CONFIG } from '../config/payment.js'
import { UPGRADE_CONTACT } from '../config/contact.js'

export function normalizeUsername(username = '') {
  return username.trim().replace(/^@/, '')
}

export function buildTransferMemo({ priceNum, username }) {
  const cleanUsername = normalizeUsername(username)
  return `${PAYMENT_CONFIG.notePrefix}${priceNum}_${cleanUsername}`
}

export function buildTiktokNotifyMessage({ planBadge, username }) {
  const cleanUsername = normalizeUsername(username)
  return `Mình vừa thanh toán gói ${planBadge} cho UserName Locket: ${cleanUsername}. Nhờ admin kiểm tra và kích hoạt giúp mình nhé!`
}

export function openTiktokContact({ planBadge, username }) {
  const message = buildTiktokNotifyMessage({ planBadge, username })
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(message)
  }
  window.open(UPGRADE_CONTACT.tiktok, '_blank', 'noopener,noreferrer')
}

/**
 * Kiểm tra giao dịch — hiện mô phỏng, có thể thay bằng API đối soát thật sau
 */
export function verifyPayment({ onStart, onComplete, delayMs = 3000 } = {}) {
  onStart?.()
  return new Promise((resolve) => {
    setTimeout(() => {
      onComplete?.()
      resolve({ success: true, status: 'pending_manual_activation' })
    }, delayMs)
  })
}
