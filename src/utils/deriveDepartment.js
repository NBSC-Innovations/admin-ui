import { STUDENT_DEPARTMENTS } from '../constants'

// Students: derive department from their program/block prefix (e.g. "BSIT 1A" -> ICS)
export function deriveDepartmentFromProgram(program = '') {
  if (program.startsWith('BSIT')) return STUDENT_DEPARTMENTS.ICS
  if (program.startsWith('BSBM')) return STUDENT_DEPARTMENTS.IBM
  if (program.startsWith('BSED')) return STUDENT_DEPARTMENTS.ITE
  return 'Unknown'
}

// Class sections: derive department from the section code prefix (e.g. "IT042" -> ICS)
export function deriveDepartmentFromSectionCode(sectionCode = '') {
  const prefix = sectionCode.match(/^[A-Z]+/)?.[0] ?? ''
  if (prefix === 'IT') return STUDENT_DEPARTMENTS.ICS
  if (prefix === 'IBM') return STUDENT_DEPARTMENTS.IBM
  if (prefix === 'ITE') return STUDENT_DEPARTMENTS.ITE
  return 'Unknown'
}