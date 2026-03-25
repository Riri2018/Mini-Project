import clsx from 'clsx'

const variants = {
  success: 'bg-ss-mint/15 text-ss-mint border border-ss-mint/30',
  warning: 'bg-ss-amber/15 text-ss-amber border border-ss-amber/30',
  danger: 'bg-ss-danger/15 text-ss-danger border border-ss-danger/30',
  info: 'bg-ss-violet/15 text-ss-violet-light border border-ss-violet/30',
  neutral: 'bg-white/10 text-white/70 border border-white/[0.18]',
}

export default function Badge({ children, variant = 'neutral', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5',
        'text-[10px] font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
