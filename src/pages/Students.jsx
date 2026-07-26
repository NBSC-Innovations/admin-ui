import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { StatusPill } from '../components/common/StatusPill'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { Card } from '../components/ui/Card'
import { Select } from '../components/ui/Select'
import { useFetch } from '../hooks/useFetch'
import { fetchStudents } from '../services/studentsService'
import { DEPARTMENTS } from '../constants'

export default function Students() {
  const { data: students, loading } = useFetch(fetchStudents, [])
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')

  const filtered = useMemo(() => {
    if (!students) return []
    return students
      .filter((s) => (department === 'all' ? true : s.department === department))
      .filter((s) =>
        [s.name, s.id, s.email, s.program].join(' ').toLowerCase().includes(query.toLowerCase()),
      )
  }, [students, query, department])

  const columns = [
    {
      key: 'name',
      header: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size={32} />
          <div>
            <p className="text-sm font-medium text-ink-900">{row.name}</p>
            <p className="text-xs text-ink-400">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'department', header: 'Department', render: (row) => DEPARTMENTS[row.department] || row.department },
    { key: 'program', header: 'Section' },
    { key: 'sectionsJoined', header: 'GCs joined' },
    { key: 'corStatus', header: 'COR status', render: (row) => <StatusPill status={row.corStatus} /> },
    { key: 'dateUploaded', header: 'Uploaded' },
  ]

  return (
    <div>
      <PageHeader
        title="Students"
        description="Everyone who has registered and uploaded a Certificate of Registration."
        actions={
          <Button variant="outline" icon={Download} size="sm">
            Export CSV
          </Button>
        }
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} placeholder="Search by name, ID, or email…" className="max-w-xs" />
            <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="all">All departments</option>
              {Object.values(DEPARTMENTS).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>
          <p className="text-xs text-ink-400">{filtered.length} of {students?.length ?? 0} students</p>
        </div>
        <DataTable
          columns={columns}
          rows={filtered}
          loading={loading}
          emptyTitle="No students found"
          emptyDescription="Try a different search term."
        />
      </Card>
    </div>
  )
}