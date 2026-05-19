import { motion } from 'framer-motion'
import { Hammer, Tv, Briefcase, Building2, MessageCircle, Truck, LayoutGrid, Clock } from 'lucide-react'

const services = [
  { icon: Hammer, title: 'Custom Wardrobes', desc: 'Built-in wardrobes tailored to your space and storage needs.' },
  { icon: Tv, title: 'TV Wall Units', desc: 'Stylish entertainment centers with hidden storage solutions.' },
  { icon: Briefcase, title: 'Reception Counters', desc: 'Professional reception furniture for hotels and offices.' },
  { icon: Building2, title: 'Hotel Furniture Supply', desc: 'Bulk furnishing for hospitality projects of any size.' },
  { icon: MessageCircle, title: 'Interior Consultation', desc: 'One-on-one design guidance from our expert team.' },
  { icon: Truck, title: 'Bulk Project Orders', desc: 'Volume pricing and dedicated support for large orders.' },
  { icon: LayoutGrid, title: 'Space Planning Support', desc: 'Layout planning to maximize comfort and flow.' },
]

export default function ComingSoon() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <Clock size={12} /> Coming Soon
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">Expanding Our Services</h2>
          <p className="text-stone-500 max-w-xl mx-auto">Exciting new offerings to better serve Ethiopian homes and businesses.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative bg-gradient-to-br from-stone-50 to-amber-50/60 rounded-3xl p-6 border border-stone-100 hover:border-amber-200 group transition-colors overflow-hidden"
            >
              <div className="absolute top-3 right-3 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full tracking-wider">
                SOON
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
                <s.icon size={26} className="text-white" />
              </div>
              <h3 className="font-bold text-stone-900 mb-2 text-lg">{s.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
