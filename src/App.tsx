import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { supabase } from '@/lib/supabase'

// Layout
import SiteLayout from '@/components/layout/SiteLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// Public pages
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import GalleryPage from '@/pages/GalleryPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import WishlistPage from '@/pages/WishlistPage'
import QuizPage from '@/pages/QuizPage'
import BundlePage from '@/pages/BundlePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Admin pages
import AdminLoginPage from '@/pages/admin/LoginPage'
import AdminDashboardPage from '@/pages/admin/DashboardPage'
import AdminProductsPage from '@/pages/admin/ProductsPage'
import AdminProductFormPage from '@/pages/admin/ProductFormPage'
import AdminGalleryPage from '@/pages/admin/GalleryPage'
import AdminHeroPage from '@/pages/admin/HeroPage'
import AdminInquiriesPage from '@/pages/admin/InquiriesPage'
import AdminBranchesPage from '@/pages/admin/BranchesPage'
import AdminTestimonialsPage from '@/pages/admin/TestimonialsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthed(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  return authed ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/bundle" element={<BundlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:id" element={<AdminProductFormPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="hero" element={<AdminHeroPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="branches" element={<AdminBranchesPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
