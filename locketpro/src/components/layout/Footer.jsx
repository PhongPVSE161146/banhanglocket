import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import { BRAND_NAME, FOOTER_LINKS } from '../../constants/siteData'
import BrandLogo from '../common/BrandLogo'

export default function Footer() {
  return (
    <footer className="footer footer-3d">
      <Container maxWidth="lg">
        <div className="footer-inner card-3d-surface">
          <BrandLogo variant="footer" />
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
      </Container>
    </footer>
  )
}
