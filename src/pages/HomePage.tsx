import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import StyleQuizCTA from '@/components/home/StyleQuizCTA'
import BundleBuilderCTA from '@/components/home/BundleBuilderCTA'
import Testimonials from '@/components/home/Testimonials'
import BranchStrip from '@/components/home/BranchStrip'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedCollections />
      <WhyChooseUs />
      <StyleQuizCTA />
      <BundleBuilderCTA />
      <Testimonials />
      <BranchStrip />
    </>
  )
}
