import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-8xl mb-6">🛋️</div>
        <h1 className="text-6xl font-bold text-amber-700 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-stone-900 mb-3">Page Not Found</h2>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          Looks like this page doesn't exist. Let's get you back to browsing our furniture.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="border-2 border-stone-300 hover:border-amber-700 text-stone-700 hover:text-amber-700 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
