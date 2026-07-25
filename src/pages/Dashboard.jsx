import { GraduationCap, Layers, Users } from 'lucide-react'
import { KpiCard } from '../components/dashboard/KpiCard'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { EnrollmentTrendChart } from '../charts/EnrollmentTrendChart'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/common/PageHeader'
import { useFetch } from '../hooks/useFetch'
import { fetchActivityLogs } from '../services/activityLogService'
import { fetchStudents } from '../services/studentsService'
import { fetchClassSections } from '../services/classSectionsService'
import { fetchInstructors } from '../services/instructorService'

export default function Dashboard() {
  const { data: logs } = useFetch(fetchActivityLogs, [])
  const { data: students } = useFetch(fetchStudents, [])
  const { data: classSections } = useFetch(fetchClassSections, [])
  const { data: instructors } = useFetch(fetchInstructors, [])

  const activeInstructors = (instructors || []).filter((i) => i.status === 'active').length

  return (
    <div>
      <PageHeader
        title="Overview"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="CORs uploaded" value={students?.length ?? 0} icon={GraduationCap} />
        <KpiCard label="Class sections created" value={classSections?.length ?? 0} icon={Layers} />
        <KpiCard label="Linked instructors" value={activeInstructors} icon={Users} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <p className="mb-1 font-display text-sm font-semibold text-ink-900">COR uploads over time</p>
          <p className="mb-3 text-xs text-ink-400">Daily uploads since onboarding opened</p>
          <EnrollmentTrendChart data={students || []} />
        </Card>
        <RecentActivity logs={logs || []} />
      </div>
    </div>
  )
}