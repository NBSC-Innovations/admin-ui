import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useFetch } from '../hooks/useFetch'
import { fetchSubjects } from '../services/subjectsService'

export default function Subjects() {
  const { data: subjects, loading } = useFetch(fetchSubjects, [])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!subjects) return []
    return subjects.filter((s) => [s.code, s.title].join(' ').toLowerCase().includes(query.toLowerCase()))
  }, [subjects, query])

  const columns = [
    { key: 'code', header: 'Code', render: (row) => <span className="font-mono text-sm font-semibold">{row.code}</span> },
    { key: 'title', header: 'Title' },
    { key: 'units', header: 'Units' },
    { key: 'program', header: 'Program', render: (row) => <Badge tone="neutral">{row.program}</Badge> },
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
          <SearchInput value={query} onChange={setQuery} placeholder="Search by code or title…" className="max-w-xs" />
          <p className="text-xs text-ink-400">{filtered.length} of {subjects?.length ?? 0} subjects</p>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No subjects found" />
      </Card>
    </div>
  )
}