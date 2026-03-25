import { motion } from 'framer-motion'
import { Shield, TrendingUp, Home, Car, GraduationCap, Plane } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import clsx from 'clsx'

const GOALS = [
  { id: 'emergency_fund', icon: Shield, label: 'Emergency Fund', desc: 'Build 6 months of expenses as safety net' },
  { id: 'investments', icon: TrendingUp, label: 'Start Investing', desc: 'Begin SIPs and grow wealth early' },
  { id: 'home', icon: Home, label: 'Buy a Home', desc: 'Save for down payment in 3–5 years' },
  { id: 'vehicle', icon: Car, label: 'Buy a Vehicle', desc: 'Two-wheeler or car in 1–2 years' },
  { id: 'education', icon: GraduationCap, label: 'Higher Education', desc: 'MBA, certifications, or upskilling' },
  { id: 'travel', icon: Plane, label: 'Travel Goals', desc: 'Fund domestic and international trips' },
]

export default function Step3_Goals({ data, update, onNext, onBack }) {
  const toggle = (id) => {
    const goals = data.goals.includes(id)
      ? data.goals.filter(g => g !== id)
      : [...data.goals, id]
    update({ goals })
  }

  return (
    <GlassCard className="p-8">
      <h2 className="font-display text-[22px] font-semibold text-white/95 mb-1">What are your goals?</h2>
      <p className="text-[13px] text-white/50 mb-6">Select all that apply — we'll build a plan for each</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {GOALS.map(({ id, icon: Icon, label, desc }) => {
          const active = data.goals.includes(id)
          return (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => toggle(id)}
              className={clsx(
                'text-left p-4 rounded-[12px] border transition-all duration-200',
                active
                  ? 'bg-ss-teal/15 border-ss-teal/50 text-white'
                  : 'bg-white/[0.05] border-white/[0.10] text-white/60 hover:bg-white/[0.08] hover:border-white/20'
              )}
            >
              <Icon size={18} className={active ? 'text-ss-teal-light mb-2' : 'text-white/40 mb-2'} />
              <p className="text-[13px] font-medium">{label}</p>
              <p className="text-[11px] mt-0.5 opacity-70">{desc}</p>
            </motion.button>
          )
        })}
      </div>

      {data.goals.length === 0 && (
        <p className="text-[12px] text-ss-amber text-center mb-4">Pick at least one goal to continue</p>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack} className="flex-1">← Back</Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={data.goals.length === 0}
          className="flex-1"
        >
          Continue →
        </Button>
      </div>
    </GlassCard>
  )
}
