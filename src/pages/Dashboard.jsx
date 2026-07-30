import { GraduationCap, Layers, Users } from 'lucide-react'
import { useDashboardData } from '../hooks/useDashboardData'
import { KpiCard } from '../components/dashboard/KpiCard'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { Card } from '../components/ui/Card'

export default function Dashboard() {
  const { stats, logs, loading, error } = useDashboardData()

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p className="text-red-500">Failed to load dashboard: {error.message}</p>

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <KpiCard label="CORs uploaded" value={stats.corsCount} icon={GraduationCap} />
        <KpiCard label="Class sections created" value={stats.sectionsCount} icon={Layers} />
        <KpiCard label="Linked instructors" value={stats.instructorsCount} icon={Users} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <p className="mb-1 font-display text-sm font-semibold text-ink-900">COR uploads over time</p>
          <p className="mb-3 text-xs text-ink-400">Daily uploads since onboarding opened</p>
          {/* EnrollmentTrendChart — i-dugang human ta makasiguro sa iyang expected data shape */}
        </Card>

        <RecentActivity logs={logs} />
      </div>
    </div>
  )
}