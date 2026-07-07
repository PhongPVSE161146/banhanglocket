import { useState, useEffect, useRef } from 'react'
import { Modal, Input, Button, message, Steps, Spin } from 'antd'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  PAYMENT_CONFIG,
  buildVietQrUrl,
  fetchUserInfo,
  startPaymentOrder,
  pollOrderUntilDone,
} from 'fixlocketgold'

export default function UpgradeModal({ open, onClose, selectedPlan }) {
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState('')
  const [isCheckingUser, setIsCheckingUser] = useState(false)
  const [isWaitingPayment, setIsWaitingPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userPreview, setUserPreview] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [memoText, setMemoText] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [dnsInfo, setDnsInfo] = useState(null)
  const pollingRef = useRef(false)

  useEffect(() => {
    if (!open) {
      pollingRef.current = false
      setStep(0)
      setUsername('')
      setIsCheckingUser(false)
      setIsWaitingPayment(false)
      setIsProcessing(false)
      setIsSuccess(false)
      setUserPreview(null)
      setOrderId(null)
      setMemoText('')
      setStatusMessage('')
      setDnsInfo(null)
    }
  }, [open])

  useEffect(() => {
    if (!open || step !== 1 || !orderId || isSuccess) return undefined

    pollingRef.current = true

    const runPoll = async () => {
      setIsWaitingPayment(true)
      try {
        const result = await pollOrderUntilDone(orderId, {
          intervalMs: 3000,
          onTick: (status) => {
            if (!pollingRef.current) return
            if (status.status === 'pending_payment') {
              setStatusMessage(status.message || 'Đang chờ xác nhận chuyển khoản từ ngân hàng...')
            }
            if (status.status === 'paid' || status.status === 'processing') {
              setIsWaitingPayment(false)
              setIsProcessing(true)
              setStatusMessage(status.message || 'Đã xác nhận thanh toán — đang lên Locket Gold...')
            }
          },
        })

        if (!pollingRef.current) return

        setIsWaitingPayment(false)
        setIsProcessing(false)
        setIsSuccess(true)
        setDnsInfo({
          dnsLink: result.dnsLink,
          dnsHostname: result.dnsHostname,
        })
        message.success('Thanh toán đã xác nhận — lên Gold thành công!')
      } catch (error) {
        if (!pollingRef.current) return
        setIsWaitingPayment(false)
        setIsProcessing(false)
        message.error(error.message || 'Chưa xác nhận được thanh toán.')
      }
    }

    runPoll()
    return () => {
      pollingRef.current = false
    }
  }, [open, step, orderId, isSuccess])

  if (!selectedPlan) return null

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
      message.success(`Đã sao chép ${label}!`)
    }
  }

  const handleNextStep = async () => {
    if (!username.trim()) {
      message.warning('Vui lòng nhập UserName Locket của bạn.')
      return
    }

    setIsCheckingUser(true)
    try {
      const res = await fetchUserInfo(username)
      setUserPreview(res.data)

      const order = await startPaymentOrder({
        username,
        planId: selectedPlan.id,
        priceNum: selectedPlan.priceNum,
      })

      setOrderId(order.orderId)
      setMemoText(order.memo)
      setStep(1)
      setStatusMessage('Quét QR và chuyển khoản — hệ thống tự đối soát qua ngân hàng.')
      message.success(`Đã tìm thấy @${res.data.username}`)
    } catch (error) {
      message.error(error.message || 'Không tìm thấy UserName trên Locket.')
    } finally {
      setIsCheckingUser(false)
    }
  }

  const qrUrl = buildVietQrUrl({
    amount: selectedPlan.priceNum,
    memo: memoText || undefined,
  })

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffb300' }}>
          ✨ Nâng Cấp Locket Gold - {selectedPlan.badge}
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      zIndex={1400}
      width={480}
      className="upgrade-modal-v2"
      maskClosable={!isProcessing && !isCheckingUser}
    >
      <div className="upgrade-modal-body">
        <Steps
          current={isSuccess ? 2 : step}
          size="small"
          style={{ marginBottom: 24, padding: '0 8px' }}
          items={[
            { title: 'Nhập Tài Khoản' },
            { title: 'Thanh Toán QR' },
            { title: 'Hoàn Tất' },
          ]}
        />

        {step === 0 && !isSuccess && (
          <div className="checkout-step-1">
            <p className="checkout-instruction">
              Nhập **UserName** Locket — sau khi chuyển khoản, hệ thống tự xác nhận qua API ngân hàng rồi mới lên Gold.
            </p>

            <div className="selected-plan-preview">
              <span className="preview-label">Gói lựa chọn:</span>
              <span className="preview-value">{selectedPlan.badge} ({selectedPlan.price}đ{selectedPlan.period})</span>
            </div>

            <div className="input-group-username">
              <label className="username-input-label">UserName Locket của bạn:</label>
              <Input
                size="large"
                placeholder="Nhập UserName Locket (Ví dụ: vanphong202)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onPressEnter={handleNextStep}
                prefix={<span className="username-at-prefix">@</span>}
                className="custom-username-input"
                disabled={isCheckingUser}
              />
            </div>

            <Button
              type="primary"
              block
              size="large"
              onClick={handleNextStep}
              className="checkout-next-btn"
              loading={isCheckingUser}
            >
              Tiếp tục thanh toán
              <ArrowForwardIcon fontSize="small" />
            </Button>
          </div>
        )}

        {step === 1 && !isSuccess && (
          <div className="checkout-step-2">
            {userPreview && (
              <p className="qr-guide-text">
                Tài khoản: <strong>@{userPreview.username}</strong>
              </p>
            )}

            <p className="qr-guide-text">
              Quét mã QR bằng <strong>MoMo</strong> hoặc <strong>VietQR</strong>. Hệ thống tự đối soát qua ngân hàng — không cần bấm xác nhận.
            </p>

            {memoText && (
              <div className="qr-container-box">
                <img src={qrUrl} alt="Mã thanh toán QR VietQR" className="vietqr-image" />
                <div className="qr-glowing-effect" />
              </div>
            )}

            <div className="bank-details-box">
              <div className="detail-item">
                <span className="detail-label">Phương thức</span>
                <span className="detail-value">{PAYMENT_CONFIG.bankLabel}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Số tài khoản / Ví</span>
                <div className="value-with-copy">
                  <span className="detail-value highlighted">{PAYMENT_CONFIG.accountNo}</span>
                  <button type="button" className="btn-copy-small" onClick={() => copyToClipboard(PAYMENT_CONFIG.accountNo, 'Số tài khoản')}>
                    <ContentCopyIcon style={{ fontSize: 13 }} />
                  </button>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Chủ tài khoản</span>
                <span className="detail-value">{PAYMENT_CONFIG.accountNameDisplay}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Số tiền</span>
                <span className="detail-value gold-price">{selectedPlan.price} đ</span>
              </div>
              {memoText && (
                <div className="detail-item">
                  <span className="detail-label">Nội dung CK (bắt buộc)</span>
                  <div className="value-with-copy">
                    <span className="detail-value highlighted-memo">{memoText}</span>
                    <button type="button" className="btn-copy-small" onClick={() => copyToClipboard(memoText, 'Nội dung chuyển khoản')}>
                      <ContentCopyIcon style={{ fontSize: 13 }} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {(isWaitingPayment || isProcessing) && (
              <div className="checkout-verifying-loader" style={{ marginTop: 16 }}>
                <Spin size="default" />
                <p className="verifying-text">
                  {isProcessing ? 'Đang lên Locket Gold...' : 'Đang chờ xác nhận từ ngân hàng...'}
                </p>
                <p className="verifying-subtext">{statusMessage}</p>
              </div>
            )}

            <Button
              icon={<ArrowBackIcon fontSize="small" />}
              onClick={() => {
                pollingRef.current = false
                setStep(0)
                setOrderId(null)
                setIsWaitingPayment(false)
                setIsProcessing(false)
              }}
              className="checkout-back-btn"
              block
              disabled={isProcessing}
              style={{ marginTop: 12 }}
            >
              Quay lại
            </Button>
          </div>
        )}

        {isSuccess && (
          <div className="checkout-step-success">
            <div className="success-icon-wrapper">
              <CheckCircleIcon style={{ color: '#22c55e', fontSize: 60 }} />
            </div>

            <h4 className="success-title">Lên Gold thành công!</h4>
            <p className="success-desc">
              Gói <strong>{selectedPlan.badge}</strong> đã kích hoạt cho <strong>@{username.trim()}</strong>.
            </p>

            {dnsInfo?.dnsLink && (
              <div className="success-instruction-card">
                <h5>🛡️ Bước quan trọng — Cài DNS (bắt buộc)</h5>
                <p>1. Mở app <strong>Locket</strong> kiểm tra đã có Gold chưa.</p>
                <p>2. Cài DNS ngay để không bị mất Gold:</p>
                <p>
                  <strong>iOS:</strong>{' '}
                  <a href={dnsInfo.dnsLink} target="_blank" rel="noreferrer">
                    Bấm vào đây để cài profile DNS
                  </a>
                </p>
                {dnsInfo.dnsHostname && (
                  <p>
                    <strong>Android Private DNS:</strong>{' '}
                    <code>{dnsInfo.dnsHostname}</code>
                    <button
                      type="button"
                      className="btn-copy-small"
                      style={{ marginLeft: 8 }}
                      onClick={() => copyToClipboard(dnsInfo.dnsHostname, 'DNS hostname')}
                    >
                      <ContentCopyIcon style={{ fontSize: 13 }} />
                    </button>
                  </p>
                )}
              </div>
            )}

            <Button block onClick={onClose} type="primary" size="large" className="success-close-btn">
              Đóng cửa sổ
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
