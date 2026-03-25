import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import useAuthStore from '@/store/authStore'
import useUserStore from '@/store/userStore'

export default function Step5_Complete({ data }) {
  const navigate = useNavigate()
  const { completeOnboarding } = useAuthStore()
  const { updateProfile } = useUserStore()

  const handleDashboard = () => {
    updateProfile({
      name: data.name,
      age: Number(data.age),
      city: data.city,
      employer: data.employer,
      salary: Number(data.salary),
      payDate: Number(data.payDate),
      goals: data.goals,
      fixedExpenses: data.expenses,
    })
    completeOnboarding()
    navigate('/dashboard')
  }

  return (
    <GlassCard className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-ss-teal/20 border border-ss-teal/40 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 size={36} className="text-ss-teal-light" />
      </motion.div>

      <h2 className="font-display text-[24px] font-semibold text-white/95 mb-2">
        You're all set, {data.name || 'there'}! 🎉
      </h2>
      <p className="text-[14px] text-white/55 mb-8 max-w-sm mx-auto">
        Your personalised financial dashboard is ready. Let's start building smarter money habits.
      </p>

      <div className="glass-card-accent p-4 rounded-[12px] text-left mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-ss-teal-light" />
          <p className="text-[13px] font-medium text-white/90">What happens next</p>
        </div>
        <ul className="space-y-2">
          {[
            'Your budget is auto-split using the 50/30/20 rule',
            'AI will analyse your spending patterns',
            'We\'ll suggest personalised investment options',
            'Weekly health score updates keep you on track',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-[13px] text-white/65">
              <CheckCircle2 size={13} className="text-ss-teal-light flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleDashboard} fullWidth size="lg" icon={<ArrowRight size={16} />}>
        Go to Dashboard
      </Button>
    </GlassCard>
  )
}
