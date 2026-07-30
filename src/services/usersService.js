import { supabase } from './supabaseClient'

export async function fetchUsers() {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    name: row.full_name,
    email: row.email,
    role: row.role,
    status: row.status,
    dateCreated: row.created_at?.split('T')[0],
  }))
}

export async function updateUserRole(userId, role) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
  if (error) throw error
  return { userId, role }
}

export async function updateUserStatus(userId, status) {
  const { error } = await supabase.from('profiles').update({ status }).eq('id', userId)
  if (error) throw error
  return { userId, status }
}