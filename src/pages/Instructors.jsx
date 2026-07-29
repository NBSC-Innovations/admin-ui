import { useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { StatusPill } from '../components/common/StatusPill'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { Card } from '../components/ui/Card'
import { Select } from '../components/ui/Select'
import { useFetch } from '../hooks/useFetch'
import { fetchInstructors } from '../services/instructorService'
import { INSTRUCTOR_DEPARTMENTS } from '../constants'

export default function Instructors() {
  const { data: instructors, loading } = useFetch(fetchInstructors, [])
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')

  const filtered = useMemo(() => {
    if (!instructors) return []
    return instructors
      .filter((i) => (department === 'all' ? true : i.department === department))
      .filter((i) => [i.name, i.email, i.department].join(' ').toLowerCase().includes(query.toLowerCase()))
  }, [instructors, query, department])

  const columns = [
    {
      key: 'name',
      header: 'Instructor',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size={32} />
          <div>
            <p className="text-sm font-medium text-ink-900">{row.name}</p>
            <p className="text-xs text-ink-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'department', header: 'Department' },
    {
      key: 'linkedSections',
      header: 'Linked sections',
      render: (row) => row.linkedSections?.length ?? 0,
    },
    { key: 'status', header: 'Status', render: (row) => <StatusPill status={row.status} /> },
  ]

  return (
    <div>
      <PageHeader
        title="Instructors"
        description="Instructors linked automatically once a student's COR names them as instructor of record."
        actions={
          <Button variant="outline" icon={UserPlus} size="sm">
            Invite instructor
          </Button>
        }
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} placeholder="Search by name or department…" className="max-w-xs" />
            <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="all">All departments</option>
              {Object.values(INSTRUCTOR_DEPARTMENTS).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>
          <p className="text-xs text-ink-400">{filtered.length} of {instructors?.length ?? 0} instructors</p>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No instructors found" />
      </Card>
    </div>
  )
}