

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Trash2, Star } from 'lucide-react'
import { ROOM_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [roomType, setRoomType] = useState('')

  const fetch = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
    setImages(data || [])
  }

  useEffect(() => { fetch() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const path = `gallery/${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('furniture-images').upload(path, file)
      if (error) continue
      const { data } = supabase.storage.from('furniture-images').getPublicUrl(path)
      await supabase.from('gallery_images').insert([{ image_url: data.publicUrl, room_type: roomType || null }])
    }
    setUploading(false)
    fetch()
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await supabase.from('gallery_images').delete().eq('id', id)
    fetch()
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('gallery_images').update({ is_featured: !current }).eq('id', id)
    fetch()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Gallery</h1>
        <div className="flex items-center gap-3">
          <select value={roomType} onChange={e => setRoomType(e.target.value)} className="text-sm border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option value="">No room tag</option>
            {ROOM_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <label className={cn('flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors', uploading && 'opacity-60')}>
            <Upload size={15} />
            {uploading ? 'Uploading...' : 'Upload Images'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden bg-stone-100 aspect-square">
            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
            {img.room_type && (
              <span className="absolute top-2 left-2 bg-white/90 text-stone-700 text-[10px] px-2 py-0.5 rounded-full">{img.room_type}</span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => toggleFeatured(img.id, img.is_featured)} className={cn('p-2 rounded-lg transition-colors', img.is_featured ? 'bg-amber-500 text-white' : 'bg-white text-stone-700 hover:bg-amber-50')}>
                <Star size={15} className={img.is_featured ? 'fill-white' : ''} />
              </button>
              <button onClick={() => deleteImage(img.id)} className="p-2 bg-white text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-4 text-center py-20 text-stone-400">
            <p>No images yet. Upload some to fill the gallery!</p>
          </div>
        )}
      </div>
    </div>
  )
}
