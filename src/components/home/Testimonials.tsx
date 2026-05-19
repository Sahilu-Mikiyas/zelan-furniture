import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  { name: 'Meron T.', review: 'The bedroom set I ordered exceeded my expectations. Excellent quality and fast delivery to my home in Bole!', rating: 5 },
  { name: 'Dawit A.', review: 'Amazing customer service. They helped me pick the perfect living room set for my apartment in CMC. Highly recommend!', rating: 5 },
  { name: 'Sara B.', review: 'My office furniture arrived on time and looks absolutely stunning. The quality is outstanding for the price.', rating: 4 },
  { name: 'Yonas K.', review: 'Ordered a custom wardrobe and it came out perfectly. The team was patient and professional throughout the process.', rating: 5 },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-stone-500 text-sm">4.9 / 5 from 200+ reviews</span>
          </div>
        </div>

        <div className="relative bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <div className="text-6xl text-amber-200 font-serif leading-none mb-4">"</div>
          <p className="text-stone-700 text-lg md:text-xl leading-relaxed mb-6 italic">
            {testimonials[current].review}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold">
              {testimonials[current].name[0]}
            </div>
            <div>
              <p className="font-semibold text-stone-900">{testimonials[current].name}</p>
              <div className="flex gap-0.5">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 hidden md:block">
            <button onClick={prev} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden md:block">
            <button onClick={next} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-amber-700' : 'w-2 h-2 bg-stone-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
