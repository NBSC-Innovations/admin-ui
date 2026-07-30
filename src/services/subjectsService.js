import { supabase } from './supabaseClient'

export async function fetchSubjects() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    code: row.code,
    title: row.title,
    units: row.credits,
    program: row.academic_year ? `${row.academic_year} · ${row.semester}` : '—',
    department: row.department,
  }))
}