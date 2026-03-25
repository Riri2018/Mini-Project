import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(function Input(
  { label, error, helper, icon, iconRight, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] font-medium text-white/60 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={clsx(
            'glass-input w-full px-3.5 py-2.5 text-sm',
            icon && 'pl-9',
            iconRight && 'pr-9',
            error && 'border-ss-danger/70 focus:border-ss-danger',
            className
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-ss-danger">{error}</p>}
      {helper && !error && <p className="mt-1.5 text-[11px] text-white/40">{helper}</p>}
    </div>
  )
})

export default Input
