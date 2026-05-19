import { ShieldCheck, Truck, Palette, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  { icon: ShieldCheck, title: 'Premium Quality', desc: 'Every piece is crafted from top-grade materials, built to last for generations.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day and next-day delivery available across all of Addis Ababa.' },
  { icon: Palette, title: 'Custom Orders', desc: "Can't find exactly what you need? We craft bespoke furniture to your specifications." },
  { icon: Headphones, title: 'Expert Guidance', desc: 'Our design consultants help you choose pieces that match your space and style.' },
]

export default function WhyChooseUs() {
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
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Why Choose Zelan?</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            We're committed to making your home beautiful — from selection to delivery and beyond.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="group p-6 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <r.icon size={22} className="text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-900 mb-2">{r.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
