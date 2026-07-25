export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`h-10 rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 outline-none focus:border-navy-600 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}