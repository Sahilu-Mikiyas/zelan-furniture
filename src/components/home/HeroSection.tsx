import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

const categoryPills = [
  { label: 'Bedroom', href: '/products?category=bedroom' },
  { label: 'Living Room', href: '/products?category=living-room' },
  { label: 'Dining', href: '/products?category=dining' },
  { label: 'Office', href: '/products?category=office' },
  { label: 'Storage', href: '/products?category=storage' },
]

export default function HeroSection() {
  const [banner, setBanner] = useState<any>(null)

  useEffect(() => {
    supabase.from('hero_banners').select('*').eq('is_active', true).single()
      .then(({ data }) => { if (data) setBanner(data) })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
              Premium Furniture · Addis Ababa
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-5">
              {banner?.heading
                ? banner.heading
                : (<>Luxury Furniture<span className="block text-amber-700">Crafted for</span><span className="block">Modern Living</span></>)
              }
            </h1>
            <p className="text-stone-500 text-lg mb-8 max-w-md leading-relaxed">
              {banner?.subheading || 'Discover premium furniture collections for every room. 4 showrooms across Addis Ababa, with fast delivery and custom orders.'}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                {banner?.cta_text || 'Shop Now'} <ArrowRight size={16} />
              </Link>
              <Link
                to="/quiz"
                className="flex items-center gap-2 border-2 border-stone-300 hover:border-amber-700 hover:text-amber-700 text-stone-700 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Find Your Style
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryPills.map(pill => (
                <Link
                  key={pill.href}
                  to={pill.href}
                  className="bg-white/70 hover:bg-white text-stone-600 hover:text-amber-700 text-sm px-4 py-1.5 rounded-full border border-stone-200 hover:border-amber-300 transition-all"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="relative bg-gradient-to-br from-amber-100 to-stone-200 rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              {banner?.image_url ? (
                <img src={banner.image_url} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-stone-400">
                    <div className="text-8xl mb-4">🛋️</div>
                    <p className="text-sm">Hero Image</p>
                    <p className="text-xs">(Upload from admin)</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg p-3">
                <p className="text-xs text-stone-400">Happy Customers</p>
                <p className="text-xl font-bold text-stone-800">2,400+</p>
              </div>
              <div className="absolute top-4 right-4 bg-amber-700 text-white rounded-2xl shadow-lg p-3">
                <p className="text-xs text-amber-200">Products</p>
                <p className="text-xl font-bold">500+</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: '500+', label: 'Products' },
            { value: '4', label: 'Showrooms' },
            { value: '2,400+', label: 'Happy Customers' },
            { value: '5★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-amber-700">{stat.value}</p>
              <p className="text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
