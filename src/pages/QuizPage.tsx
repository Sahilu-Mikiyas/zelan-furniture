
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const questions = [
  {
    id: 'room',
    question: "Which room are you furnishing?",
    options: [
      { value: 'bedroom', label: 'Bedroom', icon: '🛏️' },
      { value: 'living-room', label: 'Living Room', icon: '🛋️' },
      { value: 'dining', label: 'Dining Room', icon: '🍽️' },
      { value: 'office', label: 'Office', icon: '💼' },
    ],
  },
  {
    id: 'style',
    question: "What's your preferred style?",
    options: [
      { value: 'Modern', label: 'Modern', icon: '🏙️' },
      { value: 'Classic', label: 'Classic', icon: '🏛️' },
      { value: 'Minimalist', label: 'Minimalist', icon: '⬜' },
      { value: 'Bohemian', label: 'Bohemian', icon: '🌿' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    options: [
      { value: '1', label: 'Budget-friendly', icon: '💵' },
      { value: '2', label: 'Mid-range', icon: '💰' },
      { value: '3', label: 'Premium', icon: '💎' },
      { value: '', label: 'No preference', icon: '🤷' },
    ],
  },
  {
    id: 'priority',
    question: "What matters most to you?",
    options: [
      { value: 'comfort', label: 'Comfort & Coziness', icon: '🛌' },
      { value: 'looks', label: 'Aesthetics & Style', icon: '✨' },
      { value: 'durability', label: 'Durability & Quality', icon: '🔒' },
      { value: 'value', label: 'Value for Money', icon: '🎯' },
    ],
  },
]

export default function QuizPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState('')

  const question = questions[step]
  const isLast = step === questions.length - 1
  const progress = ((step) / questions.length) * 100

  const handleSelect = (value: string) => setSelected(value)

  const handleNext = () => {
    const updated = { ...answers, [question.id]: selected }
    setAnswers(updated)
    setSelected('')

    if (isLast) {
      const params = new URLSearchParams()
      if (updated.room) params.set('category', updated.room)
      if (updated.style) params.set('style', updated.style)
      if (updated.budget) params.set('price_tier', updated.budget)
      navigate(`/products?${params.toString()}`)
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-stone-400 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-700 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">{question.question}</h2>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {question.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all',
                  selected === opt.value
                    ? 'border-amber-700 bg-amber-50'
                    : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                )}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="text-sm font-medium text-stone-700">{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 border border-stone-200 text-stone-600 px-5 py-3 rounded-xl hover:bg-stone-50 transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!selected}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {isLast ? 'See My Results' : 'Next'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
