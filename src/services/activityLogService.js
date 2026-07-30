import { supabase } from './supabaseClient'

export async function fetchActivityLogs() {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .order('timestamp', { ascending: false })
  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    actor: row.user_id ?? 'System',
    action: row.action,
    target: row.details ?? '—',
    timestamp: row.timestamp,
    type: 'system', // placeholder — no `type` column exists yet in the DB
    ipAddress: '—', // placeholder — no `ip_address` column exists yet in the DB
  }))
}