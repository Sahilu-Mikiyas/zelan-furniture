import { ShieldCheck, Truck, Palette, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  { icon: ShieldCheck, title: 'Premium Quality', title_am: 'ከፍተኛ ጥራት', desc: 'Every piece is crafted from top-grade materials, built to last for generations.', color: 'text-amber-700', bg: 'bg-amber-50' },
  { icon: Truck, title: 'Fast Delivery', title_am: 'ፈጣን ዴሊቨሪ', desc: 'Same-day and next-day delivery available across all of Addis Ababa.', color: 'text-green-700', bg: 'bg-green-50' },
  { icon: Palette, title: 'Custom Orders', title_am: 'ልዩ ትዕዛዝ', desc: "Can't find exactly what you need? We craft bespoke furniture to your specifications.", color: 'text-blue-700', bg: 'bg-blue-50' },
  { icon: Headphones, title: 'Expert Guidance', title_am: 'የባለሙያ ምክር', desc: 'Our design consultants help you choose pieces that match your space and style.', color: 'text-purple-700', bg: 'bg-purple-50' },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Why Choose Zelan?</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            We're committed to making your home beautiful — from selection to delivery and beyond.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="text-center p-6 rounded-2xl hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={`w-14 h-14 ${r.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <r.icon size={24} className={r.color} />
              </div>
              <h3 className="font-bold text-stone-900 mb-1">{r.title}</h3>
              <p className="text-xs text-stone-400 mb-2">{r.title_am}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
