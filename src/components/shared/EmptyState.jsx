import { Frown } from 'lucide-react'
import clsx from 'clsx'
import GlassCard from '../ui/GlassCard'

export default function EmptyState({ icon: Icon = Frown, title, description, action, className }) {
  return (
    <GlassCard className={clsx('flex flex-col items-center justify-center text-center py-12 px-6', className)} hover={false}>
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-5">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-[17px] font-medium text-white/90 mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-white/50 max-w-sm mb-6">
        {description}
      </p>
      {action}
    </GlassCard>
  )
}
