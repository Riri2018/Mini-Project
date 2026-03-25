import { useState } from 'react'
import clsx from 'clsx'

export default function Tooltip({ children, content, placement = 'top' }) {
  const [visible, setVisible] = useState(false)

  const placements = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <div
          className={clsx(
            'absolute z-50 whitespace-nowrap pointer-events-none',
            'bg-[rgba(15,18,30,0.92)] backdrop-blur-tooltip',
            'border border-white/15 rounded-[8px] px-3 py-1.5',
            'text-[12px] text-white/85 animate-fade-in',
            placements[placement]
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
