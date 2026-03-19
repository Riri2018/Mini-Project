import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Input = forwardRef(({ label, error, icon: Icon, className, type = 'text', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/50">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
            <Icon size={15} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={clsx(
            'glass-input',
            Icon && 'pl-9',
            error && 'border-[rgba(226,75,74,0.7)] focus:border-[rgba(226,75,74,0.7)] focus:shadow-[0_0_0_3px_rgba(226,75,74,0.15)]',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-[#E24B4A]">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
