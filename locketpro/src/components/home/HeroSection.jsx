import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { HERO } from '../../constants/siteData'
import { primaryButtonSx } from '../../theme/muiTheme'
import Phone3D from '../common/Phone3D'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <Box component="section" className="hero-section" sx={{ pt: { xs: 5, md: 8 }, pb: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Chip
                label={HERO.badge}
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(255, 102, 0, 0.1)',
                  color: '#c45a00',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 102, 0, 0.2)',
                }}
              />
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.25rem', md: '3.25rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #7c3d00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                {HERO.title}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}>
              <Typography
                variant="body1"
                sx={{ color: '#6b7280', fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.8, mb: 3, maxWidth: 520 }}
              >
                {HERO.subtitle}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}
                className="hero-cta-stack"
              >
                <Button
                  component={Link}
                  to="/pricing"
                  variant="contained"
                  size="large"
                  disableElevation
                  className="btn-glow hero-nav-btn"
                  sx={{ ...primaryButtonSx, px: 4, py: 1.5, borderRadius: 2 }}
                >
                  {HERO.ctaPrimary}
                </Button>
                <Button
                  component={Link}
                  to="/gallery"
                  variant="outlined"
                  size="large"
                  className="hero-nav-btn"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#FF6600',
                    color: '#FF6600',
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    '&:hover': { borderColor: '#e55c00', bgcolor: 'rgba(255,102,0,0.06)' },
                  }}
                >
                  {HERO.ctaSecondary}
                </Button>
              </Stack>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1.5}
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                {HERO.highlights.map((item) => (
                  <Chip key={item} label={item} size="small" variant="outlined" sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                ))}
              </Stack>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Phone3D />
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}
