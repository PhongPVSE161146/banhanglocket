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
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <Box
      component="section"
      className="hero-section"
      sx={{
        pt: { xs: 3, sm: 5, md: 8 },
        pb: { xs: 4, md: 6 },
        px: { xs: 0, sm: 0 },
      }}
    >
      <Container maxWidth="lg" className="hero-container" disableGutters={false}>
        <Box className="hero-grid">
          <Box className="hero-content">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Chip
                label={HERO.badge}
                className="hero-badge"
                sx={{
                  mb: { xs: 1.5, md: 2 },
                  maxWidth: '100%',
                  height: 'auto',
                  '& .MuiChip-label': {
                    whiteSpace: 'normal',
                    lineHeight: 1.4,
                    py: 0.75,
                    px: 1,
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  },
                  bgcolor: 'rgba(255, 102, 0, 0.1)',
                  color: '#c45a00',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 102, 0, 0.2)',
                }}
              />
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
              <Typography variant="h1" className="hero-title">
                {HERO.title}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}>
              <Typography component="p" className="hero-subtitle">
                {HERO.subtitle}
              </Typography>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
              <Stack
                className="hero-cta-stack"
                spacing={1.5}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ width: '100%' }}
              >
                <Button
                  component={Link}
                  to="/pricing"
                  variant="contained"
                  size="large"
                  fullWidth
                  disableElevation
                  className="btn-glow hero-nav-btn hero-btn"
                  sx={{ ...primaryButtonSx, py: 1.5, borderRadius: 2 }}
                >
                  {HERO.ctaPrimary}
                </Button>
                <Button
                  component={Link}
                  to="/gallery"
                  variant="outlined"
                  size="large"
                  fullWidth
                  className="hero-nav-btn hero-btn"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#FF6600',
                    color: '#FF6600',
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': { borderColor: '#e55c00', bgcolor: 'rgba(255,102,0,0.06)' },
                  }}
                >
                  {HERO.ctaSecondary}
                </Button>
              </Stack>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}>
              <Stack
                className="hero-highlights"
                direction="row"
                flexWrap="wrap"
                gap={1}
                sx={{ mt: { xs: 2, md: 2.5 } }}
              >
                {HERO.highlights.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(0,0,0,0.1)',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      maxWidth: '100%',
                      height: 'auto',
                      '& .MuiChip-label': { whiteSpace: 'normal', py: 0.5 },
                    }}
                  />
                ))}
              </Stack>
            </motion.div>
          </Box>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Phone3D />
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}
