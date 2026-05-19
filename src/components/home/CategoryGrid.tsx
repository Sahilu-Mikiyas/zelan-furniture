import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  { id: 'bedroom', label: 'Bedroom', label_am: 'መኝታ ቤት', icon: '🛏️', color: 'from-amber-50 to-amber-100', border: 'border-amber-200' },
  { id: 'living-room', label: 'Living Room', label_am: 'መቀመጫ ክፍል', icon: '🛋️', color: 'from-stone-50 to-stone-100', border: 'border-stone-200' },
  { id: 'dining', label: 'Dining', label_am: 'መመገቢያ', icon: '🍽️', color: 'from-orange-50 to-orange-100', border: 'border-orange-200' },
  { id: 'office', label: 'Office', label_am: 'ቢሮ', icon: '💼', color: 'from-slate-50 to-slate-100', border: 'border-slate-200' },
  { id: 'storage', label: 'Storage', label_am: 'ማከማቻ', icon: '🗄️', color: 'from-zinc-50 to-zinc-100', border: 'border-zinc-200' },
]

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Shop by Category</h2>
          <p className="text-stone-500">Find the perfect furniture for every room in your home</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className={`group bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 block`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <p className="font-semibold text-stone-800 text-sm">{cat.label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{cat.label_am}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
