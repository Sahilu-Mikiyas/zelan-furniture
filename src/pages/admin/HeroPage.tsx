

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Check } from 'lucide-react'

export default function HeroBannerPage() {
  const [banners, setBanners] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ heading: '', subheading: '', cta_text: 'Shop Now', image_url: '' })

  const fetch = async () => {
    const { data } = await supabase.from('hero_banners').select('*').order('created_at', { ascending: false })
    setBanners(data || [])
  }

  useEffect(() => { fetch() }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const path = `hero/${Date.now()}-${file.name}`
    await supabase.storage.from('furniture-images').upload(path, file)
    const { data } = supabase.storage.from('furniture-images').getPublicUrl(path)
    set('image_url', data.publicUrl)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('hero_banners').insert([{ ...form, is_active: false }])
    setForm({ heading: '', subheading: '', cta_text: 'Shop Now', image_url: '' })
    fetch()
    setSaving(false)
  }

  const setActive = async (id: string) => {
    await supabase.from('hero_banners').update({ is_active: false }).neq('id', id)
    await supabase.from('hero_banners').update({ is_active: true }).eq('id', id)
    fetch()
  }

  const deleteBanner = async (id: string) => {
    if (!confirm('Delete this banner?')) return
    await supabase.from('hero_banners').delete().eq('id', id)
    fetch()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Hero Banner</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-stone-900 mb-4">Add New Banner</h2>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Heading (EN)</label>
                <input required value={form.heading} onChange={e => set('heading', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Subheading (EN)</label>
                <input value={form.subheading} onChange={e => set('subheading', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">CTA Text</label>
                <input value={form.cta_text} onChange={e => set('cta_text', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Hero Image</label>
              {form.image_url && <img src={form.image_url} alt="" className="w-full h-32 object-cover rounded-xl mb-2" />}
              <label className="flex items-center gap-2 border-2 border-dashed border-stone-200 rounded-xl p-3 cursor-pointer hover:border-amber-500 transition-colors text-sm text-stone-500">
                <Upload size={15} /> Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <button type="submit" disabled={saving} className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
              {saving ? 'Saving...' : 'Add Banner'}
            </button>
          </form>
        </div>

        {/* Banners list */}
        <div className="space-y-3">
          <h2 className="font-bold text-stone-900">All Banners</h2>
          {banners.map(b => (
            <div key={b.id} className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${b.is_active ? 'border-amber-700' : 'border-transparent'}`}>
              {b.image_url && <img src={b.image_url} alt="" className="w-full h-24 object-cover rounded-xl mb-3" />}
              <p className="font-medium text-stone-900 text-sm">{b.heading}</p>
              <p className="text-stone-400 text-xs mt-0.5">{b.subheading}</p>
              <div className="flex gap-2 mt-3">
                {!b.is_active && (
                  <button onClick={() => setActive(b.id)} className="flex items-center gap-1.5 text-xs bg-amber-700 text-white px-3 py-1.5 rounded-lg">
                    <Check size={12} /> Set Active
                  </button>
                )}
                {b.is_active && <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-semibold">Active</span>}
                <button onClick={() => deleteBanner(b.id)} className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
