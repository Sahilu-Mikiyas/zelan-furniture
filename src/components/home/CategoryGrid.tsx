import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'bedroom',
    label: 'Bedroom',
    label_am: 'መኝታ ቤት',
    desc: 'Beds, headboards, dressers',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    id: 'living-room',
    label: 'Living Room',
    label_am: 'መቀመጫ ክፍል',
    desc: 'Sofas, chairs, tables',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  },
  {
    id: 'dining',
    label: 'Dining',
    label_am: 'መመገቢያ',
    desc: 'Tables, chairs, buffets',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
  },
  {
    id: 'office',
    label: 'Office',
    label_am: 'ቢሮ',
    desc: 'Desks, chairs, storage',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'storage',
    label: 'Storage',
    label_am: 'ማከማቻ',
    desc: 'Wardrobes, cabinets',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              Shop By Category
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-3">
              Find Your <span className="italic font-light text-amber-700">Perfect</span> Room
            </h2>
            <p className="text-stone-500 max-w-md">From cozy bedrooms to elegant dining — we have furniture for every space.</p>
          </div>
          <Link to="/products" className="group flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-semibold text-sm">
            View All Categories <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className={i === 0 ? 'md:col-span-1 lg:row-span-2 lg:row-start-1' : ''}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className={`group relative block overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-shadow ${i === 0 ? 'aspect-[3/4] lg:aspect-auto lg:h-full' : 'aspect-square'}`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <p className="text-xs text-amber-300 font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.label_am}
                  </p>
                  <h3 className="font-bold text-xl mb-1">{cat.label}</h3>
                  <p className="text-xs text-stone-200 mb-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight size={12} />
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
