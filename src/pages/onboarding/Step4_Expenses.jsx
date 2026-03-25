import { Home, UtensilsCrossed, Bus, Zap, MoreHorizontal } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const EXPENSE_FIELDS = [
  { key: 'rent', label: 'Rent / PG', icon: Home, placeholder: '12000' },
  { key: 'food', label: 'Food & Groceries', icon: UtensilsCrossed, placeholder: '5000' },
  { key: 'transport', label: 'Transport / Fuel', icon: Bus, placeholder: '2000' },
  { key: 'utilities', label: 'Utilities & Bills', icon: Zap, placeholder: '1500' },
  { key: 'other', label: 'Other Fixed Costs', icon: MoreHorizontal, placeholder: '2000' },
]

export default function Step4_Expenses({ data, update, onNext, onBack }) {
  const updateExpense = (key, value) => update({ expenses: { ...data.expenses, [key]: value } })

  const total = Object.values(data.expenses).reduce((sum, v) => sum + (Number(v) || 0), 0)
  const inHand = data.salary ? Math.round(Number(data.salary) * 0.85) : 0
  const remaining = inHand - total

  const handleNext = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <GlassCard className="p-8">
      <h2 className="font-display text-[22px] font-semibold text-white/95 mb-1">Fixed monthly expenses</h2>
      <p className="text-[13px] text-white/50 mb-6">Enter what you spend every month on essentials</p>

      <form onSubmit={handleNext} className="space-y-4">
        {EXPENSE_FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
          <Input
            key={key}
            label={label}
            type="number"
            placeholder={placeholder}
            icon={<Icon size={16} />}
            value={data.expenses[key]}
            onChange={e => updateExpense(key, e.target.value)}
            min="0"
          />
        ))}

        {inHand > 0 && (
          <div className={`rounded-[12px] p-4 transition-all ${remaining >= 0 ? 'glass-card-accent' : 'bg-ss-danger/10 border border-ss-danger/30 rounded-[12px]'}`}>
            <div className="flex justify-between text-[13px]">
              <span className="text-white/60">In-hand salary</span>
              <span className="text-white/90 font-medium">₹{inHand.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[13px] mt-1">
              <span className="text-white/60">Total expenses</span>
              <span className="text-ss-amber font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[13px] mt-2 pt-2 border-t border-white/10">
              <span className="font-medium text-white/80">Available to save</span>
              <span className={`font-semibold ${remaining >= 0 ? 'text-ss-teal-light' : 'text-ss-danger'}`}>
                ₹{remaining.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-3">
          <Button type="button" variant="secondary" onClick={onBack} className="flex-1">← Back</Button>
          <Button type="submit" className="flex-1">Continue →</Button>
        </div>
      </form>
    </GlassCard>
  )
}
