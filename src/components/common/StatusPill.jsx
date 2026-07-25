import { Badge } from '../ui/Badge'

const MAP = {
  active: { tone: 'success', label: 'Active' },
  inactive: { tone: 'neutral', label: 'Inactive' },
  pending: { tone: 'warning', label: 'Pending' },
}

export function StatusPill({ status }) {
  const entry = MAP[status] || { tone: 'neutral', label: status }
  return <Badge tone={entry.tone}>{entry.label}</Badge>
}