import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { Select } from '../components/ui/Select'
import { useFetch } from '../hooks/useFetch'
import { fetchSubjects } from '../services/subjectsService'
import { DEPARTMENTS } from '../constants'

export default function Subjects() {
  const { data: subjects, loading } = useFetch(fetchSubjects, [])
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')

  const filtered = useMemo(() => {
    if (!subjects) return []
    return subjects
      .filter((s) => (department === 'all' ? true : s.department === department))
      .filter((s) => [s.code, s.title].join(' ').toLowerCase().includes(query.toLowerCase()))
  }, [subjects, query, department])

  const columns = [
    { key: 'code', header: 'Code', render: (row) => <span className="font-mono text-sm font-semibold">{row.code}</span> },
    { key: 'title', header: 'Title' },
    { key: 'units', header: 'Units' },
    { key: 'department', header: 'Department', render: (row) => <Badge tone="neutral">{row.department}</Badge> },
  ]

  return (
    <div>
      <PageHeader
        title="Subject catalog"
        description="Canonical subject list used to validate OCR-extracted subject codes."
        actions={
          <Button icon={Plus} size="sm">
            Add subject
          </Button>
        }
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} placeholder="Search by code or title…" className="max-w-xs" />
            <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="all">All departments</option>
              {Object.values(DEPARTMENTS).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>
          <p className="text-xs text-ink-400">{filtered.length} of {subjects?.length ?? 0} subjects</p>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No subjects found" />
      </Card>
    </div>
  )
}