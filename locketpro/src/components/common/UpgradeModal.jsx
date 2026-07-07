import { useState, useEffect } from 'react'
import { Modal, Input, Button, message, Steps, Spin } from 'antd'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import {
  PAYMENT_CONFIG,
  buildVietQrUrl,
  buildTransferMemo,
  openTiktokContact,
  verifyPayment,
} from 'fixlocketgold'

export default function UpgradeModal({ open, onClose, selectedPlan }) {
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!open) {
      setStep(0)
      setUsername('')
      setIsVerifying(false)
      setIsSuccess(false)
    }
  }, [open])

  if (!selectedPlan) return null

  const memoText = buildTransferMemo({
    priceNum: selectedPlan.priceNum,
    username,
  })

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
      message.success(`Đã sao chép ${label}!`)
    } else {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message.success(`Đã sao chép ${label}!`)
    }
  }

  const handleNextStep = () => {
    if (!username.trim()) {
      message.warning('Vui lòng nhập UserName Locket của bạn.')
      return
    }
    setStep(1)
  }

  const handleVerifyPayment = () => {
    verifyPayment({
      onStart: () => setIsVerifying(true),
      onComplete: () => {
        setIsVerifying(false)
        setIsSuccess(true)
        message.success('Hệ thống ghi nhận yêu cầu nâng cấp!')
      },
    })
  }

  const handleTiktokContact = () => {
    openTiktokContact({
      planBadge: selectedPlan.badge,
      username,
    })
  }

  const qrUrl = buildVietQrUrl({
    amount: selectedPlan.priceNum,
    memo: memoText,
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
      maskClosable={!isVerifying}
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
              Vui lòng nhập chính xác **UserName** Locket của bạn để chúng tôi tiến hành nâng cấp trực tiếp.
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
              />
            </div>

            <Button
              type="primary"
              block
              size="large"
              onClick={handleNextStep}
              className="checkout-next-btn"
            >
              Tiếp tục thanh toán
              <ArrowForwardIcon fontSize="small" />
            </Button>

            <p className="checkout-help-note">
              * Chúng tôi cam kết tuyệt đối bảo mật, không đụng đến iCloud máy của bạn.
            </p>
          </div>
        )}

        {step === 1 && !isSuccess && (
          <div className="checkout-step-2">
            {isVerifying ? (
              <div className="checkout-verifying-loader">
                <Spin size="large" />
                <p className="verifying-text">Đang kết nối ngân hàng để kiểm tra giao dịch...</p>
                <p className="verifying-subtext">Quá trình này có thể mất vài giây, vui lòng không tắt cửa sổ.</p>
              </div>
            ) : (
              <>
                <p className="qr-guide-text">
                  Quét mã QR bằng <strong>MoMo</strong>, <strong>app ngân hàng</strong> hoặc <strong>VietQR/Napas 247</strong> để thanh toán.
                </p>

                <div className="qr-container-box">
                  <img src={qrUrl} alt="Mã thanh toán QR VietQR" className="vietqr-image" />
                  <div className="qr-glowing-effect" />
                </div>

                <div className="bank-details-box">
                  <div className="detail-item">
                    <span className="detail-label">Phương thức</span>
                    <span className="detail-value">{PAYMENT_CONFIG.bankLabel}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Số tài khoản / Ví</span>
                    <div className="value-with-copy">
                      <span className="detail-value highlighted">{PAYMENT_CONFIG.accountNo}</span>
                      <button
                        type="button"
                        className="btn-copy-small"
                        onClick={() => copyToClipboard(PAYMENT_CONFIG.accountNo, 'Số tài khoản')}
                      >
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
                    <div className="value-with-copy">
                      <span className="detail-value gold-price">{selectedPlan.price} đ</span>
                      <button
                        type="button"
                        className="btn-copy-small"
                        onClick={() => copyToClipboard(selectedPlan.priceNum.toString(), 'Số tiền')}
                      >
                        <ContentCopyIcon style={{ fontSize: 13 }} />
                      </button>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Nội dung chuyển khoản</span>
                    <div className="value-with-copy">
                      <span className="detail-value highlighted-memo">{memoText}</span>
                      <button
                        type="button"
                        className="btn-copy-small"
                        onClick={() => copyToClipboard(memoText, 'Nội dung chuyển khoản')}
                      >
                        <ContentCopyIcon style={{ fontSize: 13 }} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="checkout-action-row">
                  <Button
                    icon={<ArrowBackIcon fontSize="small" />}
                    onClick={() => setStep(0)}
                    className="checkout-back-btn"
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleVerifyPayment}
                    className="checkout-verify-btn"
                  >
                    Xác nhận đã thanh toán
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {isSuccess && (
          <div className="checkout-step-success">
            <div className="success-icon-wrapper">
              <CheckCircleIcon style={{ color: '#22c55e', fontSize: 60 }} />
            </div>

            <h4 className="success-title">Thanh toán hoàn tất!</h4>

            <p className="success-desc">
              Hệ thống đã tiếp nhận yêu cầu nâng cấp gói <strong>{selectedPlan.badge}</strong> cho UserName Locket <strong>@{username.trim()}</strong>.
            </p>

            <div className="success-instruction-card">
              <h5>⏱️ Thời gian xử lý:</h5>
              <p>
                Tài khoản của bạn sẽ được nâng cấp lên <strong>Locket Gold</strong> tự động trực tiếp trong vòng từ <strong>1 - 3 phút</strong>.
              </p>
              <p className="note-sub">
                * Bạn có thể mở ứng dụng Locket để kiểm tra xem đã có viền vàng và logo Locket Gold chưa nhé.
              </p>
            </div>

            <Button
              type="primary"
              block
              size="large"
              onClick={handleTiktokContact}
              className="success-tiktok-notify-btn"
              icon={<SendIcon style={{ fontSize: 16 }} />}
            >
              Báo qua TikTok để được kích hoạt ngay
            </Button>

            <Button block onClick={onClose} style={{ marginTop: 12 }} className="success-close-btn">
              Đóng cửa sổ
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
