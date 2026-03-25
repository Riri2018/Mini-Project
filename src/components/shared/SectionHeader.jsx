import clsx from 'clsx'

export default function SectionHeader({ title, subtitle, action, className }) {
  return (
    <div className={clsx('flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6', className)}>
      <div>
        <h2 className="font-display font-semibold text-[22px] text-white/95 tracking-[0.01em]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-white/50 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
