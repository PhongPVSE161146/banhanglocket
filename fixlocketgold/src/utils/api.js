const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
  } catch {
    throw new Error('Không kết nối được API Python. Chạy: cd fixlocketgold/python && python3 app.py')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok && data.success !== true) {
    throw new Error(data.msg || data.error || data.message || `Lỗi ${res.status}`)
  }
  return data
}

export function fetchUserInfo(username) {
  return request('/user-info', {
    method: 'POST',
    body: JSON.stringify({ username }),
  })
}

export function createPaymentOrder({ username, planId, amount }) {
  return request('/order/create', {
    method: 'POST',
    body: JSON.stringify({ username, planId, amount }),
  })
}

export function getOrderStatus(orderId) {
  return request(`/order/${orderId}/status`)
}

export function checkApiHealth() {
  return request('/health')
}
