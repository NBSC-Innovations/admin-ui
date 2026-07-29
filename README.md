# COR Admin Console — admin-ui

Admin panel for the Automated COR-Based Class Section and Group Chat Management System (Northern Bukidnon State College, BSIT). This is a UI scaffold running on mock data — no backend yet, but structured to be ready for Supabase integration.

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` (or next available port) — straight into the Dashboard, no login gate.

## Pages

| Page | Route/ID | Description |
|---|---|---|
| Dashboard | `dashboard` | KPI cards, COR upload trend chart, recent activity |
| User Management | `user-management` | All accounts (Student/Instructor/Admin) with role & status control |
| Students | `students` | List of students who uploaded a COR, with department filter |
| Instructors | `instructors` | List of instructors, with linked sections count |
| Subjects | `subjects` | Subject catalog, with department filter |
| Class Sections | `class-sections` | Auto-created sections from matched CORs, with merge-duplicate flow |
| Activity Logs | `activity-logs` | Audit trail (admin/instructor/student/system actions), with IP address column |

## Project structure
src/
├── assets/
├── charts/ # EnrollmentTrendChart, OCRConfidenceChart
├── components/
│ ├── common/ # PageHeader, SearchInput, StatusPill
│ ├── dashboard/ # KpiCard, RecentActivity
│ ├── modals/ # Modal, ConfirmDialog, EditUserModal
│ ├── tables/ # DataTable (generic, reusable)
│ ├── ui/ # Button, Badge, Card, Input, Select, Avatar, EmptyState
│ └── Sidebar.jsx # Custom sidebar nav (no react-router, id-based)
├── constants/
│ └── index.js # ROLES, ACCOUNT_STATUS, DEPARTMENTS
├── data/ # Mock data per resource (temporary — swap for Supabase)
├── hooks/
│ └── useFetch.js # Generic async-state hook
├── pages/ # Flat pages (no subfolders), one per resource
├── services/ # Fetch functions — this is what changes when Supabase is wired up
├── styles/
│ └── Sidebar.css
└── utils/
├── classNames.js
├── formatDate.js
├── deriveDepartment.js # Derives department from program/section code prefix
└── naturalSort.js # For future sorting of section codes

## Naming conventions

- **Student ID / email:** `YYYYNNNN` format (e.g. `20234881`), email = `{id}@nbsc.edu.ph`
- **Instructor email:** `{surname}.{first initial}@nbsc.edu.ph` (e.g. `delacruz.j@nbsc.edu.ph`)
- **Departments:** IBM (Institute of Business Management), ICS (Institute for Computer Studies), ITE (Institute of Teacher Education) — full names stored in `constants/index.js` under `DEPARTMENTS`
- **Class section codes:** IT01–IT100 (ICS), IBM01–IBM200, ITE01–ITE150 — department derived via `utils/deriveDepartment.js`

## Connecting to Supabase (next step)

Only `src/services/*.js` files need to change — not the pages or components. Example:

```js
// Current (mock):
import { students } from '../data/students'
export async function fetchStudents() {
  await apiDelay()
  return students
}

// After (Supabase):
import { supabase } from './supabaseClient'
export async function fetchStudents() {
  const { data, error } = await supabase.from('students').select('*')
  if (error) throw error
  return data
}
```

Steps:
1. `npm install @supabase/supabase-js`
2. Create `src/services/supabaseClient.js`
3. Add a `.env` file (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Update each `fetchX()` function in `services/` — map snake_case (DB) → camelCase (UI) where needed

## Not yet built / removed

- OCR Review page — removed per team decision
- Settings page — removed
- Login/auth — not implemented, mock session only

## Known trade-offs (mock-data stage)

- No real-time updates — data loads once per page visit
- "Add user", "Add subject", "Invite instructor" buttons are UI-only, not yet functional
- Subjects data is a small sample, not the full Permanent Records list
