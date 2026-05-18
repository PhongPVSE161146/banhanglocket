import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import { muiTheme } from './theme/muiTheme'
import { antdTheme } from './theme/antdTheme'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider locale={viVN} theme={antdTheme}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </StrictMode>,
)
