

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const fetch = async () => {
    let q = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (filter === 'unread') q = q.eq('is_read', false)
    const { data } = await q
    setInquiries(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [filter])

  const markRead = async (id: string) => {
    await supabase.from('inquiries').update({ is_read: true }).eq('id', id)
    fetch()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Inquiries</h1>
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn('text-sm px-4 py-1.5 rounded-full border transition-colors capitalize', filter === f ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600')}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-24 animate-pulse" />)}</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <Mail size={40} className="mx-auto mb-3" />
          <p>No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div key={inq.id} className={cn('bg-white rounded-2xl p-5 shadow-sm border-l-4', inq.is_read ? 'border-stone-200' : 'border-amber-700')}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-bold text-stone-900">{inq.name}</span>
                    {!inq.is_read && <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>}
                    {inq.area_of_interest && <span className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded-full">{inq.area_of_interest}</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-2">
                    {inq.phone && <span className="flex items-center gap-1"><Phone size={12} />{inq.phone}</span>}
                    {inq.email && <span className="flex items-center gap-1"><Mail size={12} />{inq.email}</span>}
                  </div>
                  {inq.message && <p className="text-stone-600 text-sm">{inq.message}</p>}
                  <p className="text-xs text-stone-400 mt-2">{new Date(inq.created_at).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!inq.is_read && (
                    <button onClick={() => markRead(inq.id)} className="flex items-center gap-1.5 text-xs text-green-700 hover:bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg transition-colors">
                      <Check size={12} /> Mark Read
                    </button>
                  )}
                  {inq.phone && (
                    <a href={`https://wa.me/251${inq.phone.replace(/^0/, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-center bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
