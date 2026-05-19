

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const branches = [
  { name: 'Meskel Flower', phone: '0984 272 727', area: 'Meskel Flower, Addis Ababa' },
  { name: 'Salitemeheret', phone: '0969 333 333', area: 'Salitemeheret, Addis Ababa' },
  { name: 'Bole Atlas', phone: '0993 858 585', area: 'Bole Atlas, Addis Ababa' },
  { name: 'Lebu', phone: '0996 656 565', area: 'Lebu, Addis Ababa' },
]

const interests = ['Bedroom Furniture', 'Living Room', 'Dining', 'Office & Storage', 'Custom Order', 'Delivery Inquiry', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', area_of_interest: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: err } = await supabase.from('inquiries').insert([form])
    if (err) {
      setError('Something went wrong. Please try again or call us directly.')
      throw err
    }
    setSuccess(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Get in Touch</h1>
          <p className="text-stone-500">We're here to help. Reach out via the form, phone, or visit us in person.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            {success ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Message Received!</h3>
                <p className="text-stone-500">We'll get back to you within 24 hours. You can also reach us on WhatsApp for faster response.</p>
                <button onClick={() => { setSuccess(false); setForm({ name: '', phone: '', email: '', area_of_interest: '', message: '' }) }} className="mt-5 text-amber-700 hover:underline text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-stone-900 mb-5">Send Us a Message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Phone</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="09xx xxx xxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Area of Interest</label>
                  <select value={form.area_of_interest} onChange={e => setForm(f => ({ ...f, area_of_interest: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select a topic</option>
                    {interests.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase mb-1.5">Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" placeholder="Tell us how we can help..." />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-colors">
                  <Send size={16} />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-amber-700" />
                <h3 className="font-bold text-stone-900">Working Hours</h3>
              </div>
              <p className="text-stone-600 text-sm">Monday – Saturday: <strong>9:00 AM – 7:00 PM</strong></p>
              <p className="text-stone-400 text-sm mt-1">Sunday: Closed</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-amber-700" />
                <h3 className="font-bold text-stone-900">Our Locations</h3>
              </div>
              <div className="space-y-4">
                {branches.map(b => (
                  <div key={b.name} className="border-b border-stone-100 last:border-0 pb-3 last:pb-0">
                    <p className="font-semibold text-stone-800 text-sm">{b.name}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{b.area}</p>
                    <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-amber-700 text-sm mt-1 hover:text-amber-800">
                      <Phone size={12} /> {b.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://wa.me/251984272727"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl p-5 transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="font-semibold">Chat on WhatsApp</p>
                <p className="text-green-100 text-sm">Typically replies in minutes</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
