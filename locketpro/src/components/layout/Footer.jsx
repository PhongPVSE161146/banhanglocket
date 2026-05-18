import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import { BRAND_NAME, FOOTER_LINKS } from '../../constants/siteData'
import Tilt3D from '../common/Tilt3D'

export default function Footer() {
  return (
    <footer className="footer footer-3d">
      <Container maxWidth="lg">
        <Tilt3D maxTilt={4} scale={1.005}>
          <div className="footer-inner card-3d-surface">
            <Link to="/" className="logo-serif">
              {BRAND_NAME}
            </Link>
            <nav className="footer-links">
              {FOOTER_LINKS.map((link) =>
                link.external ? (
                  <a key={link.label} href={link.path} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.path}>
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
            <span className="footer-copy">© 2026 {BRAND_NAME}. Bảo lưu mọi quyền.</span>
          </div>
        </Tilt3D>
      </Container>
    </footer>
  )
}
