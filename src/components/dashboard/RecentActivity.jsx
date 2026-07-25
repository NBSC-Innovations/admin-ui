import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { timeAgo } from '../../utils/formatDate'
import { cn } from '../../utils/classNames'
import { History } from 'lucide-react'

const DOT_TONE = {
  admin: 'bg-navy-700',
  instructor: 'bg-gold-500',
  student: 'bg-success-600',
  system: 'bg-warning-600',
}

export function RecentActivity({ logs = [] }) {
  return (
    <Card className="p-5">
      <p className="mb-4 font-display text-sm font-semibold text-ink-900">Recent activity</p>
      {logs.length === 0 ? (
        <EmptyState icon={History} title="No activity yet" description="Actions will show up here once the backend is connected." />
      ) : (
        <ul className="space-y-4">
          {logs.slice(0, 5).map((log) => (
            <li key={log.id} className="flex items-start gap-3">
              <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', DOT_TONE[log.type] || 'bg-ink-400')} />
              <div className="min-w-0">
                <p className="text-sm text-ink-900">
                  <span className="font-medium">{log.actor}</span> {log.action.toLowerCase()}
                </p>
                <p className="text-xs text-ink-400">
                  {log.target} · {timeAgo(log.timestamp)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}