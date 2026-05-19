import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react'

const branches = [
  {
    name: 'Meskel Flower',
    address: 'Eyana Hotel Building, 1st Floor',
    phone: '0984 272 727',
    mapQuery: 'Meskel+Flower+Addis+Ababa',
  },
  {
    name: 'Salitemeheret',
    address: 'Behind the traffic light',
    phone: '0969 333 333',
    mapQuery: 'Salite+Mehret+Addis+Ababa',
  },
  {
    name: 'Bole Atlas',
    address: 'Behind Mado Hotel',
    phone: '0993 858 585',
    mapQuery: 'Bole+Atlas+Addis+Ababa',
  },
  {
    name: 'Lebu',
    address: 'Lebu Main Road',
    phone: '0996 656 565',
    mapQuery: 'Lebu+Addis+Ababa',
  },
]

export default function BranchesMap() {
  return (
    <section className="py-24 bg-white" id="branches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Visit Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Our <span className="italic font-light text-amber-700">Branches</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">4 showrooms across Addis Ababa — find the one closest to you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow border border-stone-100 group"
            >
              {/* Map embed */}
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <iframe
                  title={`Map of ${b.name}`}
                  src={`https://maps.google.com/maps?q=${b.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                  <MapPin size={11} /> {b.name}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-stone-900 text-xl mb-1">{b.name}</h3>
                    <p className="text-stone-500 text-sm flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-600" /> {b.address}
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${b.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-amber-700 hover:text-amber-800 text-xs font-semibold flex items-center gap-1"
                  >
                    Directions <ExternalLink size={11} />
                  </a>
                </div>

                <div className="flex items-center gap-4 flex-wrap pt-3 border-t border-stone-100">
                  <a
                    href={`tel:${b.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-amber-700 font-semibold transition-colors"
                  >
                    <Phone size={13} className="text-amber-600" />
                    {b.phone}
                  </a>
                  <span className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock size={12} className="text-amber-600" />
                    Mon–Sat · 9AM–7PM
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
