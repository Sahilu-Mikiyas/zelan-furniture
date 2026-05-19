import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles } from 'lucide-react'

type Showcase = {
  category: string
  badge: string
  title: string
  description: string
  bullets: string[]
  benefits: string[]
  href: string
  heroImage: string
  products: { name: string; price: string; image: string }[]
  reversed?: boolean
}

const showcases: Showcase[] = [
  {
    category: 'Bedroom',
    badge: 'Most Requested',
    title: 'Bedroom Furniture Collections',
    description: 'Premium beds, headboards, nightstands, dressers — designed to transform your bedroom into a luxurious sanctuary.',
    bullets: ['Elegant bed frames & headboards', 'Warm lighting-ready finishes', 'Solid wood & upholstered options'],
    benefits: ['Matching sets available', 'Custom sizing options', 'Premium upholstery'],
    href: '/products?category=bedroom',
    heroImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
    products: [
      { name: 'Royal King Bed', price: '$$$', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80' },
      { name: 'Walnut Dresser', price: '$$', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80' },
      { name: 'Nightstand Set', price: '$', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80' },
    ],
  },
  {
    category: 'Living Room',
    badge: 'Available Now',
    title: 'Living Room & Lounge Pieces',
    description: 'Sofas, lounge seating, coffee tables, and entertainment units — reception-ready arrangements for every style.',
    bullets: ['Leather & fabric sofas', 'Modular configurations', 'Custom upholstery'],
    benefits: ['Coordinated sets', 'Reception-ready', 'Multiple finishes'],
    href: '/products?category=living-room',
    heroImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80',
    products: [
      { name: 'Sectional Sofa', price: '$$$', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
      { name: 'Coffee Table', price: '$', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
      { name: 'Accent Chair', price: '$$', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
    ],
    reversed: true,
  },
  {
    category: 'Dining',
    badge: 'Best Sellers',
    title: 'Dining Furniture & Entertaining Spaces',
    description: 'Dining tables, chairs, buffets, and bar carts — beautiful pieces where memories are made.',
    bullets: ['Solid wood dining tables', '4–10 seater options', 'Matching chair sets'],
    benefits: ['Extendable tables', 'Buffet & sideboards', 'Bar accessories'],
    href: '/products?category=dining',
    heroImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    products: [
      { name: 'Oak Dining Set', price: '$$$', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&q=80' },
      { name: 'Dining Chairs', price: '$', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80' },
      { name: 'Buffet Cabinet', price: '$$', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&q=80' },
    ],
  },
  {
    category: 'Office',
    badge: 'Custom Friendly',
    title: 'Office Furniture & Storage Solutions',
    description: 'Desks, workstations, wardrobes, and storage — functional custom options tailored to your space.',
    bullets: ['Home office setups', 'Executive desks', 'Reception counters'],
    benefits: ['Built-in wardrobes', 'Ergonomic chairs', 'Custom storage'],
    href: '/products?category=office',
    heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    products: [
      { name: 'Executive Desk', price: '$$$', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
      { name: 'Ergo Chair', price: '$$', image: 'https://images.unsplash.com/photo-1505797149-35ebcc40e7d2?w=400&q=80' },
      { name: 'Storage Cabinet', price: '$', image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=400&q=80' },
    ],
    reversed: true,
  },
]

function ShowcaseRow({ s, index }: { s: Showcase; index: number }) {
  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index < showcases.length - 1 ? 'mb-24' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
    >
      {/* Image column */}
      <div className={`space-y-4 ${s.reversed ? 'lg:order-2' : ''}`}>
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <img src={s.heroImage} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
          <div className="absolute top-4 left-4 bg-amber-700/90 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={10} /> {s.badge}
          </div>
        </motion.div>

        {/* Product mini cards — inline below image */}
        <div className="grid grid-cols-3 gap-3">
          {s.products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold text-stone-800 truncate">{p.name}</p>
                <p className="text-[10px] text-amber-700 font-bold">{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text column */}
      <div className={s.reversed ? 'lg:order-1' : ''}>
        <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          {s.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 leading-snug">
          {s.title}
        </h3>
        <p className="text-stone-500 leading-relaxed mb-6 text-sm">{s.description}</p>

        <div className="grid sm:grid-cols-2 gap-5 mb-7">
          <div>
            <h4 className="font-bold text-stone-800 text-xs mb-3 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center">
                <Check size={11} className="text-amber-700" />
              </span>
              What We Provide
            </h4>
            <ul className="space-y-1.5">
              {s.bullets.map(b => (
                <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="w-1 h-1 bg-amber-600 rounded-full mt-2 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-800 text-xs mb-3 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center">
                <Sparkles size={10} className="text-amber-700" />
              </span>
              Key Benefits
            </h4>
            <ul className="space-y-1.5">
              {s.benefits.map(b => (
                <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="w-1 h-1 bg-amber-600 rounded-full mt-2 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          to={s.href}
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
        >
          Shop {s.category} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Our Products & Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Explore Every <span className="italic font-light text-amber-700">Room</span>
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Each collection is hand-curated to bring premium quality, timeless design, and lasting value to your home.
          </p>
        </motion.div>

        {showcases.map((s, i) => (
          <ShowcaseRow key={s.title} s={s} index={i} />
        ))}

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-10 border border-amber-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">Explore Our Full Marketplace</h3>
          <p className="text-stone-500 mb-6 max-w-xl mx-auto">Browse over 500+ furniture pieces across 5 categories — all available across our 4 Addis Ababa showrooms.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
          >
            Browse All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
