const TONES = {
  neutral: 'bg-navy-100 text-navy-800',
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  gold: 'bg-gold-100 text-gold-500',
}

export function Badge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${TONES[tone]}`}>
      {children}
    </span>
  )
}