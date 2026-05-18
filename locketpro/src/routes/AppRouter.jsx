import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import FeaturesPage from '../pages/FeaturesPage'
import GalleryPage from '../pages/GalleryPage'
import PricingPage from '../pages/PricingPage'
import SupportPage from '../pages/SupportPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturesPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
