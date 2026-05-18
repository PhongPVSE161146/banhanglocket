import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Row, Col } from 'antd'
import { FEATURES } from '../../constants/siteData'
import FeatureCard from '../common/FeatureCard'
import SectionHeading from '../common/SectionHeading'

export default function FeaturesSection({ showTitle = true }) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {showTitle && <SectionHeading title="Tính Năng Độc Quyền" />}

        <Row gutter={[24, 24]}>
          {FEATURES.map((feature) => (
            <Col key={feature.title} xs={24} md={8}>
              <FeatureCard {...feature} />
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  )
}
