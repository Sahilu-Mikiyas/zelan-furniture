import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

const fallback = [
  { customer_name: 'Meron T.', review: 'The bedroom set I ordered exceeded my expectations. Excellent quality and fast delivery to my home in Bole!', rating: 5 },
  { customer_name: 'Dawit A.', review: 'Amazing customer service. They helped me pick the perfect living room set for my apartment in CMC. Highly recommend!', rating: 5 },
  { customer_name: 'Sara B.', review: 'My office furniture arrived on time and looks absolutely stunning. The quality is outstanding for the price.', rating: 4 },
  { customer_name: 'Yonas K.', review: 'Ordered a custom wardrobe and it came out perfectly. The team was patient and professional throughout the process.', rating: 5 },
]

export default function Testimonials() {
  const [items, setItems] = useState<any[]>(fallback)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_visible', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setItems(data) })
  }, [])

  const prev = () => {
    setDirection(-1)
    setCurrent(i => (i === 0 ? items.length - 1 : i - 1))
  }
  const next = () => {
    setDirection(1)
    setCurrent(i => (i === items.length - 1 ? 0 : i + 1))
  }

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-stone-500 text-sm">4.9 / 5 from 200+ reviews</span>
          </div>
        </div>

        <div className="relative bg-white rounded-3xl shadow-sm p-8 md:p-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <div className="text-6xl text-amber-200 font-serif leading-none mb-4">"</div>
              <p className="text-stone-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                {items[current].review}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold">
                  {items[current].customer_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{items[current].customer_name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(items[current].rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 -left-4 hidden md:block">
            <button onClick={prev} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden md:block">
            <button onClick={next} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-amber-700' : 'w-2 h-2 bg-stone-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
