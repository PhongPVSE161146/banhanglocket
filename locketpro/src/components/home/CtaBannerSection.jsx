import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { CTA_BANNER } from '../../constants/siteData'
import UpgradeModal from '../common/UpgradeModal'

export default function CtaBannerSection() {
  const [open, setOpen] = useState(false)

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 2 }}>
      <Container maxWidth="md">
        <div className="cta-banner card-3d-surface cta-banner-interactive">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
            {CTA_BANNER.title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 3 }}>
            {CTA_BANNER.subtitle}
          </Typography>
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={() => setOpen(true)}
            className="tiktok-send-btn cta-tiktok-btn hero-nav-btn"
            sx={{
              bgcolor: '#fff',
              color: '#111',
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              position: 'relative',
              zIndex: 5,
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            {CTA_BANNER.button}
          </Button>
        </div>
      </Container>
      <UpgradeModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}
