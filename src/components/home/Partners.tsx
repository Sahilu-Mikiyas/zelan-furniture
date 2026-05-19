import { motion } from 'framer-motion'
import { Building, Droplet, Smile, Landmark, Layers } from 'lucide-react'

const partners = [
  { icon: Building, name: 'Scale Building Contractors' },
  { icon: Droplet, name: 'Konjo Water' },
  { icon: Smile, name: 'Smile Speciality Dental' },
  { icon: Landmark, name: 'Dashen Bank' },
  { icon: Layers, name: 'Maleda Foam' },
]

export default function Partners() {
  return (
    <section className="py-20 bg-stone-50 border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Trusted By
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Our Partners</h2>
          <p className="text-stone-500">Proud to work alongside Ethiopia's leading brands and institutions.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow border border-stone-100 group cursor-default"
            >
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-amber-700 transition-colors">
                <p.icon size={26} className="text-amber-700 group-hover:text-white transition-colors" />
              </div>
              <p className="font-semibold text-stone-700 text-sm leading-tight">{p.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a href="#contact" className="text-amber-700 hover:text-amber-800 font-semibold text-sm hover:underline">
            Learn more about our partners →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
