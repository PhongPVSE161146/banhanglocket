import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Scene3DBackground from '../components/common/Scene3DBackground'
import Snowfall from '../components/effects/Snowfall'
import BackgroundMusic from '../components/effects/BackgroundMusic'

export default function MainLayout() {
  return (
    <div className="page page-3d">
      <Scene3DBackground />
      <Snowfall />
      <BackgroundMusic />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
