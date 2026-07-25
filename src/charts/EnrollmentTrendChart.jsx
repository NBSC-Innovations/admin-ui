import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { EmptyState } from '../components/ui/EmptyState'
import { TrendingUp } from 'lucide-react'

// Expects `data` = array of students with a `dateUploaded` field (e.g. from fetchStudents()).
// Aggregates into upload-count-per-day for the chart.
function toSeries(students = []) {
  const counts = {}
  for (const s of students) {
    if (!s.dateUploaded) continue
    counts[s.dateUploaded] = (counts[s.dateUploaded] || 0) + 1
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, uploads]) => ({ day, uploads }))
}

export function EnrollmentTrendChart({ data }) {
  const series = toSeries(data)

  if (series.length === 0) {
    return <EmptyState icon={TrendingUp} title="No uploads yet" description="This chart populates once COR uploads start coming in." />
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={series} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
        <defs>
          <linearGradient id="uploadFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1E3F" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#0B1E3F" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#DCE1EC" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8891A6' }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#8891A6' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: '1px solid #DCE1EC', fontSize: 12 }}
          labelStyle={{ fontWeight: 600, color: '#161C2C' }}
        />
        <Area type="monotone" dataKey="uploads" stroke="#0B1E3F" strokeWidth={2} fill="url(#uploadFill)" name="COR uploads" />
      </AreaChart>
    </ResponsiveContainer>
  )
}