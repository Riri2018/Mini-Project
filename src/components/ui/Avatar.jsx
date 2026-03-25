import clsx from 'clsx'

const sizes = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-[13px]',
  lg: 'w-12 h-12 text-base',
}

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Avatar({ name, src, size = 'md', className }) {
  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center flex-shrink-0',
        'bg-ss-teal/25 border border-ss-teal/40 text-ss-teal-light font-medium',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}
