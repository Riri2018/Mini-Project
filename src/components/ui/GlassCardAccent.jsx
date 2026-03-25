import clsx from 'clsx'

export default function GlassCardAccent({ children, className }) {
  return (
    <div className={clsx('glass-card-accent p-5', className)}>
      {children}
    </div>
  )
}
