import { useMemo, useState } from 'react'
import { UserPlus, Pencil } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { SearchInput } from '../components/common/SearchInput'
import { StatusPill } from '../components/common/StatusPill'
import { DataTable } from '../components/tables/DataTable'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Card } from '../components/ui/Card'
import { Select } from '../components/ui/Select'
import { EditUserModal } from '../components/modals/EditUserModal'
import { useFetch } from '../hooks/useFetch'
import { fetchUsers, updateUserRole, updateUserStatus } from '../services/usersService'
import { ROLES } from '../constants'

const ROLE_TONE = {
  [ROLES.ADMIN]: 'gold',
  [ROLES.INSTRUCTOR]: 'neutral',
  [ROLES.STUDENT]: 'success',
}

export default function UserManagement() {
  const { data: users, loading, refetch } = useFetch(fetchUsers, [])
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const [editingUser, setEditingUser] = useState(null)
  const [localUsers, setLocalUsers] = useState(null)

  const rows = useMemo(() => localUsers ?? users ?? [], [localUsers, users])

  const filtered = useMemo(() => {
    return rows
      .filter((u) => (role === 'all' ? true : u.role === role))
      .filter((u) => [u.name, u.email].join(' ').toLowerCase().includes(query.toLowerCase()))
  }, [rows, query, role])

  const handleSave = async (updated) => {
    await Promise.all([updateUserRole(updated.id, updated.role), updateUserStatus(updated.id, updated.status)])
    setLocalUsers((prev) => (prev ?? rows).map((u) => (u.id === updated.id ? updated : u)))
    setEditingUser(null)
    refetch()
  }

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size={32} />
          <div>
            <p className="text-sm font-medium text-ink-900">{row.name}</p>
            <p className="text-xs text-ink-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', render: (row) => <Badge tone={ROLE_TONE[row.role] || 'neutral'}>{row.role}</Badge> },
    { key: 'status', header: 'Status', render: (row) => <StatusPill status={row.status} /> },
    { key: 'dateCreated', header: 'Created' },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Button size="sm" variant="outline" icon={Pencil} onClick={() => setEditingUser(row)}>
          Edit access
        </Button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="User management"
        description="Every account in the system — students, instructors, and admins — with role and access control."
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={query} onChange={setQuery} placeholder="Search by name or email…" className="max-w-xs" />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="all">All roles</option>
              {Object.values(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
            </Select>
          </div>
          <Button icon={UserPlus} size="sm">Add user</Button>
        </div>
        <DataTable columns={columns} rows={filtered} loading={loading} emptyTitle="No users found" />
      </Card>

      <EditUserModal key={editingUser?.id} open={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} onSave={handleSave} />
    </div>
  )
}