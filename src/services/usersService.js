import { users } from '../data/users'
import { apiDelay } from './apiDelay'

export async function fetchUsers() {
  await apiDelay()
  return users
}

export async function updateUserRole(userId, role) {
  await apiDelay(300)
  return { userId, role }
}

export async function updateUserStatus(userId, status) {
  await apiDelay(300)
  return { userId, status }
}