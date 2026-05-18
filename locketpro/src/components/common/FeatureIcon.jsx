import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

const ICON_MAP = {
  photo: PhotoLibraryOutlinedIcon,
  phone: PhoneAndroidOutlinedIcon,
  sparkle: AutoAwesomeOutlinedIcon,
  shield: SecurityOutlinedIcon,
  speed: SpeedOutlinedIcon,
  heart: FavoriteBorderOutlinedIcon,
}

export default function FeatureIcon({ name }) {
  const Icon = ICON_MAP[name] ?? PhotoLibraryOutlinedIcon
  return <Icon fontSize="large" />
}
