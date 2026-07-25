import { students } from '../data/students'
import { apiDelay } from './apiDelay'

export async function fetchStudents() {
  await apiDelay()
  return students
}