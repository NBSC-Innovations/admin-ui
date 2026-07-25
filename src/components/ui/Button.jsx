import { cn } from '../../utils/classNames'

const VARIANTS = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800',
  outline: 'border border-ink-200 text-ink-900 hover:bg-navy-50',
}

export function Button({ variant = 'primary', className, icon: Icon, children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 h-10 text-sm font-medium transition-colors disabled:opacity-50',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </button>
  )
}