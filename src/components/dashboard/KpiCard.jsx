import { Card } from '../ui/Card'
import { cn } from '../../utils/classNames'

export function KpiCard({ label, value, delta, deltaTone = 'success', icon: Icon }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
            <Icon size={16} />
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-ink-900">{value}</p>
      {delta && (
        <p className={cn('mt-1 text-xs font-medium', deltaTone === 'success' ? 'text-success-600' : 'text-danger-600')}>
          {delta}
        </p>
      )}
    </Card>
  )
}