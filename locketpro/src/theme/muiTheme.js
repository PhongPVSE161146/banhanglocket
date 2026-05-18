import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    primary: { main: '#FF6600' },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  shape: { borderRadius: 12 },
})

export const primaryButtonSx = {
  bgcolor: '#FF6600',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': { bgcolor: '#e55c00' },
}
