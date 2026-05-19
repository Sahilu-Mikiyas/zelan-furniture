import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, Eye, EyeOff, Trash2, Plus } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ customer_name: '', review: '', rating: 5 })

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setTestimonials(data || [])
  }

  useEffect(() => { load() }, [])

  const toggleVisible = async (id: string, current: boolean) => {
    await supabase.from('testimonials').update({ is_visible: !current }).eq('id', id)
    load()
  }

  const deleteOne = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    load()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('testimonials').insert([{ ...form, is_visible: true }])
    setForm({ customer_name: '', review: '', rating: 5 })
    setShowForm(false)
    setSaving(false)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Testimonials</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="font-bold text-stone-900">New Testimonial</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Customer Name *</label>
              <input
                required
                value={form.customer_name}
                onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g. Meron T."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Rating</label>
              <select
                value={form.rating}
                onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)} ({r}/5)</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Review *</label>
            <textarea
              required
              value={form.review}
              onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
              rows={3}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Customer review..."
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
              {saving ? 'Saving...' : 'Add Testimonial'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

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
        {testimonials.length === 0 && <p className="text-center py-20 text-stone-400">No testimonials yet. Add one above!</p>}
      </div>
    </div>
  )
}
