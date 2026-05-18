import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import PricingPlans from '../pricing/PricingPlans'
import CommitmentSection from '../pricing/CommitmentSection'
import { PRICING_HEADER } from '../../constants/siteData'
import pricingBanner from '../../assets/pricing-banner.png'

export default function PricingSection({ compact = false }) {
  return (
    <Box
      component="section"
      id="pricing"
      className="pricing-section-dark"
      sx={{ py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        {!compact && (
          <Box className="pricing-hero-banner" sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
            <img src={pricingBanner} alt="Bảng giá nâng cấp Locket Gold" className="pricing-banner-img" />
          </Box>
        )}

        <Box className="section-heading-center" sx={{ textAlign: 'center', mb: 4 }}>
          <Typography className="pricing-header-sub">{PRICING_HEADER.title}</Typography>
          <Typography variant="h4" className="pricing-header-title">
            {PRICING_HEADER.subtitle}
          </Typography>
          <Typography className="pricing-header-tagline">{PRICING_HEADER.tagline}</Typography>
        </Box>

        <PricingPlans />
        <CommitmentSection />
      </Container>
    </Box>
  )
}
