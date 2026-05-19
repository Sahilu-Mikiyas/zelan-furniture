import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>Zelan Furniture — Premium Furniture in Addis Ababa</title>
        <meta name="description" content="Discover premium furniture collections for every room. 4 showrooms across Addis Ababa with fast delivery and custom orders." />
      </Helmet>
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
