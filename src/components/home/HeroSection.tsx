import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bed, Sofa, Utensils, Briefcase, Archive, ShoppingBag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

const categories = [
  { icon: Bed, label: 'Bedroom Sets', href: '/products?category=bedroom' },
  { icon: Sofa, label: 'Living Room', href: '/products?category=living-room' },
  { icon: Utensils, label: 'Dining', href: '/products?category=dining' },
  { icon: Briefcase, label: 'Office', href: '/products?category=office' },
  { icon: Archive, label: 'Wardrobes', href: '/products?category=storage' },
  { icon: ShoppingBag, label: 'Shop All', href: '/products' },
]

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80'

export default function HeroSection() {
  const [banner, setBanner] = useState<any>(null)

  useEffect(() => {
    supabase.from('hero_banners').select('*').eq('is_active', true).single()
      .then(({ data }) => { if (data) setBanner(data) })
  }, [])

  const heroImage = banner?.image_url || FALLBACK_HERO

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury furniture interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/65 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-60 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-amber-600/20 backdrop-blur-md text-amber-200 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase border border-amber-400/30">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Premium Furniture · Addis Ababa
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {banner?.heading || (
              <>
                Luxury Furniture
                <span className="block mt-2"><span className="italic font-light text-amber-300">Crafted</span> for</span>
                <span className="block">Modern Living</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="text-stone-200 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {banner?.subheading || 'Discover premium furniture collections for every room. 4 showrooms across Addis Ababa, with fast delivery and custom orders.'}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="group flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              {banner?.cta_text || 'Shop Now'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/quiz"
              className="flex items-center gap-2 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-all"
            >
              Find Your Style
            </Link>
          </motion.div>

          {/* 6 category buttons grid (matching sample site) */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
              >
                <Link
                  to={cat.href}
                  className="group flex items-center gap-2.5 backdrop-blur-md bg-white/10 hover:bg-amber-600 border border-white/20 hover:border-amber-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                >
                  <cat.icon size={16} className="text-amber-300 group-hover:text-white transition-colors" />
                  <span>{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom stats bar - floating glass card */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Products' },
              { value: '4', label: 'Showrooms' },
              { value: '2,400+', label: 'Happy Customers' },
              { value: '5★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-amber-300">{stat.value}</p>
                <p className="text-xs text-stone-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
