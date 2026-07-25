import { instructors } from '../data/instructors'
import { apiDelay } from './apiDelay'

export async function fetchInstructors() {
  await apiDelay()
  return instructors
}