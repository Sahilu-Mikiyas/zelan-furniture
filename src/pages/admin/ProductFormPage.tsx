import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { STYLE_TAGS, BRANCHES } from '@/lib/constants'
import { slugify } from '@/lib/utils'
import { Upload, X } from 'lucide-react'

const STATUSES = ['in_stock', 'limited', 'made_to_order']

export default function ProductFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [categories, setCategories] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', name_am: '', description: '', description_am: '',
    category_id: '', price_tier: 2, material: '', style_tag: '',
    status: 'in_stock', branch_available: [] as string[],
    is_featured: false, images: [] as string[],
  })

  useEffect(() => {
    supabase.from('categories').select('*').order('display_order').then(({ data }) => setCategories(data || []))
    if (isEdit) {
      supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
        if (data) setForm({ ...data, branch_available: data.branch_available || [], images: data.images || [] })
      })
    }
  }, [id])

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  const toggleBranch = (branch: string) => set('branch_available',
    form.branch_available.includes(branch) ? form.branch_available.filter(b => b !== branch) : [...form.branch_available, branch]
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const path = `products/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('furniture-images').upload(path, file)
      if (uploadError) { setError(uploadError.message); return }
      const { data } = supabase.storage.from('furniture-images').getPublicUrl(path)
      urls.push(data.publicUrl)
    }
    set('images', [...form.images, ...urls])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, slug: slugify(form.name) }
    const { error: err } = isEdit
      ? await supabase.from('products').update(payload).eq('id', id)
      : await supabase.from('products').insert([payload])
    if (err) { setError(err.message); setSaving(false); return }
    navigate('/admin/products')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-stone-900 border-b border-stone-100 pb-3">Basic Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Name (English) *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Name (Amharic)</label>
              <input value={form.name_am} onChange={e => set('name_am', e.target.value)} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Description (English)</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-stone-900 border-b border-stone-100 pb-3">Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Category</label>
              <select value={form.category_id} onChange={e => set('category_id', e.target.value)} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Price Tier</label>
              <select value={form.price_tier} onChange={e => set('price_tier', parseInt(e.target.value))} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value={1}>$ Budget</option><option value={2}>$$ Mid-range</option><option value={3}>$$$ Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Style Tag</label>
              <select value={form.style_tag} onChange={e => set('style_tag', e.target.value)} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">None</option>
                {STYLE_TAGS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Material</label>
              <input value={form.material} onChange={e => set('material', e.target.value)} placeholder="e.g. Solid Oak" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Available at Branches</label>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map(b => (
                <button type="button" key={b.name} onClick={() => toggleBranch(b.name)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${form.branch_available.includes(b.name) ? 'bg-amber-700 text-white border-amber-700' : 'border-stone-200 text-stone-600 hover:border-amber-300'}`}>
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors ${form.is_featured ? 'bg-amber-700' : 'bg-stone-200'}`} onClick={() => set('is_featured', !form.is_featured)}>
              <div className={`w-5 h-5 bg-white rounded-full shadow m-0.5 transition-transform ${form.is_featured ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-sm font-medium text-stone-700">Mark as Featured</span>
          </label>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-stone-900 border-b border-stone-100 pb-3">Images</h2>
          <div className="flex flex-wrap gap-3">
            {form.images.map((url: string) => (
              <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => set('images', form.images.filter(i => i !== url))} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"><X size={10} /></button>
              </div>
            ))}
            <label className="w-20 h-20 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors">
              <Upload size={16} className="text-stone-400" />
              <span className="text-xs text-stone-400 mt-1">Upload</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="flex-1 bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="px-6 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
