import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Star, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  in_stock: 'bg-green-100 text-green-700',
  limited: 'bg-yellow-100 text-yellow-700',
  made_to_order: 'bg-blue-100 text-blue-700',
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('products').update({ is_featured: !current }).eq('id', id)
    fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Products</h1>
        <Link to="/admin/products/new" className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-3 text-stone-500 font-semibold">Product</th>
                <th className="text-left px-4 py-3 text-stone-500 font-semibold hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-stone-500 font-semibold hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-stone-500 font-semibold hidden lg:table-cell">Views</th>
                <th className="text-right px-4 py-3 text-stone-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-stone-400">No products yet. Add your first one!</td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-lg">🛋️</div>}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{p.name}</p>
                        <p className="text-xs text-stone-400">{'$'.repeat(p.price_tier)}</p>
                      </div>
                      {p.is_featured && <Star size={14} className="fill-amber-400 text-amber-400" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-500 hidden md:table-cell">{p.categories?.name || '—'}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={cn('text-xs px-2.5 py-1 rounded-full font-semibold', statusColors[p.status] || statusColors.in_stock)}>{p.status?.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-4 py-3 text-stone-500 hidden lg:table-cell">
                    <span className="flex items-center gap-1"><Eye size={12} /> {p.view_count}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleFeatured(p.id, p.is_featured)} className={cn('p-1.5 rounded-lg transition-colors', p.is_featured ? 'text-amber-500 hover:bg-amber-50' : 'text-stone-300 hover:bg-stone-100')}>
                        <Star size={15} className={p.is_featured ? 'fill-amber-400' : ''} />
                      </button>
                      <Link to={`/admin/products/${p.id}`} className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"><Edit size={15} /></Link>
                      <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
