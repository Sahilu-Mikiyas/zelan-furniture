import { Link } from 'react-router-dom'
import { Heart, Eye, Star } from 'lucide-react'
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

const statusConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: 'In Stock', color: 'bg-green-100 text-green-700' },
  limited: { label: 'Limited', color: 'bg-yellow-100 text-yellow-700' },
  made_to_order: { label: 'Made to Order', color: 'bg-blue-100 text-blue-700' },
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'

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
  const isPopular = (product.view_count || 0) > 50

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link to={`/products/${product.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-stone-100">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          <img
            src={product.images?.[0] || PLACEHOLDER}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_featured && (
              <span className="bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                ★ Featured
              </span>
            )}
            {isPopular && (
              <span className="bg-stone-900 text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                Popular
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            aria-label="Toggle wishlist"
          >
            <Heart size={15} className={cn(wishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400')} />
          </button>

          {/* Bottom gradient with quick stats */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-stone-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 text-white text-xs">
              <span className="flex items-center gap-1"><Eye size={11} /> {product.view_count || 0}</span>
              <span className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" /> 4.9</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-stone-900 text-sm leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <span className="text-amber-700 font-bold text-sm shrink-0">
              {'$'.repeat(product.price_tier)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', status.color)}>
              {status.label}
            </span>
            {product.style_tag && (
              <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                {product.style_tag}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
