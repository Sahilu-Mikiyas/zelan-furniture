import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Package, MessageSquare, Eye } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, unread: 0 })
  const [topProducts, setTopProducts] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const [{ count: products }, { count: inquiries }, { count: unread }, { data: top }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('products').select('name, view_count, status').order('view_count', { ascending: false }).limit(5),
      ])
      setStats({ products: products ?? 0, inquiries: inquiries ?? 0, unread: unread ?? 0 })
      setTopProducts(top || [])
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'text-amber-700', bg: 'bg-amber-50', href: '/admin/products' },
    { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-blue-700', bg: 'bg-blue-50', href: '/admin/inquiries' },
    { label: 'Unread Inquiries', value: stats.unread, icon: MessageSquare, color: 'text-red-700', bg: 'bg-red-50', href: '/admin/inquiries' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} to={c.href} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center mb-3`}><c.icon size={18} className={c.color} /></div>
            <p className="text-2xl font-bold text-stone-900">{c.value}</p>
            <p className="text-stone-500 text-sm">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-stone-900">Most Viewed Products</h2>
          <Link to="/admin/products" className="text-amber-700 text-sm hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-stone-100 rounded-lg text-xs font-bold text-stone-500 flex items-center justify-center">{i + 1}</span>
                <span className="text-sm font-medium text-stone-800">{p.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'in_stock' ? 'bg-green-100 text-green-700' : p.status === 'limited' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                  {p.status?.replace('_', ' ')}
                </span>
                <span className="text-sm text-stone-400 flex items-center gap-1"><Eye size={12} /> {p.view_count}</span>
              </div>
            </div>
          ))}
          {!topProducts.length && <p className="text-stone-400 text-sm text-center py-4">No products yet</p>}
        </div>
      </div>
    </div>
  )
}
