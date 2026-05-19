import { motion } from 'framer-motion'
import { Heart, HeadphonesIcon, Award, Sofa, Shield, Compass, Palette, Sparkles } from 'lucide-react'

const values = [
  { icon: Heart, label: 'Comfort', color: 'from-rose-200 to-rose-100' },
  { icon: HeadphonesIcon, label: 'Service', color: 'from-amber-200 to-amber-100' },
  { icon: Award, label: 'Quality', color: 'from-yellow-200 to-yellow-100' },
  { icon: Sofa, label: 'Lifestyle', color: 'from-orange-200 to-orange-100' },
  { icon: Shield, label: 'Reliability', color: 'from-stone-200 to-stone-100' },
  { icon: Compass, label: 'Design Guidance', color: 'from-amber-200 to-amber-100' },
  { icon: Palette, label: 'Style', color: 'from-rose-200 to-rose-100' },
  { icon: Sparkles, label: 'Excellence', color: 'from-yellow-200 to-yellow-100' },
]

export default function CoreValues() {
  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            What We Stand For
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">Our Core Values</h2>
          <p className="text-stone-500 max-w-xl mx-auto">Eight principles that guide everything we do — from the first hello to delivery day.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className={`bg-gradient-to-br ${v.color} rounded-2xl p-6 text-center group cursor-default border border-white shadow-sm hover:shadow-lg transition-shadow`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:rotate-12 transition-transform">
                <v.icon size={22} className="text-amber-700" />
              </div>
              <p className="font-bold text-stone-800 text-sm">{v.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
