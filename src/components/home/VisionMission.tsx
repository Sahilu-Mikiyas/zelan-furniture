import { motion } from 'framer-motion'
import { Eye, Target, Sparkles } from 'lucide-react'

const items = [
  {
    icon: Eye,
    label: 'Our Vision',
    text: 'To shape modern homes, offices, and hospitality spaces in Addis Ababa with elegant, practical, and comfortable furniture collections.',
  },
  {
    icon: Target,
    label: 'Our Mission',
    text: 'To deliver stylish furniture, responsive customer support, and curated showroom inspiration to every Ethiopian home.',
  },
  {
    icon: Sparkles,
    label: 'Our Motto',
    text: 'Designed for Comfortable Living.',
  },
]

export default function VisionMission() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 relative overflow-hidden">
      {/* Wood-grain decorative overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-700/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            About Zelan
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Crafted with <span className="text-amber-400">Purpose</span>
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
            We're more than a furniture store — we're partners in building beautiful spaces that feel like home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-br from-amber-900/40 to-stone-800/60 backdrop-blur-sm border border-amber-700/30 rounded-3xl p-8 group hover:border-amber-500/60 transition-colors"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform">
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className="text-amber-300 text-xs font-bold tracking-widest uppercase mb-2">{item.label}</h3>
              <p className="text-white text-lg leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
