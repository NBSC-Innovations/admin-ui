export function Input({ icon: Icon, className = '', ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />}
      <input
        className={`h-10 w-full rounded-lg border border-ink-200 bg-white text-sm outline-none focus:border-navy-600 ${Icon ? 'pl-9 pr-3' : 'px-3'} ${className}`}
        {...props}
      />
    </div>
  )
}