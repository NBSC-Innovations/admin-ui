import { supabase } from './supabaseClient'

export async function fetchInstructors() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'instructor')
  if (error) throw error

  const { data: sections, error: secError } = await supabase
    .from('sections')
    .select('id, name, instructor_id')
  if (secError) throw secError

  return data.map((row) => ({
    id: row.id,
    name: row.full_name,
    email: row.email,
    department: row.department,
    status: row.status,
    linkedSections: sections.filter((s) => s.instructor_id === row.id).map((s) => s.name),
  }))
}