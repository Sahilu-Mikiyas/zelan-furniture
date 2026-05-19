import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppWidget from './WhatsAppWidget'

export default function SiteLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
