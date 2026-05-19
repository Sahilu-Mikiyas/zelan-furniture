import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Camera } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', label: 'Bedroom Inspiration', cat: 'Bedroom' },
  { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', label: 'Living Room Style', cat: 'Living Room' },
  { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80', label: 'Office Designs', cat: 'Office' },
  { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80', label: 'Dining Spaces', cat: 'Dining' },
]

export default function FeaturedPhotos() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between mb-10 flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              <Camera size={11} /> Featured Photos
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">
              Inspiration <span className="italic font-light text-amber-700">Gallery</span>
            </h2>
            <p className="text-stone-500">Real spaces designed and furnished by Zelan.</p>
          </div>
          <Link to="/gallery" className="group flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-semibold text-sm">
            Open Full Gallery <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Link to="/gallery" className="group relative block aspect-[4/5] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
                <img src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-[10px] text-amber-300 font-bold tracking-widest uppercase mb-1">{p.cat}</p>
                  <h3 className="font-bold text-lg">{p.label}</h3>
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Gallery <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
