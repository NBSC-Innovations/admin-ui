import { supabase } from './supabaseClient'

export async function fetchStudents() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')

  if (error) throw error

  // sectionsJoined needs a two-hop join: profiles -> enrollments -> section_enrollments
  const { data: enrollments, error: enrollError } = await supabase
    .from('enrollments')
    .select('id, student_id')
  if (enrollError) throw enrollError

  const { data: sectionEnrollments, error: secError } = await supabase
    .from('section_enrollments')
    .select('enrollment_id')
  if (secError) throw secError

  const enrollmentToStudent = Object.fromEntries(enrollments.map((e) => [e.id, e.student_id]))
  const countsByStudent = {}
  for (const se of sectionEnrollments) {
    const studentId = enrollmentToStudent[se.enrollment_id]
    if (!studentId) continue
    countsByStudent[studentId] = (countsByStudent[studentId] || 0) + 1
  }

  return profiles.map((row) => ({
    id: row.student_id,
    name: row.full_name,
    email: row.email,
    program: row.program,
    corStatus: row.status, // no dedicated COR table — using account status for now
    sectionsJoined: countsByStudent[row.id] || 0,
    dateUploaded: row.created_at?.split('T')[0],
  }))
}