import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { PRICING_COMMITMENT } from '../../constants/siteData'
import Tilt3D from '../common/Tilt3D'

export default function CommitmentSection() {
  const { title, items, footer } = PRICING_COMMITMENT

  return (
    <Tilt3D maxTilt={6}>
      <div className="commitment-box card-3d-surface">
        <h3 className="commitment-title">{title}</h3>
        <ul className="commitment-list">
          {items.map((item) => (
            <li key={item}>
              <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 22 }} />
              {item}
            </li>
          ))}
        </ul>
        <p className="commitment-footer">{footer}</p>
      </div>
    </Tilt3D>
  )
}
