import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { fetchActivityLogs } from '../services/activityLogService'

export function useDashboardData() {
  const [stats, setStats] = useState({ corsCount: 0, sectionsCount: 0, instructorsCount: 0 })
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [
          { count: corsCount },
          { count: sectionsCount },
          { count: instructorsCount },
          logsData,
        ] = await Promise.all([
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('sections').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'instructor'),
          fetchActivityLogs(),
        ])

        if (cancelled) return

        setStats({
          corsCount: corsCount ?? 0,
          sectionsCount: sectionsCount ?? 0,
          instructorsCount: instructorsCount ?? 0,
        })
        setLogs(logsData)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { stats, logs, loading, error }
}