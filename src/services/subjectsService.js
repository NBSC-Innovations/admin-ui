import { subjects } from '../data/subjects'
import { apiDelay } from './apiDelay'

export async function fetchSubjects() {
  await apiDelay()
  return subjects
}