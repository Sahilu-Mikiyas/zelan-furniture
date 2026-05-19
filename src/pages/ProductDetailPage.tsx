import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn, getPriceTierSymbol } from '@/lib/utils'
import ProductCard from '@/components/products/ProductCard'

const statusConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: 'In Stock', color: 'bg-green-100 text-green-700' },
  limited: { label: 'Limited Stock', color: 'bg-yellow-100 text-yellow-700' },
  made_to_order: { label: 'Made to Order', color: 'bg-blue-100 text-blue-700' },
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*, categories(name, slug)').eq('slug', slug).single()
      if (!data) { navigate('/products'); return }
      setProduct(data)
      setWishlisted(JSON.parse(localStorage.getItem('zelan_wishlist') || '[]').includes(data.id))
      supabase.rpc('increment_view', { product_id: data.id }).catch(() => {})
      const { data: rel } = await supabase.from('products').select('id,name,slug,price_tier,status,images,is_featured,style_tag')
        .eq('category_id', data.category_id).neq('id', data.id).limit(4)
      setRelated(rel || [])
      setLoading(false)
    }
    fetch()
  }, [slug])

  const toggleWishlist = () => {
    const wl: string[] = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
    const updated = wishlisted ? wl.filter(id => id !== product.id) : [...wl, product.id]
    localStorage.setItem('zelan_wishlist', JSON.stringify(updated))
    setWishlisted(!wishlisted)
    window.dispatchEvent(new Event('wishlist-updated'))
  }

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const status = statusConfig[product.status] || statusConfig.in_stock
  const waMessage = `Hi! I'm interested in "${product.name}" from Zelan Furniture. Can you help me?`

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 text-sm text-stone-400 mb-8">
          <Link to="/" className="hover:text-amber-700">Home</Link><span>/</span>
          <Link to="/products" className="hover:text-amber-700">Products</Link>
          {product.categories && <><span>/</span><Link to={`/products?category=${product.categories.slug}`} className="hover:text-amber-700">{product.categories.name}</Link></>}
          <span>/</span><span className="text-stone-600">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden mb-3">
              {product.images?.[activeImg]
                ? <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-8xl">🛋️</div>}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={cn('shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors', i === activeImg ? 'border-amber-700' : 'border-transparent')}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-sm text-stone-400">{product.categories?.name}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mt-1">{product.name}</h1>
              </div>
              <button onClick={toggleWishlist} className="p-2 border border-stone-200 rounded-xl hover:border-red-300 transition-colors">
                <Heart size={20} className={cn(wishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400')} />
              </button>
            </div>

            <div className="text-2xl font-bold text-amber-700 mb-3">
              {getPriceTierSymbol(product.price_tier)}
              <span className="text-sm text-stone-400 font-normal ml-2">{product.price_tier === 1 ? 'Budget range' : product.price_tier === 2 ? 'Mid-range' : 'Premium range'}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', status.color)}>{status.label}</span>
              {product.style_tag && <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{product.style_tag}</span>}
              {product.material && <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{product.material}</span>}
            </div>

            {product.description && <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>}

            {product.branch_available?.length > 0 && (
              <div className="bg-stone-50 rounded-2xl p-4 mb-6">
                <p className="text-sm font-semibold text-stone-700 mb-2">📍 Available at showrooms:</p>
                <div className="flex flex-wrap gap-2">
                  {product.branch_available.map((b: string) => <span key={b} className="text-xs bg-white border border-stone-200 text-stone-600 px-3 py-1 rounded-full">{b}</span>)}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/251984272727?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-2xl transition-colors">
                <MessageCircle size={18} /> Order via WhatsApp
              </a>
              <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                className="flex items-center justify-center gap-2 border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700 py-3.5 px-5 rounded-2xl transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
