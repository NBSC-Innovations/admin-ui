import { classSections } from '../data/classSections'
import { apiDelay } from './apiDelay'

export async function fetchClassSections() {
  await apiDelay()
  return classSections
}