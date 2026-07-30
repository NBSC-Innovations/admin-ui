import { supabase } from './supabaseClient'

export async function fetchClassSections() {
  const { data, error } = await supabase
    .from('sections')
    .select(`
      id,
      name,
      room,
      schedule,
      current_enrollment,
      max_capacity,
      courses ( code, title ),
      profiles ( full_name )
    `)

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    subjectCode: row.courses?.code ?? '—',
    section: row.name,
    instructor: row.profiles?.full_name ?? 'Unassigned',
    schedule: formatSchedule(row.schedule),
    room: row.room ?? '—',
    memberCount: row.current_enrollment ?? 0,
    maxCapacity: row.max_capacity ?? 0,
  }))
}

function formatSchedule(schedule) {
  if (!schedule) return '—'

  const days = Array.isArray(schedule.days) ? schedule.days.join('/') : ''
  const time = schedule.time ?? ''

  return [days, time].filter(Boolean).join(' · ') || '—'
}