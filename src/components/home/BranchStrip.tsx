import { Phone, MapPin, Clock } from 'lucide-react'

const branches = [
  { name: 'Meskel Flower', phone: '0984 272 727', area: 'Meskel Flower' },
  { name: 'Salitemeheret', phone: '0969 333 333', area: 'Salitemeheret' },
  { name: 'Bole Atlas', phone: '0993 858 585', area: 'Bole Atlas' },
  { name: 'Lebu', phone: '0996 656 565', area: 'Lebu' },
]

export default function BranchStrip() {
  return (
    <section className="py-20 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Visit Our Showrooms</h2>
          <p className="text-stone-400">4 locations across Addis Ababa — see and feel the quality in person</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {branches.map(b => (
            <div key={b.name} className="bg-stone-800 rounded-2xl p-5 hover:bg-stone-700 transition-colors group">
              <div className="w-8 h-8 bg-amber-700/30 rounded-lg flex items-center justify-center mb-3">
                <MapPin size={16} className="text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-1">{b.name}</h3>
              <p className="text-stone-400 text-sm mb-3">{b.area}, Addis Ababa</p>
              <div className="flex items-center gap-2 text-sm text-stone-400 mb-2">
                <Clock size={12} className="text-amber-500" />
                <span>Mon–Sat, 9AM–7PM</span>
              </div>
              <a
                href={`tel:${b.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                <Phone size={12} />
                {b.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
