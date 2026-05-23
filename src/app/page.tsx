import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import KanbanPreview from '@/components/landing/kanban-preview'
import FeaturesSection from '@/components/landing/features-section'
import SocialProofSection from '@/components/landing/social-proof-section'
import ComparisonSection from '@/components/landing/comparison-section'
import WorkflowSection from '@/components/landing/workflow-section'
import PricingSection from '@/components/landing/pricing-section'
import CtaSection from '@/components/landing/cta-section'
import Footer from '@/components/landing/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <KanbanPreview />
      <FeaturesSection />
      <SocialProofSection />
      <ComparisonSection />
      <WorkflowSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
