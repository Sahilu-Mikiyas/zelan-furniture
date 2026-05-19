import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

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
}

const statusConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: 'In Stock', color: 'bg-green-100 text-green-700' },
  limited: { label: 'Limited', color: 'bg-yellow-100 text-yellow-700' },
  made_to_order: { label: 'Made to Order', color: 'bg-blue-100 text-blue-700' },
}

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
    <Link to={`/products/${product.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🛋️</div>
        )}
        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart size={15} className={cn(wishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400')} />
        </button>
        {/* Featured badge */}
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-stone-900 text-sm leading-tight group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <span className="text-amber-700 font-bold text-sm shrink-0">
            {'$'.repeat(product.price_tier)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', status.color)}>
            {status.label}
          </span>
          {product.style_tag && (
            <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
              {product.style_tag}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
