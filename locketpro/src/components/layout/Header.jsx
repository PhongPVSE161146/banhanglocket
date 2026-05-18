import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { BRAND_NAME, NAV_LINKS } from '../../constants/siteData'
import { primaryButtonSx } from '../../theme/muiTheme'

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="header-3d"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
          <Typography
            component={Link}
            to="/"
            className="logo-serif"
            sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 4 }, textDecoration: 'none', display: 'inline-block' }}
          >
            {BRAND_NAME}
          </Typography>

          <Box
            component="nav"
            className="nav-3d"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </Box>

          <Button
            component={Link}
            to="/pricing"
            variant="contained"
            disableElevation
            className="btn-glow hero-nav-btn"
            sx={{ ...primaryButtonSx, px: 2.5 }}
          >
            Xem bảng giá
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
