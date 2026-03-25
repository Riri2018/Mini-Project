import clsx from 'clsx'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import Tooltip from '../ui/Tooltip'

export default function StatTile({
  label,
  value,
  icon: Icon,
  trend, // { value: number, isPositive: boolean, label: string }
  tooltipInfo,
  className
}) {
  return (
    <GlassCard className={clsx('flex flex-col', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-2 rounded-xl bg-white/5 text-white/60">
              <Icon size={18} />
            </div>
          )}
          <span className="text-[13px] font-medium text-white/60 uppercase tracking-wider">
            {label}
          </span>
        </div>
        
        {tooltipInfo && (
          <Tooltip content={tooltipInfo}>
            <button className="text-white/30 hover:text-white/70 transition-colors cursor-help rounded-full w-5 h-5 flex items-center justify-center border border-white/20 text-[10px] font-bold">
              i
            </button>
          </Tooltip>
        )}
      </div>

      <div className="mt-auto">
        <div className="font-number font-medium text-[32px] text-white/95 leading-none mb-3">
          {value}
        </div>
        
        {trend && (
          <div className="flex items-center gap-2 text-[12px]">
            <span
              className={clsx(
                'flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium',
                trend.isPositive ? 'bg-ss-mint/15 text-ss-mint' : 
                trend.isPositive === false ? 'bg-ss-danger/15 text-ss-danger' : 
                'bg-white/10 text-white/60'
              )}
            >
              {trend.isPositive ? <TrendingUp size={12} /> : 
               trend.isPositive === false ? <TrendingDown size={12} /> : 
               <Minus size={12} />}
              {trend.value}%
            </span>
            <span className="text-white/40">{trend.label || 'vs last month'}</span>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
