import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, STYLE_TAGS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const PRICE_TIERS = [
  { value: '', label: 'All Prices' },
  { value: '1', label: '$ Budget' },
  { value: '2', label: '$$ Mid-range' },
  { value: '3', label: '$$$ Premium' },
]
const STATUSES = [
  { value: '', label: 'All' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'limited', label: 'Limited' },
  { value: 'made_to_order', label: 'Made to Order' },
]

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [priceTier, setPriceTier] = useState('')
  const [status, setStatus] = useState('')
  const [styleTag, setStyleTag] = useState('')
  const [search, setSearch] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('products').select('*, categories(name, slug)')
    if (category) {
      const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single()
      if (cat) query = query.eq('category_id', cat.id)
    }
    if (priceTier) query = query.eq('price_tier', parseInt(priceTier))
    if (status) query = query.eq('status', status)
    if (styleTag) query = query.eq('style_tag', styleTag)
    if (search) query = query.ilike('name', `%${search}%`)
    const { data } = await query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }, [category, priceTier, status, styleTag, search])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const clearFilters = () => { setCategory(''); setPriceTier(''); setStatus(''); setStyleTag(''); setSearch('') }
  const activeFilters = [category, priceTier, status, styleTag].filter(Boolean).length

  return (
    <>
      <Helmet>
        <title>Products — Zelan Furniture</title>
        <meta name="description" content="Browse our full collection of premium bedroom, living room, dining, office and storage furniture in Addis Ababa." />
      </Helmet>
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-1">All Products</h1>
          <p className="text-stone-500">{loading ? '...' : `${products.length} items found`}</p>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors', showFilters ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-700')}>
            <SlidersHorizontal size={15} /> Filters
            {activeFilters > 0 && <span className="bg-white text-amber-700 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFilters}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase mb-2 block">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">All</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase mb-2 block">Price Range</label>
              <select value={priceTier} onChange={e => setPriceTier(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                {PRICE_TIERS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase mb-2 block">Availability</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase mb-2 block">Style</label>
              <select value={styleTag} onChange={e => setStyleTag(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">All Styles</option>
                {STYLE_TAGS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {activeFilters > 0 && (
              <div className="col-span-2 md:col-span-4 flex justify-end">
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-red-500 transition-colors"><X size={14} /> Clear all filters</button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setCategory('')} className={cn('text-sm px-4 py-1.5 rounded-full border transition-colors', !category ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={cn('text-sm px-4 py-1.5 rounded-full border transition-colors', category === c.id ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-stone-200" />
                <div className="p-4 space-y-2"><div className="h-4 bg-stone-200 rounded w-3/4" /><div className="h-3 bg-stone-100 rounded w-1/2" /></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🪑</div>
            <p className="text-stone-500 text-lg">No products found</p>
            <button onClick={clearFilters} className="mt-3 text-amber-700 hover:underline text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
