import { PAYMENT_CONFIG } from '../config/payment.js'
import { createPaymentOrder, getOrderStatus } from './api.js'

export function normalizeUsername(username = '') {
  return username.trim().replace(/^@/, '')
}

export function buildTransferMemo({ priceNum, username }) {
  const cleanUsername = normalizeUsername(username)
  return `${PAYMENT_CONFIG.notePrefix}${priceNum}_${cleanUsername}`
}

export async function startPaymentOrder({ username, planId, priceNum }) {
  return createPaymentOrder({
    username: normalizeUsername(username),
    planId,
    amount: priceNum,
  })
}

export async function pollOrderUntilDone(orderId, { onTick, intervalMs = 3000, maxAttempts = 120 } = {}) {
  for (let i = 0; i < maxAttempts; i += 1) {
    const status = await getOrderStatus(orderId)
    onTick?.(status)

    if (status.status === 'completed') {
      return status
    }
    if (status.status === 'failed') {
      throw new Error(status.error || status.msg || 'Kích hoạt thất bại')
    }
    if (status.success === false && status.msg) {
      throw new Error(status.msg)
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }

  throw new Error('Hết thời gian chờ xác nhận thanh toán. Kiểm tra lại chuyển khoản và thử lại.')
}
