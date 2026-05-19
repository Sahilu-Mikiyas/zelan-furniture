import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Truck, Palette, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  { icon: ShieldCheck, title: 'Quality First', desc: 'Every piece passes rigorous quality checks before reaching your home.' },
  { icon: Truck, title: 'Reliable Delivery', desc: 'Fast, careful delivery across Addis Ababa — your furniture arrives safe.' },
  { icon: Palette, title: 'Custom Design', desc: 'We craft furniture to your exact specifications and dimensions.' },
  { icon: Headphones, title: 'Ongoing Support', desc: 'Our team is available to assist you before, during, and after purchase.' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — Zelan Furniture</title>
        <meta name="description" content="Learn about Zelan Furniture — premium furniture with 4 showrooms across Addis Ababa, Ethiopia." />
      </Helmet>
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 to-amber-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-amber-700/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">Designed for <span className="text-amber-400">Comfortable Living</span></h1>
          <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Zelan Furniture was founded with a simple mission: bring premium quality furniture to Ethiopian homes at accessible prices, with expert guidance and a personal touch.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-5">Who We Are</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                With 4 showrooms across Addis Ababa, Zelan Furniture has been transforming Ethiopian homes and offices with carefully curated furniture collections that blend modern aesthetics with lasting durability.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Our team of design consultants works closely with each customer to understand their space, style, and budget — whether you're furnishing a studio apartment in Bole or a villa in CMC.
              </p>
              <p className="text-stone-600 leading-relaxed">
                From our showroom floors to your doorstep, we are committed to a seamless, satisfying experience from the very first browse.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl p-12 text-center">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '2,400+', label: 'Happy Customers' },
                  { value: '500+', label: 'Products' },
                  { value: '4', label: 'Showrooms' },
                  { value: '5★', label: 'Average Rating' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-3xl font-bold text-amber-700">{s.value}</p>
                    <p className="text-stone-500 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-amber-700" />
                </div>
                <h3 className="font-bold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-3">Ready to Transform Your Space?</h2>
        <p className="text-stone-500 mb-6">Visit any of our 4 showrooms or browse our full collection online.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/products" className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
            Browse Products
          </Link>
          <Link to="/contact" className="border-2 border-stone-300 hover:border-amber-700 text-stone-700 hover:text-amber-700 font-semibold px-6 py-3 rounded-full transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}
