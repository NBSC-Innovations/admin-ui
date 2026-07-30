# NBSC Admin UI

Admin dashboard for the Northern Bukidnon State College (NBSC) Student Information System — used by admins to manage students, instructors, subjects, and class sections, and to monitor activity logs. Connected to Supabase as the backend/database.

## Tech Stack

- **React** + **Vite** — frontend framework and build tool
- **Supabase** (`@supabase/supabase-js`) — database, auth (future), and real-time backend
- Plain CSS (component-scoped stylesheets, not Tailwind by default)

## Project Structure

```
src/
├── assets/              # images, icons, logos
├── charts/               # chart components (e.g. EnrollmentTrendChart)
├── components/
│   ├── common/            # PageHeader, SearchInput, StatusPill
│   ├── dashboard/          # KpiCard, RecentActivity
│   ├── modals/             # ConfirmDialog, EditUserModal, Modal
│   ├── tables/             # DataTable
│   ├── ui/                 # Avatar, Badge, Button, Card, EmptyState, Input, Select
│   └── Sidebar.jsx
├── constants/            # shared constant values (e.g. STUDENT_DEPARTMENTS)
├── data/                 # legacy mock data (deprecated — see Migration Status below)
├── hooks/
│   ├── useDashboardData.js  # aggregates dashboard KPIs + recent activity
│   └── useFetch.js
├── pages/
│   ├── ActivityLogs.jsx
│   ├── ClassSections.jsx
│   ├── Dashboard.jsx
│   ├── Instructors.jsx
│   ├── Students.jsx
│   ├── Subjects.jsx
│   └── UserManagement.jsx
├── services/             # Supabase query layer, one file per resource
│   ├── activityLogService.js
│   ├── classSectionsService.js
│   ├── instructorService.js
│   ├── studentsService.js
│   ├── subjectsService.js
│   ├── supabaseClient.js
│   └── usersService.js
├── styles/               # component-scoped CSS
├── utils/
│   ├── classNames.js
│   ├── deriveDepartment.js  # derives department from program/section code prefix
│   ├── formatDate.js
│   └── naturalSort.js
├── App.jsx               # root layout: Sidebar + page switcher (state-based, no router)
└── main.jsx
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>
```

Get these from the Supabase dashboard: **Project Settings → API Keys**.

> ⚠️ Only use the **Publishable key** (formerly called the "anon key"). Never use the **Secret key** in the frontend — that one is for backend/server-side use only.

After creating or changing `.env`, the dev server must be restarted (it does not hot-reload env changes).

### 3. Run the dev server

```bash
npm run dev
```

## Database Schema (Supabase)

The admin-ui uses the following tables from the `public` schema:

| Table | Used for |
|---|---|
| `profiles` | Central user table — students, instructors, and admin, distinguished by the `role` column (`student` / `instructor` / `admin`) |
| `sections` | Class sections — has `course_id` (FK → `courses`) and `instructor_id` (FK → `profiles`) |
| `courses` | Subjects/courses catalog |
| `enrollments` + `section_enrollments` | Two-hop join used to count how many sections a student is enrolled in |
| `activity_logs` | Recent activity feed on the Dashboard |
| `users` | Legacy/duplicate table, mirrors identities in `profiles` but not actively used by current queries |

### Key columns

- `profiles`: `id` (uuid, matches `auth.users.id`), `email`, `full_name`, `student_id`, `role`, `department`, `program`, `status`, `created_at`
- `sections`: `id`, `course_id`, `name`, `description`, `instructor_id`, `schedule` (jsonb — shape: `{ days: [...], time: "HH:MM-HH:MM" }`), `room`, `max_capacity`, `current_enrollment`
- `courses`: `id`, `code`, `title`, `department`, `credits`, `max_students`, `current_students`, `semester`, `academic_year`
- `activity_logs`: `id`, `user_id`, `action`, `details`, `timestamp`

## Services Layer

Each resource has its own service file under `src/services/` that abstracts the Supabase queries:

- `fetchStudents()` — queries `profiles` (role = student), joined with `enrollments`/`section_enrollments` for the sections count
- `fetchInstructors()` — queries `profiles` (role = instructor), cross-referenced with `sections.instructor_id` for linked sections
- `fetchClassSections()` — queries `sections`, with a nested join into `courses` and `profiles`
- `fetchSubjects()` — queries `courses`
- `fetchActivityLogs()` — queries `activity_logs`, sorted newest first

## Migration Status

- ✅ Supabase integration — connected, tested
- ✅ Dashboard — live stats (CORs uploaded, class sections, linked instructors) and recent activity feed
- ✅ Students page — connected to `profiles` + enrollment join
- ✅ Instructors page — connected to `profiles` + sections cross-reference
- ✅ Class Sections page — connected to `sections` + nested joins
- ✅ Subjects page — connected to `courses`
- ⬜ `data/*.js` mock files — deprecated, still need to be removed once all pages are confirmed stable
- ⬜ Login/authentication — postponed; a draft implementation exists (`Login.jsx`, `authService.js`, `useAuth.jsx`) but is not currently wired up, to be revisited later

## Known Notes

- Some students don't have a `program` value yet (`NULL` in the DB) — handled in `deriveDepartment.js` (returns `'Unknown'` when no program/section code is present).
- The `activity_logs` table is currently empty (0 records) — so "No activity yet" will show on the Recent Activity card until actions start being logged.
- RLS (Row Level Security) — **currently disabled** on most tables (`profiles`, `courses`, `sections`, etc.). This needs to be enabled with proper policies before any public deployment, since anyone with the publishable key can currently read/write all data while it's disabled.