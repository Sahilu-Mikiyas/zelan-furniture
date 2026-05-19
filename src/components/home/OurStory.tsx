import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function OurStory() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative grid grid-cols-2 gap-4">
              <motion.div
                className="space-y-4"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                    alt="Showroom"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80"
                    alt="Living"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>
              <motion.div
                className="space-y-4 pt-10"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80"
                    alt="Bedroom"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80"
                    alt="Dining"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-amber-700 text-white rounded-2xl p-4 shadow-2xl"
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <p className="text-2xl font-bold leading-none">10+</p>
              <p className="text-xs text-amber-200 mt-1">Years of Craft</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Building Beautiful <br />
              <span className="italic font-light text-amber-700">Ethiopian</span> Homes
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-5">
              Zelan Furniture was founded with a simple mission: bring premium quality furniture to Ethiopian homes at accessible prices, with expert guidance and a personal touch.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              With 4 showrooms across Addis Ababa, we've transformed thousands of homes and offices. Our team works closely with each customer to understand their space, style, and budget — whether you're furnishing a studio in Bole or a villa in CMC.
            </p>

            {/* Stats inline */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '2,400+', label: 'Happy Customers' },
                { value: '500+', label: 'Products' },
                { value: '4', label: 'Showrooms' },
              ].map(s => (
                <div key={s.label} className="border-l-2 border-amber-600 pl-3">
                  <p className="text-2xl font-bold text-stone-900">{s.value}</p>
                  <p className="text-xs text-stone-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-amber-900/20 hover:shadow-xl hover:-translate-y-0.5 group"
            >
              Read Our Full Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
