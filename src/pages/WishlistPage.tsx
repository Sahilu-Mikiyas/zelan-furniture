

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/products/ProductCard'
import { Link } from 'react-router-dom'
import { Heart, Share2 } from 'lucide-react'

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      const ids: string[] = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
      if (ids.length === 0) { setLoading(false); return }
      const { data } = await supabase.from('products').select('*').in('id', ids)
      setProducts(data || [])
      setLoading(false)
    }
    fetchWishlist()
    window.addEventListener('wishlist-updated', fetchWishlist)
    return () => window.removeEventListener('wishlist-updated', fetchWishlist)
  }, [])

  const shareWishlist = () => {
    const ids: string[] = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
    const url = `${window.location.origin}/products?ids=${ids.join(',')}`
    navigator.clipboard.writeText(url)
    alert('Wishlist link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">My Wishlist</h1>
            <p className="text-stone-500 mt-1">{products.length} saved {products.length === 1 ? 'item' : 'items'}</p>
          </div>
          {products.length > 0 && (
            <button onClick={shareWishlist} className="flex items-center gap-2 border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700 px-4 py-2 rounded-xl text-sm transition-colors">
              <Share2 size={15} /> Share Wishlist
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl animate-pulse">
                <div className="aspect-[4/3] bg-stone-200 rounded-t-2xl" />
                <div className="p-4 space-y-2"><div className="h-4 bg-stone-100 rounded" /></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={48} className="text-stone-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-stone-900 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-500 mb-6">Save items you love while browsing our collection.</p>
            <Link href="/products" className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
