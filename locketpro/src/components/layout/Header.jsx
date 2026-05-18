import { NavLink, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import { NAV_LINKS } from '../../constants/siteData'
import { primaryButtonSx } from '../../theme/muiTheme'
import BrandLogo from '../common/BrandLogo'

function NavItems({ className = '' }) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}${className ? ` ${className}` : ''}`}
        >
          {link.label}
        </NavLink>
      ))}
    </>
  )
}

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="header-3d site-header"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <Container maxWidth="lg" className="header-container">
        <Box className="header-row-top">
          <BrandLogo variant="header" className="header-logo-wrap" />

          <Button
            component={Link}
            to="/pricing"
            variant="contained"
            disableElevation
            className="btn-glow hero-nav-btn header-cta"
            sx={{ ...primaryButtonSx, px: { xs: 2, sm: 2.5 }, py: { xs: 0.9, sm: 1 }, fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
          >
            Xem bảng giá
          </Button>
        </Box>

        <Box component="nav" className="header-nav-desktop" aria-label="Menu chính">
          <NavItems />
        </Box>

        <Box component="nav" className="header-nav-mobile" aria-label="Menu di động">
          <NavItems className="nav-link-mobile" />
        </Box>
      </Container>
    </AppBar>
  )
}
