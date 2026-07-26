import { useMemo, useState } from 'react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { DataTable } from '../components/tables/DataTable'
import { Badge } from '../components/ui/Badge'
import { Select } from '../components/ui/Select'
import { Card } from '../components/ui/Card'
import { useFetch } from '../hooks/useFetch'
import { fetchActivityLogs } from '../services/activityLogService'

const TYPE_TONE = { admin: 'gold', instructor: 'neutral', student: 'success', system: 'warning' }

export default function ActivityLogs() {
  const { data: logs, loading } = useFetch(fetchActivityLogs, [])
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    if (!logs) return []
    return logs
      .filter((l) => (type === 'all' ? true : l.type === type))
      .filter((l) => [l.actor, l.action, l.target].join(' ').toLowerCase().includes(query.toLowerCase()))
  }, [logs, query, type])

  const columns = [
    { key: 'timestamp', header: 'Time' },
    { key: 'actor', header: 'Actor' },
    { key: 'action', header: 'Action' },
    { key: 'target', header: 'Target' },
    { key: 'ipAddress', header: 'IP Address', render: (row) => <span className="font-mono text-xs">{row.ipAddress || '—'}</span> },
    { key: 'type', header: 'Type', render: (row) => <Badge tone={TYPE_TONE[row.type]}>{row.type}</Badge> },
  ]

  return (
    <div>
      <PageHeader title="Activity logs" description="Audit trail of admin, instructor, student, and system actions." />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} placeholder="Search logs…" className="max-w-xs" />
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All types</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
              <option value="system">System</option>
            </Select>
          </div>
          <p className="text-xs text-ink-400">{filtered.length} of {logs?.length ?? 0} entries</p>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No activity found" rowKey="id" />
      </Card>
    </div>
  )
}