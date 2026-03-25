import clsx from 'clsx'

export default function Divider({ className, label }) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[11px] text-white/40 font-medium">{label}</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>
    )
  }

  return <div className={clsx('h-px w-full bg-white/[0.08]', className)} />
}
