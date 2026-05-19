import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type Product = {
  id: string
  name: string
  slug: string
  price_tier: number
  status: string
  images: string[]
  category_id: string
  style_tag?: string
  is_featured?: boolean
  view_count?: number
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'

const statusConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: 'In Stock', color: 'text-green-700 bg-green-50' },
  limited: { label: 'Limited', color: 'text-amber-700 bg-amber-50' },
  made_to_order: { label: 'To Order', color: 'text-blue-700 bg-blue-50' },
}

const priceDots = (tier: number) => (
  <span className="flex gap-0.5 items-center">
    {[1, 2, 3].map(i => (
      <span key={i} className={cn('w-1.5 h-1.5 rounded-full', i <= tier ? 'bg-amber-600' : 'bg-stone-200')} />
    ))}
  </span>
)

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
    setWishlisted(wl.includes(product.id))
  }, [product.id])

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    const wl: string[] = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
    const updated = wishlisted ? wl.filter(id => id !== product.id) : [...wl, product.id]
    localStorage.setItem('zelan_wishlist', JSON.stringify(updated))
    setWishlisted(!wishlisted)
    window.dispatchEvent(new Event('wishlist-updated'))
  }

  const status = statusConfig[product.status] || statusConfig.in_stock

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link to={`/products/${product.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          <img
            src={product.images?.[0] || PLACEHOLDER}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {product.is_featured && (
            <div className="absolute top-2.5 left-2.5 bg-amber-700 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
              Featured
            </div>
          )}

          <button
            onClick={toggleWishlist}
            className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
            aria-label="Toggle wishlist"
          >
            <Heart size={13} className={cn(wishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400')} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug group-hover:text-amber-700 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', status.color)}>
              {status.label}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-stone-500 font-medium">4.9</span>
              </div>
              {priceDots(product.price_tier)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
