import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const fallback = [
  {
    customer_name: 'Meron Tadesse',
    role: 'Homeowner, Bole',
    review: 'The bedroom set I ordered exceeded all my expectations. Delivery was on time and the quality is outstanding — feels like a 5-star hotel every night.',
    rating: 5,
    avatar: 'MT',
    color: 'from-amber-500 to-amber-700',
  },
  {
    customer_name: 'Dawit Alemayehu',
    role: 'Interior Designer',
    review: 'I recommend Zelan to all my clients. Their custom order process is smooth, the craftsmanship is top-tier, and the team is incredibly professional.',
    rating: 5,
    avatar: 'DA',
    color: 'from-stone-600 to-stone-800',
  },
  {
    customer_name: 'Sara Bekele',
    role: 'Business Owner, CMC',
    review: 'Furnished our entire office reception through Zelan. The reception counter and executive chairs look absolutely stunning. Our clients are always impressed.',
    rating: 5,
    avatar: 'SB',
    color: 'from-amber-700 to-orange-800',
  },
  {
    customer_name: 'Yonas Kifle',
    role: 'Homeowner, Kazanchis',
    review: 'Ordered a custom built-in wardrobe. The team came to measure, suggested the layout, and delivered perfection. Worth every birr.',
    rating: 5,
    avatar: 'YK',
    color: 'from-stone-700 to-amber-800',
  },
  {
    customer_name: 'Hana Girma',
    role: 'Architect, Addis Ababa',
    review: 'Working with Zelan on hotel furniture projects has been a pleasure. Consistent quality, reliable timelines, and beautiful results every single time.',
    rating: 5,
    avatar: 'HG',
    color: 'from-amber-600 to-stone-700',
  },
  {
    customer_name: 'Bereket Solomon',
    role: 'Homeowner, Lebu',
    review: 'Visited the Lebu branch and left with a full dining set. The staff was knowledgeable, no pressure, and the furniture is gorgeous. Highly recommend!',
    rating: 5,
    avatar: 'BS',
    color: 'from-stone-500 to-amber-700',
  },
]

export default function Testimonials() {
  const [items, setItems] = useState(fallback)

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_visible', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data && data.length >= 3) setItems(data) })
  }, [])

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-stone-50 to-white" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Customer Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Loved by <span className="italic font-light text-amber-700">Thousands</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 font-bold text-stone-800">4.9</span>
            <span className="text-stone-400 text-sm">/ 5 from 2,400+ customers</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-lg transition-all relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-amber-100">
                <Quote size={36} className="fill-amber-100 text-amber-100" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(item.rating || 5)].map((_, s) => (
                  <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-stone-600 text-sm leading-relaxed mb-6 relative z-10">
                "{item.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color || 'from-amber-500 to-amber-700'} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {(item.avatar || item.customer_name?.slice(0, 2) || 'CX').toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{item.customer_name}</p>
                  <p className="text-xs text-stone-400">{item.role || 'Verified Customer'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
