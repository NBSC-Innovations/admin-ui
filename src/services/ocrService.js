import { ocrQueue } from '../data/ocrQueue'
import { apiDelay } from './apiDelay'

export async function fetchOcrQueue() {
  await apiDelay()
  return ocrQueue
}