import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import OurStory from '@/components/home/OurStory'
import VisionMission from '@/components/home/VisionMission'
import CoreValues from '@/components/home/CoreValues'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import OrderProcess from '@/components/home/OrderProcess'
import ComingSoon from '@/components/home/ComingSoon'
import StyleQuizCTA from '@/components/home/StyleQuizCTA'
import BundleBuilderCTA from '@/components/home/BundleBuilderCTA'
import Testimonials from '@/components/home/Testimonials'
import BranchStrip from '@/components/home/BranchStrip'
import Partners from '@/components/home/Partners'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Zelan Furniture — Luxury Furniture Crafted for Modern Living</title>
        <meta name="description" content="Premium furniture collections for every room. 4 showrooms across Addis Ababa with fast delivery, custom orders, and expert design guidance." />
      </Helmet>
      <HeroSection />
      <CategoryGrid />
      <FeaturedCollections />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <WhyChooseUs />
      <OrderProcess />
      <StyleQuizCTA />
      <BundleBuilderCTA />
      <ComingSoon />
      <Testimonials />
      <BranchStrip />
      <Partners />
    </>
  )
}
