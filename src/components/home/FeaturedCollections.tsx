import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const collections = [
  {
    title: 'Luxury Bedroom Collections',
    badge: 'Most Requested',
    badgeColor: 'bg-amber-600',
    description: 'Modern beds, side tables, upholstered headboards — designed to transform your bedroom into a sanctuary.',
    bullets: ['Elegant bed frames & headboards', 'Warm lighting-ready finishes', 'Matching dressers & nightstands'],
    href: '/products?category=bedroom',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80',
  },
  {
    title: 'Living Room Statement Pieces',
    badge: 'Available Now',
    badgeColor: 'bg-emerald-700',
    description: 'Sofas, lounge seating, coffee tables for every taste — reception-ready arrangements for the modern home.',
    bullets: ['Leather & fabric options', 'Modular configurations', 'Custom upholstery available'],
    href: '/products?category=living-room',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80',
  },
  {
    title: 'Office & Storage Solutions',
    badge: 'Custom Friendly',
    badgeColor: 'bg-stone-800',
    description: 'Desks, workstations, wardrobes — functional custom options tailored to your space and workflow.',
    bullets: ['Home office setups', 'Built-in wardrobes', 'Reception counters'],
    href: '/products?category=office',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80',
  },
]

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Featured Collections
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Curated for <span className="italic font-light text-amber-700">Ethiopian</span> Homes
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">Hand-picked sets that work beautifully together — designed for real living.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow group"
            >
              {/* Image with badge overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
                <span className={`absolute top-4 left-4 ${col.badgeColor} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                  {col.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{col.title}</h3>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed">{col.description}</p>
                <ul className="space-y-2 mb-6">
                  {col.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <Check size={14} className="text-amber-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={col.href}
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-bold text-sm group/btn"
                >
                  Shop Now
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
