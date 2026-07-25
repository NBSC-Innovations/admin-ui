import { cn } from '../../utils/classNames'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn('rounded-2xl border border-ink-200/70 bg-white shadow-[0_1px_2px_rgba(11,30,63,0.04)]', className)}
      {...props}
    >
      {children}
    </div>
  )
}