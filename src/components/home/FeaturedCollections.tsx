import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    title: 'Luxury Bedroom Collections',
    subtitle: 'Most Requested',
    description: 'Premium beds, headboards, nightstands, and dressers. Transform your bedroom into a sanctuary.',
    bullets: ['King & Queen sizes', 'Solid wood & upholstered', 'Matching sets available'],
    href: '/products?category=bedroom',
    bg: 'bg-amber-700',
    icon: '🛏️',
  },
  {
    title: 'Living Room Statement Pieces',
    subtitle: 'Available Now',
    description: 'Sofas, accent chairs, coffee tables, and entertainment units for every style.',
    bullets: ['Leather & fabric options', 'Modular configurations', 'Custom upholstery'],
    href: '/products?category=living-room',
    bg: 'bg-stone-800',
    icon: '🛋️',
  },
  {
    title: 'Office & Storage Solutions',
    subtitle: 'Custom Friendly',
    description: 'Elegant desks, ergonomic chairs, wardrobes, and smart storage for home and office.',
    bullets: ['Home office setups', 'Built-in wardrobes', 'Reception counters'],
    href: '/products?category=office',
    bg: 'bg-slate-700',
    icon: '💼',
  },
]

export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Featured Collections</h2>
          <p className="text-stone-500">Curated selections for the modern Ethiopian home</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map(col => (
            <div key={col.title} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
              {/* Card header */}
              <div className={`${col.bg} p-8 relative overflow-hidden`}>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {col.subtitle}
                </span>
                <div className="text-6xl mb-2">{col.icon}</div>
                <div className="absolute -bottom-4 -right-4 text-[120px] opacity-10">{col.icon}</div>
              </div>
              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-2">{col.title}</h3>
                <p className="text-stone-500 text-sm mb-4 leading-relaxed">{col.description}</p>
                <ul className="space-y-1 mb-6">
                  {col.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={col.href}
                  className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Shop Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
