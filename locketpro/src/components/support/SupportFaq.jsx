import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Collapse } from 'antd'
import { SUPPORT_FAQ } from '../../constants/siteData'
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
      </Container>
    </Box>
  )
}
