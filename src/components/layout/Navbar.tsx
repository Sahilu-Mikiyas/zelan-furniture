import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updateCount = () => {
      const wl = JSON.parse(localStorage.getItem('zelan_wishlist') || '[]')
      setWishlistCount(wl.length)
    }
    updateCount()
    window.addEventListener('wishlist-updated', updateCount)
    return () => window.removeEventListener('wishlist-updated', updateCount)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className={cn('fixed top-0 w-full z-50 transition-all duration-300', scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-800 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-stone-800 tracking-tight">Zelan<span className="text-amber-700">.</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={cn('text-sm font-medium transition-colors hover:text-amber-700', location.pathname === link.to ? 'text-amber-700' : 'text-stone-600')}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/products" className="text-stone-600 hover:text-amber-700 transition-colors"><Search size={20} /></Link>
            <Link to="/wishlist" className="relative text-stone-600 hover:text-amber-700 transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </Link>
            <a href="https://wa.me/251984272727" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button className="md:hidden text-stone-700" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={cn('block text-sm font-medium py-1', location.pathname === link.to ? 'text-amber-700' : 'text-stone-600')}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-100">
            <a href="https://wa.me/251984272727" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full">WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  )
}
