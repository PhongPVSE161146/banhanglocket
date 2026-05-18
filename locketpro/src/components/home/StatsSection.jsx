import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Row, Col } from 'antd'
import { STATS } from '../../constants/siteData'
import Tilt3D from '../common/Tilt3D'

export default function StatsSection() {
  return (
    <Box component="section" className="stats-section" sx={{ py: { xs: 4, md: 5 } }}>
      <Container maxWidth="lg">
        <Row gutter={[24, 24]}>
          {STATS.map((stat) => (
            <Col key={stat.label} xs={12} sm={6} md={3}>
              <Tilt3D maxTilt={10}>
                <div className="stat-card card-3d-surface">
                  <Typography className="stat-value">{stat.value}</Typography>
                  <Typography className="stat-label">{stat.label}</Typography>
                </div>
              </Tilt3D>
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  )
}
