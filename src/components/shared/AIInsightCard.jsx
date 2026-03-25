import clsx from 'clsx'
import { Sparkles } from 'lucide-react'
import GlassCardAccent from '../ui/GlassCardAccent'

export default function AIInsightCard({ title, insight, className, actionProps }) {
  return (
    <GlassCardAccent className={clsx('relative overflow-hidden', className)}>
      {/* Decorative gradient orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-ss-teal/30 rounded-full blur-[40px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-ss-teal/20 text-ss-teal-light">
            <Sparkles size={16} />
          </div>
          <h3 className="font-display font-medium text-[15px] text-white/95">
            {title || 'AI Insight'}
          </h3>
        </div>
        
        <p className="text-sm text-white/80 leading-relaxed mb-4">
          {insight}
        </p>

        {actionProps && (
          <button
            onClick={actionProps.onClick}
            className="text-[13px] font-medium text-ss-teal-light hover:text-white transition-colors flex items-center gap-1.5"
          >
            {actionProps.label}
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </GlassCardAccent>
  )
}
