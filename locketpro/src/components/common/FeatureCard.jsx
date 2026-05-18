import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FeatureIcon from './FeatureIcon'
import Tilt3D from './Tilt3D'

export default function FeatureCard({ icon, title, desc }) {
  return (
    <Tilt3D maxTilt={12} scale={1.03} className="feature-card-wrap">
      <Card className="feature-card card-3d-surface" elevation={0}>
        <CardContent>
          <div className="feature-icon">
            <FeatureIcon name={icon} />
          </div>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Tilt3D>
  )
}
