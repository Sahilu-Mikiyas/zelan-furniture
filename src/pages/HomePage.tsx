import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import ComingSoon from '@/components/home/ComingSoon'
import ProductShowcase from '@/components/home/ProductShowcase'
import VisionMission from '@/components/home/VisionMission'
import CoreValues from '@/components/home/CoreValues'
import OurStory from '@/components/home/OurStory'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import OrderProcess from '@/components/home/OrderProcess'
import StyleQuizCTA from '@/components/home/StyleQuizCTA'
import BundleBuilderCTA from '@/components/home/BundleBuilderCTA'
import FeaturedPhotos from '@/components/home/FeaturedPhotos'
import BranchesMap from '@/components/home/BranchesMap'
import Testimonials from '@/components/home/Testimonials'
import Partners from '@/components/home/Partners'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Zelan Furniture — Luxury Furniture Crafted for Modern Living</title>
        <meta name="description" content="Premium furniture collections for every room. 4 showrooms across Addis Ababa with fast delivery, custom orders, and expert design guidance." />
      </Helmet>
      <HeroSection />
      <FeaturedCollections />
      <ComingSoon />
      <ProductShowcase />
      <VisionMission />
      <CoreValues />
      <OurStory />
      <OrderProcess />
      <WhyChooseUs />
      <StyleQuizCTA />
      <BundleBuilderCTA />
      <FeaturedPhotos />
      <BranchesMap />
      <Testimonials />
      <Partners />
    </>
  )
}
