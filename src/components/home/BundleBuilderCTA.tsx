import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'

export default function BundleBuilderCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-amber-700/30 rounded-2xl flex items-center justify-center shrink-0">
              <Package size={28} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Build Your Room</h2>
              <p className="text-stone-400 max-w-md">
                Pick a room type and mix & match furniture pieces. Get a complete room setup with a combined price estimate and one-click WhatsApp request.
              </p>
            </div>
          </div>
          <Link
            href="/bundle"
            className="shrink-0 bg-amber-700 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors whitespace-nowrap"
          >
            Start Building →
          </Link>
        </div>
      </div>
    </section>
  )
}
