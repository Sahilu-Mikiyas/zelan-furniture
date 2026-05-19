

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])

  const fetch = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setTestimonials(data || [])
  }

  useEffect(() => { fetch() }, [])

  const toggleVisible = async (id: string, current: boolean) => {
    await supabase.from('testimonials').update({ is_visible: !current }).eq('id', id)
    fetch()
  }

  const deleteOne = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    fetch()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Testimonials</h1>
      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${t.is_visible ? 'border-green-400' : 'border-stone-200'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-stone-900">{t.customer_name}</span>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-stone-600 text-sm italic">"{t.review}"</p>
                <p className="text-xs text-stone-400 mt-2">{new Date(t.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleVisible(t.id, t.is_visible)} className={`p-2 rounded-lg transition-colors ${t.is_visible ? 'text-green-600 hover:bg-green-50' : 'text-stone-400 hover:bg-stone-100'}`}>
                  {t.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => deleteOne(t.id)} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-center py-20 text-stone-400">No testimonials yet</p>}
      </div>
    </div>
  )
}
