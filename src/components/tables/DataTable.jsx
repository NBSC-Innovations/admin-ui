import { EmptyState } from '../ui/EmptyState'
import { Inbox } from 'lucide-react'

export function DataTable({ columns, rows, loading, emptyTitle = 'Nothing here yet', emptyDescription, rowKey = 'id' }) {
  if (loading) {
    return <div className="py-16 text-center text-sm text-ink-400">Loading…</div>
  }
  if (!rows || rows.length === 0) {
    return <EmptyState icon={Inbox} title={emptyTitle} />
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink-200/70">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-ink-200/50 hover:bg-navy-50/60">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 align-middle text-ink-900">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}