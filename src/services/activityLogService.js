import { activityLogs } from '../data/activityLogs'
import { apiDelay } from './apiDelay'

export async function fetchActivityLogs() {
  await apiDelay()
  return activityLogs
}