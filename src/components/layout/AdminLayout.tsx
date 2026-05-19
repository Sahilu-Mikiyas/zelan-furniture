import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, Package, Image, MessageSquare, MapPin, Star, LogOut, Menu, Tv } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/hero', label: 'Hero Banner', icon: Tv },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/admin/branches', label: 'Branches', icon: MapPin },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-stone-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Zelan Admin</p>
            <p className="text-stone-400 text-xs">Dashboard</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              isActive ? 'bg-amber-700 text-white' : 'text-stone-400 hover:bg-stone-700 hover:text-white'
            )}
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-stone-700">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-stone-400 hover:bg-stone-700 hover:text-white transition-colors">
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      <aside className="hidden md:flex flex-col w-56 bg-stone-900 shrink-0">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-stone-900 z-10">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-stone-600"><Menu size={22} /></button>
          <span className="font-bold text-stone-900">Zelan Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
