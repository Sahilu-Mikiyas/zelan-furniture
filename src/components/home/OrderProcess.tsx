import { motion } from 'framer-motion'
import { Search, MessageCircle, ClipboardCheck, Truck } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Browse & Choose', desc: 'Explore our collections online or visit a showroom.', color: 'bg-amber-100 text-amber-700' },
  { icon: MessageCircle, title: 'Contact Us', desc: 'Reach out via WhatsApp or visit our nearest branch.', color: 'bg-orange-100 text-orange-700' },
  { icon: ClipboardCheck, title: 'Confirm Order', desc: 'Customize details and confirm your selection with us.', color: 'bg-yellow-100 text-yellow-700' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Receive your furniture, expertly delivered to your door.', color: 'bg-amber-100 text-amber-700' },
]

export default function OrderProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">Simple as 1 · 2 · 3 · 4</h2>
          <p className="text-stone-500 max-w-xl mx-auto">From browsing to delivery — here's how easy it is to bring Zelan into your home.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="relative inline-block mb-5">
                  <motion.div
                    className={`w-24 h-24 ${s.color} rounded-3xl flex items-center justify-center mx-auto shadow-md relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <s.icon size={32} />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-9 h-9 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{s.title}</h3>
                <p className="text-stone-500 text-sm max-w-[200px] mx-auto leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
