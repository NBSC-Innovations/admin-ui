import { useMemo, useState } from 'react'
import { GitMerge, MessageSquare, TriangleAlert } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ConfirmDialog } from '../components/modals/ConfirmDialog'
import { useFetch } from '../hooks/useFetch'
import { fetchClassSections } from '../services/classSectionsService'
import { deriveDepartmentFromSectionCode } from '../utils/deriveDepartment'

export default function ClassSections() {
  const { data: sections, loading } = useFetch(fetchClassSections, [])
  const [query, setQuery] = useState('')
  const [mergeTarget, setMergeTarget] = useState(null)

  const filtered = useMemo(() => {
    if (!sections) return []
    return sections.filter((s) =>
      [s.subjectCode, s.section, s.instructor].join(' ').toLowerCase().includes(query.toLowerCase()),
    )
  }, [sections, query])

  const columns = [
    {
      key: 'subjectCode',
      header: 'Subject',
      render: (row) => (
        <div>
          <p className="font-mono text-sm font-semibold">{row.subjectCode}</p>
          <p className="text-xs text-ink-400">{row.section}</p>
        </div>
      ),
    },
    { key: 'instructor', header: 'Instructor' },
    { key: 'schedule', header: 'Schedule' },
    { key: 'room', header: 'Room' },
    { key: 'sectionCode', header: 'Section Code', render: (row) => <span className="font-mono text-xs">{row.sectionCode}</span> },
    { key: 'department', header: 'Department', render: (row) => deriveDepartmentFromSectionCode(row.sectionCode) },
    {
      key: 'memberCount',
      header: 'Members',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5">
          <MessageSquare size={13} className="text-ink-400" />
          {row.memberCount}
        </span>
      ),
    },
    {
      key: 'duplicateFlag',
      header: '',
      render: (row) =>
        row.duplicateFlag ? (
          <Button size="sm" variant="outline" icon={GitMerge} onClick={() => setMergeTarget(row)}>
            Merge
          </Button>
        ) : null,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Class sections"
        description="Auto-created from matching subject + instructor + schedule across confirmed CORs."
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by subject, section, or instructor…" className="max-w-xs" />
          <div className="flex items-center gap-3">
            {sections?.some((s) => s.duplicateFlag) && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warning-600">
                <TriangleAlert size={13} />
                Possible duplicate detected
              </span>
            )}
            <p className="text-xs text-ink-400">{filtered.length} of {sections?.length ?? 0} sections</p>
          </div>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No class sections found" />
      </Card>

      <ConfirmDialog
        open={!!mergeTarget}
        onClose={() => setMergeTarget(null)}
        onConfirm={() => setMergeTarget(null)}
        title="Merge duplicate section?"
        description={
          mergeTarget &&
          `This will merge "${mergeTarget.subjectCode} · ${mergeTarget.section}" (${mergeTarget.memberCount} members) into the matching section, combining group chat membership. This can't be undone.`
        }
        confirmLabel="Merge sections"
        tone="danger"
      />
    </div>
  )
}