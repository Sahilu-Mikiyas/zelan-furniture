import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const categories = [
  { href: '/products?category=bedroom', label: 'Bedroom' },
  { href: '/products?category=living-room', label: 'Living Room' },
  { href: '/products?category=dining', label: 'Dining' },
  { href: '/products?category=office', label: 'Office' },
  { href: '/products?category=storage', label: 'Storage' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-stone-950 to-amber-950 text-stone-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700 rounded-full blur-[150px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter / CTA strip */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-700 rounded-3xl p-8 md:p-10 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 -mt-24 shadow-2xl">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Ready to transform your home?</h3>
            <p className="text-amber-100">Book a free consultation with our design team today.</p>
          </div>
          <Link to="/contact" className="shrink-0 bg-white text-amber-800 hover:bg-amber-50 font-bold px-7 py-3.5 rounded-full transition-colors flex items-center gap-2 group whitespace-nowrap">
            Book Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Zelan<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Luxury furniture crafted for modern living. Serving Addis Ababa with premium quality and expert design guidance.
            </p>
            <div className="space-y-2 text-sm text-stone-400">
              <p className="flex items-center gap-2"><Phone size={13} className="text-amber-500" />0984272727 / 0969333333</p>
              <p className="flex items-center gap-2"><Mail size={13} className="text-amber-500" />info@zelanfurniture.com</p>
              <p className="flex items-center gap-2"><MapPin size={13} className="text-amber-500" />4 Branches in Addis Ababa</p>
              <p className="flex items-center gap-2"><Clock size={13} className="text-amber-500" />Mon–Sat: 9AM–7PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 tracking-wider text-sm uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="text-amber-700 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-5 tracking-wider text-sm uppercase">Shop By Category</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.href}>
                  <Link to={cat.href} className="text-sm text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="text-amber-700 group-hover:translate-x-1 transition-transform" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Compliance */}
          <div>
            <h3 className="text-white font-bold mb-5 tracking-wider text-sm uppercase">Connect</h3>
            <div className="flex gap-3 mb-6">
              <a href="#" aria-label="Facebook" className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center hover:bg-amber-700 transition-colors group">
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-stone-400 group-hover:fill-white transition-colors"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center hover:bg-amber-700 transition-colors group">
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-stone-400 group-hover:fill-white transition-colors"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/251984272727" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors group">
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-stone-400 group-hover:fill-white transition-colors">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
            <h3 className="text-white font-bold mb-3 tracking-wider text-sm uppercase">Compliance</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Zelan Furniture. All rights reserved.</p>
          <p>Crafted with <span className="text-amber-500">♥</span> in Addis Ababa</p>
        </div>
      </div>
    </footer>
  )
}
