import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function StyleQuizCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-700 to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          <Sparkles size={14} />
          New Feature
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Not Sure Where to Start?
        </h2>
        <p className="text-amber-100 text-lg mb-8 max-w-lg mx-auto">
          Take our 2-minute style quiz and we'll curate a personalized furniture collection just for you.
        </p>
        <Link
          href="/quiz"
          className="inline-block bg-white text-amber-800 font-bold px-8 py-3.5 rounded-full hover:bg-amber-50 transition-colors shadow-lg"
        >
          Find My Style →
        </Link>
      </div>
    </section>
  )
}
