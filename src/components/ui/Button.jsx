import clsx from 'clsx'

const variants = {
  primary: [
    'bg-ss-teal/90 backdrop-blur-sm text-white',
    'border border-ss-teal-light/50 rounded-[10px]',
    'shadow-[0_4px_16px_rgba(29,158,117,0.3)]',
    'hover:bg-ss-teal hover:shadow-[0_6px_24px_rgba(29,158,117,0.45)]',
    'transition-all duration-250',
  ].join(' '),
  secondary: [
    'bg-white/[0.07] backdrop-blur-sm text-white/80',
    'border border-white/[0.18] rounded-[10px]',
    'hover:bg-white/[0.12] hover:border-white/[0.28]',
    'transition-all duration-250',
  ].join(' '),
  ghost: [
    'bg-transparent text-ss-teal-light',
    'rounded-[10px] hover:bg-white/[0.06]',
    'transition-all duration-250',
  ].join(' '),
  danger: [
    'bg-ss-danger/80 text-white',
    'border border-ss-danger/50 rounded-[10px]',
    'hover:bg-ss-danger transition-all duration-250',
  ].join(' '),
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-7 py-3 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon,
  onClick,
  type = 'button',
  fullWidth,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
