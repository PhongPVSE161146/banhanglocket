import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import FeaturesSection from '../components/home/FeaturesSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import PricingSection from '../components/home/PricingSection'
import CtaBannerSection from '../components/home/CtaBannerSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection compact />
      <CtaBannerSection />
    </>
  )
}
