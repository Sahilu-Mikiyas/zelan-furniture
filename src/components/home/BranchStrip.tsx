import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

const branches = [
  { name: 'Meskel Flower', address: 'Eyana Hotel Building, 1st Floor', phone: '0984 272 727' },
  { name: 'Salitemeheret', address: 'Behind the traffic light', phone: '0969 333 333' },
  { name: 'Bole Atlas', address: 'Behind Mado Hotel', phone: '0993 858 585' },
  { name: 'Lebu', address: 'Lebu Main Road', phone: '0996 656 565' },
]

export default function BranchStrip() {
  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden">
      {/* Decorative wood-grain blur */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-700/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Visit Us In Person
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="italic font-light text-amber-400">4</span> Showrooms
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">Across Addis Ababa — see and feel the quality before you buy.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-br from-stone-900/80 to-stone-800/40 backdrop-blur-sm border border-amber-700/20 rounded-3xl p-6 hover:border-amber-500/60 group transition-colors"
            >
              {/* Number indicator */}
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {i + 1}
              </div>

              <div className="w-12 h-12 bg-amber-700/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                <MapPin size={20} className="text-amber-400 group-hover:text-white transition-colors" />
              </div>

              <h3 className="font-bold text-white text-lg mb-1">{b.name}</h3>
              <p className="text-stone-400 text-sm mb-1">{b.address}</p>
              <p className="text-stone-500 text-xs mb-4">Addis Ababa, Ethiopia</p>

              <div className="flex items-center gap-2 text-stone-400 text-xs mb-3">
                <Clock size={12} className="text-amber-500" />
                <span>Mon–Sat · 9AM–7PM</span>
              </div>

              <a
                href={`tel:${b.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors group/btn"
              >
                <Phone size={13} />
                {b.phone}
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
