import clsx from 'clsx'

export default function GlassCardViolet({ children, className }) {
  return (
    <div className={clsx('glass-card-violet p-5', className)}>
      {children}
    </div>
  )
}
