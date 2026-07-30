import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import { ROLES, ROLE_LABEL, ACCOUNT_STATUS } from '../../constants'

export function EditUserModal({ open, onClose, user, onSave }) {
  const [role, setRole] = useState(user?.role ?? '')
  const [status, setStatus] = useState(user?.status ?? '')

  if (!user) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit access · ${user.name}`}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave({ ...user, role, status })}>Save changes</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Role</label>
          <Select value={role} onChange={(e) => setRole(e.target.value)} className="w-full">
            {Object.values(ROLES).map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Status</label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full">
            {Object.values(ACCOUNT_STATUS).map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </Select>
        </div>
      </div>
    </Modal>
  )
}