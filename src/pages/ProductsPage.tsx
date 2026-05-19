import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion } from 'framer-motion'
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

const MOCK_PRODUCTS = [
  // BEDROOM (category: bedroom)
  { id: 'b1', name: 'Royal King Bed Frame', slug: 'royal-king-bed-frame', price_tier: 3, status: 'in_stock', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'], category_id: 'bedroom', style_tag: 'Modern', is_featured: true, view_count: 120 },
  { id: 'b2', name: 'Queen Platform Bed', slug: 'queen-platform-bed', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80'], category_id: 'bedroom', style_tag: 'Minimalist', is_featured: false, view_count: 85 },
  { id: 'b3', name: 'Walnut 6-Drawer Dresser', slug: 'walnut-dresser', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80'], category_id: 'bedroom', style_tag: 'Classic', is_featured: false, view_count: 60 },
  { id: 'b4', name: 'Upholstered Nightstand Set', slug: 'nightstand-set', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80'], category_id: 'bedroom', style_tag: 'Modern', is_featured: false, view_count: 45 },
  { id: 'b5', name: 'Tufted Velvet Headboard', slug: 'tufted-velvet-headboard', price_tier: 2, status: 'limited', images: ['https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80'], category_id: 'bedroom', style_tag: 'Luxury', is_featured: true, view_count: 95 },
  { id: 'b6', name: 'Sliding Door Wardrobe', slug: 'sliding-door-wardrobe', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'], category_id: 'bedroom', style_tag: 'Modern', is_featured: false, view_count: 70 },
  { id: 'b7', name: 'Bunk Bed with Storage', slug: 'bunk-bed-storage', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80'], category_id: 'bedroom', style_tag: 'Minimalist', is_featured: false, view_count: 40 },
  { id: 'b8', name: 'Mirrored Vanity Desk', slug: 'mirrored-vanity-desk', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80'], category_id: 'bedroom', style_tag: 'Glam', is_featured: false, view_count: 55 },
  { id: 'b9', name: 'Oak Storage Ottoman', slug: 'oak-storage-ottoman', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'], category_id: 'bedroom', style_tag: 'Classic', is_featured: false, view_count: 30 },
  { id: 'b10', name: 'Canopy Bed Frame', slug: 'canopy-bed-frame', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80'], category_id: 'bedroom', style_tag: 'Luxury', is_featured: true, view_count: 110 },

  // LIVING ROOM
  { id: 'l1', name: 'L-Shape Sectional Sofa', slug: 'l-shape-sectional-sofa', price_tier: 3, status: 'in_stock', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80'], category_id: 'living-room', style_tag: 'Modern', is_featured: true, view_count: 200 },
  { id: 'l2', name: 'Marble Top Coffee Table', slug: 'marble-coffee-table', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'], category_id: 'living-room', style_tag: 'Luxury', is_featured: false, view_count: 90 },
  { id: 'l3', name: 'Velvet Accent Chair', slug: 'velvet-accent-chair', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'], category_id: 'living-room', style_tag: 'Classic', is_featured: false, view_count: 75 },
  { id: 'l4', name: 'Modular 3-Seater Sofa', slug: 'modular-3-seater', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'], category_id: 'living-room', style_tag: 'Minimalist', is_featured: true, view_count: 130 },
  { id: 'l5', name: 'Floating TV Console', slug: 'floating-tv-console', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80'], category_id: 'living-room', style_tag: 'Modern', is_featured: false, view_count: 60 },
  { id: 'l6', name: 'Recliner Leather Sofa', slug: 'recliner-leather-sofa', price_tier: 3, status: 'limited', images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfb5?w=600&q=80'], category_id: 'living-room', style_tag: 'Luxury', is_featured: false, view_count: 88 },
  { id: 'l7', name: 'Scandinavian Bookshelf', slug: 'scandinavian-bookshelf', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80'], category_id: 'living-room', style_tag: 'Minimalist', is_featured: false, view_count: 45 },
  { id: 'l8', name: 'Chesterfield 2-Seater', slug: 'chesterfield-2-seater', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80'], category_id: 'living-room', style_tag: 'Classic', is_featured: false, view_count: 66 },
  { id: 'l9', name: 'Nesting Side Tables', slug: 'nesting-side-tables', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80'], category_id: 'living-room', style_tag: 'Modern', is_featured: false, view_count: 33 },
  { id: 'l10', name: 'Floor Lamp Standing Unit', slug: 'floor-lamp-unit', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80'], category_id: 'living-room', style_tag: 'Minimalist', is_featured: false, view_count: 28 },

  // DINING
  { id: 'd1', name: 'Solid Oak Dining Table 6-Seater', slug: 'oak-dining-table-6', price_tier: 3, status: 'in_stock', images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80'], category_id: 'dining', style_tag: 'Classic', is_featured: true, view_count: 155 },
  { id: 'd2', name: 'Upholstered Dining Chairs Set of 4', slug: 'dining-chairs-set-4', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80'], category_id: 'dining', style_tag: 'Modern', is_featured: false, view_count: 80 },
  { id: 'd3', name: 'Marble Dining Table 4-Seater', slug: 'marble-dining-4', price_tier: 3, status: 'limited', images: ['https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80'], category_id: 'dining', style_tag: 'Luxury', is_featured: true, view_count: 120 },
  { id: 'd4', name: 'Buffet & Sideboard Cabinet', slug: 'buffet-sideboard', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=600&q=80'], category_id: 'dining', style_tag: 'Classic', is_featured: false, view_count: 55 },
  { id: 'd5', name: 'Extendable Dining Table', slug: 'extendable-dining', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80'], category_id: 'dining', style_tag: 'Minimalist', is_featured: false, view_count: 70 },
  { id: 'd6', name: 'Bench Seating Set', slug: 'bench-seating', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80'], category_id: 'dining', style_tag: 'Modern', is_featured: false, view_count: 40 },
  { id: 'd7', name: 'Bar Cart & Wine Rack', slug: 'bar-cart-wine', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'], category_id: 'dining', style_tag: 'Luxury', is_featured: false, view_count: 35 },
  { id: 'd8', name: 'Round Dining Table 4-Seater', slug: 'round-dining-4', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80'], category_id: 'dining', style_tag: 'Minimalist', is_featured: false, view_count: 50 },
  { id: 'd9', name: 'High Back Dining Chair', slug: 'high-back-dining', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&q=80'], category_id: 'dining', style_tag: 'Classic', is_featured: false, view_count: 45 },
  { id: 'd10', name: 'Industrial Dining Set', slug: 'industrial-dining', price_tier: 2, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'], category_id: 'dining', style_tag: 'Modern', is_featured: false, view_count: 62 },

  // OFFICE
  { id: 'o1', name: 'Executive Office Desk', slug: 'executive-desk', price_tier: 3, status: 'in_stock', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'], category_id: 'office', style_tag: 'Modern', is_featured: true, view_count: 140 },
  { id: 'o2', name: 'Ergonomic Mesh Chair', slug: 'ergonomic-chair', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1505797149-35ebcc40e7d2?w=600&q=80'], category_id: 'office', style_tag: 'Minimalist', is_featured: false, view_count: 95 },
  { id: 'o3', name: 'L-Shaped Home Office Desk', slug: 'l-shaped-desk', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80'], category_id: 'office', style_tag: 'Modern', is_featured: false, view_count: 75 },
  { id: 'o4', name: 'Filing & Storage Cabinet', slug: 'filing-cabinet', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&q=80'], category_id: 'office', style_tag: 'Classic', is_featured: false, view_count: 50 },
  { id: 'o5', name: 'Standing Desk Converter', slug: 'standing-desk', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&q=80'], category_id: 'office', style_tag: 'Modern', is_featured: false, view_count: 85 },
  { id: 'o6', name: 'Bookcase Wall Unit', slug: 'bookcase-wall-unit', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80'], category_id: 'office', style_tag: 'Classic', is_featured: false, view_count: 42 },
  { id: 'o7', name: 'Reception Counter Desk', slug: 'reception-counter', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80'], category_id: 'office', style_tag: 'Modern', is_featured: true, view_count: 110 },
  { id: 'o8', name: 'Conference Table 10-Seater', slug: 'conference-table', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80'], category_id: 'office', style_tag: 'Modern', is_featured: false, view_count: 66 },
  { id: 'o9', name: 'Home Office Chair', slug: 'home-office-chair', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&q=80'], category_id: 'office', style_tag: 'Minimalist', is_featured: false, view_count: 55 },
  { id: 'o10', name: 'Monitor Stand & Organizer', slug: 'monitor-stand', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80'], category_id: 'office', style_tag: 'Minimalist', is_featured: false, view_count: 30 },

  // STORAGE
  { id: 's1', name: 'Built-in Walk-In Wardrobe', slug: 'walk-in-wardrobe', price_tier: 3, status: 'made_to_order', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'], category_id: 'storage', style_tag: 'Modern', is_featured: true, view_count: 180 },
  { id: 's2', name: '3-Door Mirror Wardrobe', slug: '3-door-mirror-wardrobe', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1612965607446-25e1332775ae?w=600&q=80'], category_id: 'storage', style_tag: 'Minimalist', is_featured: false, view_count: 90 },
  { id: 's3', name: 'Chest of Drawers 5-Tier', slug: 'chest-drawers-5', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80'], category_id: 'storage', style_tag: 'Classic', is_featured: false, view_count: 55 },
  { id: 's4', name: 'Shoe Rack Cabinet', slug: 'shoe-rack-cabinet', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&q=80'], category_id: 'storage', style_tag: 'Minimalist', is_featured: false, view_count: 40 },
  { id: 's5', name: 'Hallway Storage Bench', slug: 'hallway-bench', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'], category_id: 'storage', style_tag: 'Modern', is_featured: false, view_count: 35 },
  { id: 's6', name: 'Floating Wall Shelves Set', slug: 'wall-shelves-set', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80'], category_id: 'storage', style_tag: 'Minimalist', is_featured: false, view_count: 60 },
  { id: 's7', name: 'Linen Tower Cabinet', slug: 'linen-tower', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80'], category_id: 'storage', style_tag: 'Classic', is_featured: false, view_count: 28 },
  { id: 's8', name: 'Kitchen Pantry Cabinet', slug: 'kitchen-pantry', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'], category_id: 'storage', style_tag: 'Modern', is_featured: false, view_count: 45 },
  { id: 's9', name: 'TV Media Storage Unit', slug: 'tv-media-unit', price_tier: 2, status: 'in_stock', images: ['https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80'], category_id: 'storage', style_tag: 'Modern', is_featured: true, view_count: 75 },
  { id: 's10', name: 'Kids Room Storage Cubes', slug: 'kids-storage-cubes', price_tier: 1, status: 'in_stock', images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80'], category_id: 'storage', style_tag: 'Minimalist', is_featured: false, view_count: 20 },
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

    if (data && data.length > 0) {
      setProducts(data)
    } else {
      // Fallback to mock products with client-side filtering
      let mock = MOCK_PRODUCTS
      if (category) mock = mock.filter(p => p.category_id === category)
      if (priceTier) mock = mock.filter(p => p.price_tier === parseInt(priceTier))
      if (status) mock = mock.filter(p => p.status === status)
      if (styleTag) mock = mock.filter(p => p.style_tag === styleTag)
      if (search) mock = mock.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      setProducts(mock)
    }
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
      <div className="min-h-screen bg-stone-50 pt-16">
        {/* Page Hero */}
        <div className="bg-gradient-to-r from-stone-900 to-amber-950 py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block bg-amber-700/40 text-amber-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase border border-amber-600/30">
                Our Collections
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                Premium <span className="italic font-light text-amber-300">Furniture</span>
              </h1>
              <p className="text-stone-300 text-lg">{loading ? '...' : `${products.length} handpicked pieces`}</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search + Filter bar */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors shadow-sm', showFilters ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-700 hover:border-amber-300')}>
              <SlidersHorizontal size={15} /> Filters
              {activeFilters > 0 && <span className="bg-white text-amber-700 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFilters}</span>}
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-stone-200 p-5 mb-5 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm"
            >
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block tracking-wider">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">All</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block tracking-wider">Price</label>
                <select value={priceTier} onChange={e => setPriceTier(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  {PRICE_TIERS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block tracking-wider">Availability</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">All</option>
                  <option value="in_stock">In Stock</option>
                  <option value="limited">Limited</option>
                  <option value="made_to_order">Made to Order</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block tracking-wider">Style</label>
                <select value={styleTag} onChange={e => setStyleTag(e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">All Styles</option>
                  {STYLE_TAGS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {activeFilters > 0 && (
                <div className="col-span-2 md:col-span-4 flex justify-end">
                  <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-red-500 transition-colors"><X size={14} /> Clear all</button>
                </div>
              )}
            </motion.div>
          )}

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-8 pb-3 border-b border-stone-200">
            <button onClick={() => setCategory('')} className={cn('text-sm px-5 py-2 rounded-full font-medium border transition-all', !category ? 'bg-amber-700 text-white border-amber-700 shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}>All</button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={cn('text-sm px-5 py-2 rounded-full font-medium border transition-all', category === c.id ? 'bg-amber-700 text-white border-amber-700 shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}>
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-sm">
                  <div className="aspect-[4/3] bg-stone-200" />
                  <div className="p-4 space-y-2"><div className="h-4 bg-stone-200 rounded w-3/4" /><div className="h-3 bg-stone-100 rounded w-1/2" /></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🪑</div>
              <p className="text-stone-500 text-lg font-medium">No products found</p>
              <button onClick={clearFilters} className="mt-3 text-amber-700 hover:underline text-sm">Clear filters</button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {products.map(p => (
                <motion.div
                  key={p.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
