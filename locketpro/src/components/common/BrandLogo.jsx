import { Link } from 'react-router-dom'
import logoFull from '../../assets/logo.png'
import logoIcon from '../../assets/logo-icon.png'
import { BRAND_NAME } from '../../constants/siteData'

export default function BrandLogo({ variant = 'header', className = '' }) {
  if (variant === 'footer') {
    return (
      <Link to="/" className={`brand-logo-link brand-logo-footer ${className}`} aria-label={BRAND_NAME}>
        <img src={logoIcon} alt="" className="brand-logo-img brand-logo-icon-only" aria-hidden />
        <span className="brand-logo-footer-text">Pon Pon</span>
      </Link>
    )
  }

  return (
    <Link to="/" className={`brand-logo-link brand-logo-header-wrap ${className}`} aria-label={BRAND_NAME}>
      <img src={logoFull} alt={BRAND_NAME} className="brand-logo-img brand-logo-full" loading="eager" />
      <img src={logoIcon} alt={BRAND_NAME} className="brand-logo-img brand-logo-icon-only" loading="eager" />
    </Link>
  )
}
