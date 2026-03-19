import { clsx } from 'clsx';

const Badge = ({ children, variant = 'success', className }) => {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    neutral: 'bg-white/10 text-white/70 border border-white/[0.18] rounded-full px-2.5 py-0.5 text-[10px] font-medium',
  };
  return (
    <span className={clsx('inline-flex items-center', variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
