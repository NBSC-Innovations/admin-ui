import { DEPARTMENTS } from '../constants'

// Students: derive department from their program/block prefix (e.g. "BSIT 1A" -> ICS)
export function deriveDepartmentFromProgram(program = '') {
  if (program.startsWith('BSIT')) return DEPARTMENTS.ICS
  if (program.startsWith('BSBM')) return DEPARTMENTS.IBM
  if (program.startsWith('BSED')) return DEPARTMENTS.ITE
  return 'Unknown'
}

// Class sections: derive department from the section code prefix (e.g. "IT042" -> ICS)
export function deriveDepartmentFromSectionCode(sectionCode = '') {
  const prefix = sectionCode.match(/^[A-Z]+/)?.[0] ?? ''
  if (prefix === 'IT') return DEPARTMENTS.ICS
  if (prefix === 'IBM') return DEPARTMENTS.IBM
  if (prefix === 'ITE') return DEPARTMENTS.ITE
  return 'Unknown'
}