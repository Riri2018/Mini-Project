import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const Select = forwardRef(function Select({ label, error, options = [], className, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] font-medium text-white/60 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            'glass-input w-full px-3.5 py-2.5 text-sm appearance-none pr-9',
            'bg-white/[0.06] text-white/90',
            '[&>option]:bg-[#0d1525] [&>option]:text-white',
            error && 'border-ss-danger/70',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        />
      </div>
      {error && <p className="mt-1.5 text-[11px] text-ss-danger">{error}</p>}
    </div>
  )
})

export default Select
