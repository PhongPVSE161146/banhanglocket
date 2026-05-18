import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tilt3D from './Tilt3D'

export default function PageHeader({ title, subtitle }) {
  return (
    <Box sx={{ textAlign: 'center', pt: { xs: 4, md: 6 }, pb: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Tilt3D maxTilt={5}>
          <motion.div
            className="page-header-3d card-3d-surface"
            initial={{ opacity: 0, rotateX: 12, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                letterSpacing: '-0.02em',
                mb: subtitle ? 1.5 : 0,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
                {subtitle}
              </Typography>
            )}
          </motion.div>
        </Tilt3D>
      </Container>
    </Box>
  )
}
