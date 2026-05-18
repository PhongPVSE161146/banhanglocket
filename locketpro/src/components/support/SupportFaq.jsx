import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Collapse } from 'antd'
import { SUPPORT_FAQ, UPGRADE_CONTACT } from '../../constants/siteData'
import Tilt3D from '../common/Tilt3D'

export default function SupportFaq() {
  const items = SUPPORT_FAQ.map((item, index) => ({
    key: String(index),
    label: item.q,
    children: <p className="faq-answer">{item.a}</p>,
  }))

  return (
    <Box component="section" sx={{ pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Tilt3D maxTilt={6}>
          <Collapse items={items} bordered={false} className="faq-collapse card-3d-surface" />
        </Tilt3D>
        <Tilt3D maxTilt={5}>
          <Box sx={{ textAlign: 'center', mt: 4 }} className="support-tiktok-box card-3d-surface">
            <Typography variant="body1" sx={{ color: '#374151', mb: 2 }}>
              Cần hỗ trợ? Nhắn admin trên TikTok
            </Typography>
            <Button
              type="primary"
              size="large"
              href={UPGRADE_CONTACT.tiktok}
              target="_blank"
              rel="noreferrer"
              className="tiktok-send-btn"
            >
              {UPGRADE_CONTACT.tiktokDisplay} — Mở TikTok
            </Button>
          </Box>
        </Tilt3D>
      </Container>
    </Box>
  )
}
