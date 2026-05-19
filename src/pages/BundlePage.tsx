

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Plus, X, ShoppingBag } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

const PRICE_MAP: Record<number, number> = { 1: 15000, 2: 35000, 3: 75000 }

export default function BundlePage() {
  const [roomType, setRoomType] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!roomType) return
    const fetch = async () => {
      setLoading(true)
      setSelected([])
      const { data: cat } = await supabase.from('categories').select('id').eq('slug', roomType).single()
      if (cat) {
        const { data } = await supabase.from('products').select('*').eq('category_id', cat.id).limit(12)
        setProducts(data || [])
      }
      setLoading(false)
    }
    fetch()
  }, [roomType])

  const toggle = (product: any) => {
    setSelected(s => s.find(p => p.id === product.id) ? s.filter(p => p.id !== product.id) : [...s, product])
  }

  const totalMin = selected.reduce((sum, p) => sum + PRICE_MAP[p.price_tier] * 0.8, 0)
  const totalMax = selected.reduce((sum, p) => sum + PRICE_MAP[p.price_tier] * 1.2, 0)

  const waMessage = selected.length > 0
    ? `Hi! I'd like to request a room bundle:\n${selected.map(p => `- ${p.name}`).join('\n')}\n\nCan you give me a quote?`
    : ''

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Build Your Room</h1>
          <p className="text-stone-500">Pick a room, mix and match furniture, and request your complete bundle.</p>
        </div>

        {/* Room selector */}
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setRoomType(c.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-medium text-sm transition-all',
                roomType === c.id ? 'border-amber-700 bg-amber-700 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
              )}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {!roomType ? (
          <div className="text-center py-20 text-stone-400">
            <div className="text-6xl mb-4">🏠</div>
            <p>Select a room type above to start building your bundle</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-2xl animate-pulse aspect-[4/3]" />)}
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Products */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(p => {
                const isSelected = selected.some(s => s.id === p.id)
                return (
                  <div
                    key={p.id}
                    onClick={() => toggle(p)}
                    className={cn(
                      'bg-white rounded-2xl overflow-hidden cursor-pointer transition-all border-2',
                      isSelected ? 'border-amber-700 shadow-lg' : 'border-transparent hover:shadow-md'
                    )}
                  >
                    <div className="relative aspect-[4/3] bg-stone-100">
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-4xl">🛋️</div>
                      }
                      <div className={cn(
                        'absolute top-2 right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all',
                        isSelected ? 'bg-amber-700 border-amber-700' : 'bg-white border-stone-300'
                      )}>
                        {isSelected ? <X size={12} className="text-white" /> : <Plus size={12} className="text-stone-400" />}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-stone-800 leading-tight">{p.name}</p>
                      <p className="text-xs text-amber-700 font-bold mt-0.5">{'$'.repeat(p.price_tier)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bundle summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag size={18} className="text-amber-700" />
                  <h3 className="font-bold text-stone-900">Your Bundle</h3>
                </div>

                {selected.length === 0 ? (
                  <p className="text-stone-400 text-sm text-center py-6">Select items to build your bundle</p>
                ) : (
                  <>
                    <ul className="space-y-2 mb-4">
                      {selected.map(p => (
                        <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
                          <span className="text-stone-700 truncate">{p.name}</span>
                          <button onClick={() => toggle(p)} className="text-stone-300 hover:text-red-400 shrink-0">
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-stone-100 pt-3 mb-4">
                      <p className="text-xs text-stone-400 mb-1">Estimated Total</p>
                      <p className="text-lg font-bold text-stone-900">
                        ETB {totalMin.toLocaleString()} – {totalMax.toLocaleString()}
                      </p>
                      <p className="text-xs text-stone-400">Final price confirmed in-store</p>
                    </div>

                    <a
                      href={`https://wa.me/251984272727?text=${encodeURIComponent(waMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold text-center py-3 rounded-xl transition-colors"
                    >
                      Request Bundle via WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
