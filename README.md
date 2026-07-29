## Naming conventions nga gigamit

- **Student ID / email:** `YYYYNNNN` format (e.g. `20234881`), email = `{id}@nbsc.edu.ph`
- **Instructor email:** `{apilyedo}.{unang letra sa first name}@nbsc.edu.ph` (e.g. `delacruz.j@nbsc.edu.ph`)
- **Departments:** IBM (Institute of Business Management), ICS (Institute for Computer Studies), ITE (Institute of Teacher Education) — full names naka-store sa `constants/index.js` under `DEPARTMENTS`
- **Class section codes:** IT01–IT100 (ICS), IBM01–IBM200, ITE01–ITE150 — derived department gamit ang `utils/deriveDepartment.js`

## Pag-connect sa Supabase (sunod nga step)

Ang `src/services/*.js` files ra ang i-usab — dili ang pages o components. Pananglitan:

```js
// Karon (mock):
import { students } from '../data/students'
export async function fetchStudents() {
  await apiDelay()
  return students
}

// Human (Supabase):
import { supabase } from './supabaseClient'
export async function fetchStudents() {
  const { data, error } = await supabase.from('students').select('*')
  if (error) throw error
  return data
}
```

Steps:
1. `npm install @supabase/supabase-js`
2. Himoa ang `src/services/supabaseClient.js`
3. Butangi og `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. I-usab ang matag `fetchX()` function sa `services/` — mapping snake_case (DB) → camelCase (UI) kung kinahanglan

## Wala pa nabuhat / gitangtang

- OCR Review page — gitangtang na base sa team decision
- Settings page — gitangtang na
- Login/auth — wala pa gi-implement, mock session ra

## Known trade-offs (mock-data stage)

- Walay real-time updates — mag-load ra ang data isa ka higayon per page visit
- Ang "Add user", "Add subject", "Invite instructor" buttons UI-only pa, wala pa functional
- Sample data lang ang subjects (dili tibuok listahan gikan sa Permanent Records)