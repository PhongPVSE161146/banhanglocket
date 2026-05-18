import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { primaryButtonSx } from '../theme/muiTheme'
import Tilt3D from '../components/common/Tilt3D'

export default function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <Container maxWidth="sm">
        <Tilt3D maxTilt={10}>
          <div className="card-3d-surface page-header-3d" style={{ padding: 40 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Không tìm thấy trang
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
              Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
            </Typography>
            <Button component={Link} to="/" variant="contained" disableElevation sx={primaryButtonSx}>
              Về trang chủ
            </Button>
          </div>
        </Tilt3D>
      </Container>
    </Box>
  )
}
