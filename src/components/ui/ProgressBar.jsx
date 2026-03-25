import clsx from 'clsx'

const fills = {
  teal: 'progress-fill-teal',
  violet: 'progress-fill-violet',
  amber: 'progress-fill-amber',
  danger: 'progress-fill-danger',
}

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'teal',
  label,
  showPercent,
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs text-white/60">{label}</span>}
          {showPercent && (
            <span className="text-xs text-white/60">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div
          className={fills[color]}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
