import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { EmptyState } from '../components/ui/EmptyState'
import { ScanLine } from 'lucide-react'

const BUCKETS = [
  { bucket: '0–40%', min: 0, max: 40, color: '#C6362E' },
  { bucket: '40–65%', min: 40, max: 65, color: '#B5760B' },
  { bucket: '65–85%', min: 65, max: 85, color: '#C9A24B' },
  { bucket: '85–100%', min: 85, max: 101, color: '#17875A' },
]

// Expects `data` = the OCR queue array (e.g. from fetchOcrQueue()), each item with `confidence`.
function toSeries(queue = []) {
  return BUCKETS.map(({ bucket, min, max, color }) => ({
    bucket,
    color,
    count: queue.filter((item) => item.confidence >= min && item.confidence < max).length,
  }))
}

export function OCRConfidenceChart({ data }) {
  const series = toSeries(data)
  const hasData = series.some((s) => s.count > 0)

  if (!hasData) {
    return <EmptyState icon={ScanLine} title="No OCR uploads yet" description="Confidence distribution appears once CORs are scanned." />
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={series} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
        <CartesianGrid vertical={false} stroke="#DCE1EC" />
        <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: '#8891A6' }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#8891A6' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: '1px solid #DCE1EC', fontSize: 12 }}
          cursor={{ fill: 'rgba(11,30,63,0.04)' }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Uploads">
          {series.map((entry) => (
            <Cell key={entry.bucket} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}