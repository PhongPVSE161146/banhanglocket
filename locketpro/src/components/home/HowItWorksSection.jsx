import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Row, Col } from 'antd'
import { HOW_IT_WORKS } from '../../constants/siteData'
import SectionHeading from '../common/SectionHeading'
import Tilt3D from '../common/Tilt3D'

export default function HowItWorksSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(255,255,255,0.5)' }}>
      <Container maxWidth="lg">
        <SectionHeading
          title="Cách Hoạt Động"
          subtitle="Chỉ 3 bước — thanh toán MoMo và nhận Gold tự động"
        />

        <Row gutter={[32, 32]}>
          {HOW_IT_WORKS.map((item) => (
            <Col key={item.step} xs={24} md={8}>
              <Tilt3D maxTilt={10}>
                <div className="step-card card-3d-surface">
                  <span className="step-number">{item.step}</span>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </div>
              </Tilt3D>
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  )
}
