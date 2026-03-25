import clsx from 'clsx'

export default function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label className={clsx('flex items-center gap-3 cursor-pointer', disabled && 'opacity-40 cursor-not-allowed')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={clsx(
          'relative w-10 h-5.5 rounded-full transition-all duration-300',
          'border flex-shrink-0',
          checked
            ? 'bg-ss-teal border-ss-teal-light/50'
            : 'bg-white/10 border-white/20'
        )}
        style={{ height: '22px' }}
      >
        <span
          className={clsx(
            'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300',
            checked ? 'left-5' : 'left-0.5'
          )}
        />
      </button>
      {label && <span className="text-sm text-white/70">{label}</span>}
    </label>
  )
}
