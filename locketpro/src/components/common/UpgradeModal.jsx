import { useState, useEffect } from 'react'
import { Modal, Input, Button, Typography, message } from 'antd'
import { UPGRADE_CONTACT } from '../../constants/siteData'

export default function UpgradeModal({ open, onClose, planLabel = '' }) {
  const [username, setUsername] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!open) setUsername('')
  }, [open])

  const buildMessage = () =>
    planLabel
      ? `Xin nâng cấp Locket Gold\nGói: ${planLabel}\nUserName Locket: ${username.trim()}`
      : `Xin nâng cấp Locket Gold\nUserName Locket: ${username.trim()}`

  const sendViaTiktok = async () => {
    if (!username.trim()) {
      message.warning('Vui lòng nhập UserName Locket trước khi gửi.')
      return
    }
    setSending(true)
    const text = buildMessage()
    const tiktokUrl = UPGRADE_CONTACT.tiktok

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        message.success('Đã sao chép tin nhắn — đang mở TikTok...')
      }
    } catch {
      message.info('Không sao chép được — hãy gõ tin nhắn thủ công trên TikTok.')
    }

    const opened = window.open(tiktokUrl, '_blank', 'noopener,noreferrer')
    if (!opened) {
      message.warning('Trình duyệt chặn popup. Bấm link TikTok bên dưới.')
    }

    setSending(false)
    onClose()
  }

  return (
    <Modal
      title={UPGRADE_CONTACT.label}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      zIndex={1400}
      className="upgrade-modal"
      maskClosable
    >
      <div className="upgrade-modal-body">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
          {UPGRADE_CONTACT.hint}
        </Typography.Paragraph>

        {planLabel ? (
          <div className="upgrade-plan-tag">
            Gói đã chọn: <strong>{planLabel}</strong>
          </div>
        ) : null}

        <Typography.Text strong>Gửi UserName Locket của bạn</Typography.Text>
        <Input
          size="large"
          placeholder="Nhập UserName Locket..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onPressEnter={sendViaTiktok}
          style={{ marginTop: 8, marginBottom: 20 }}
          prefix={<span className="input-prefix">@</span>}
        />

        <Button
          type="primary"
          block
          size="large"
          loading={sending}
          onClick={sendViaTiktok}
          className="tiktok-send-btn"
        >
          ♪ {UPGRADE_CONTACT.ctaTiktok}
        </Button>

        <a
          href={UPGRADE_CONTACT.tiktok}
          target="_blank"
          rel="noreferrer"
          className="upgrade-tiktok-link"
        >
          Mở TikTok {UPGRADE_CONTACT.tiktokDisplay}
        </a>

        <p className="upgrade-note">{UPGRADE_CONTACT.note}</p>
      </div>
    </Modal>
  )
}
