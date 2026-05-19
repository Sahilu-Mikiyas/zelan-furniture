

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save } from 'lucide-react'

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([])
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('branches').select('*').order('created_at').then(({ data }) => setBranches(data || []))
  }, [])

  const update = (id: string, key: string, value: string) => {
    setBranches(bs => bs.map(b => b.id === id ? { ...b, [key]: value } : b))
  }

  const save = async (branch: any) => {
    setSaving(branch.id)
    await supabase.from('branches').update({ name: branch.name, phone: branch.phone, address: branch.address, area: branch.area, hours: branch.hours }).eq('id', branch.id)
    setSaving(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Branch Locations</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {branches.map(b => (
          <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Branch Name</label>
              <input value={b.name} onChange={e => update(b.id, 'name', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Phone</label>
              <input value={b.phone || ''} onChange={e => update(b.id, 'phone', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Area</label>
              <input value={b.area || ''} onChange={e => update(b.id, 'area', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">Hours</label>
              <input value={b.hours || ''} onChange={e => update(b.id, 'hours', e.target.value)} className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <button onClick={() => save(b)} disabled={saving === b.id} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors w-full justify-center">
              <Save size={14} /> {saving === b.id ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
