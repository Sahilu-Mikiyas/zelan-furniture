

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ROOM_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      let q = supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
      if (filter) q = q.eq('room_type', filter)
      const { data } = await q
      setImages(data || [])
      setLoading(false)
    }
    fetch()
  }, [filter])

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Inspiration Gallery</h1>
          <p className="text-stone-500">Real rooms styled with Zelan Furniture. Find your next look.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          <button
            onClick={() => setFilter('')}
            className={cn('text-sm px-4 py-1.5 rounded-full border transition-colors', !filter ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}
          >
            All Rooms
          </button>
          {ROOM_TYPES.map(rt => (
            <button
              key={rt}
              onClick={() => setFilter(rt)}
              className={cn('text-sm px-4 py-1.5 rounded-full border transition-colors', filter === rt ? 'bg-amber-700 text-white border-amber-700' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300')}
            >
              {rt}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`bg-stone-200 rounded-2xl animate-pulse ${i % 3 === 0 ? 'h-64' : 'h-44'}`} />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-stone-500">No gallery images yet. Check back soon!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map(img => (
              <div
                key={img.id}
                onClick={() => setLightbox(img.image_url)}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity shadow-sm hover:shadow-md group"
              >
                <div className="relative">
                  <img src={img.image_url} alt={img.caption || 'Gallery'} className="w-full object-cover" />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs">{img.caption}</p>
                    </div>
                  )}
                  {img.room_type && (
                    <span className="absolute top-2 left-2 bg-white/90 text-stone-700 text-[10px] px-2 py-0.5 rounded-full">
                      {img.room_type}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors">
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
