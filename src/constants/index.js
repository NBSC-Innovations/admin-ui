export const OCR_STATUS = {
  NEEDS_REVIEW: 'needs_review',
  CONFIRMED: 'confirmed',
  AUTO_MATCHED: 'auto_matched',
}

export const OCR_STATUS_LABEL = {
  [OCR_STATUS.NEEDS_REVIEW]: 'Needs review',
  [OCR_STATUS.CONFIRMED]: 'Confirmed',
  [OCR_STATUS.AUTO_MATCHED]: 'Auto-matched',
}

export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
}

export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
}

export const ROLE_LABEL = {
  [ROLES.STUDENT]: 'Student',
  [ROLES.INSTRUCTOR]: 'Instructor',
  [ROLES.ADMIN]: 'System Admin',
}

export const STUDENT_DEPARTMENTS = {
  IBM: 'Institute of Business Management (IBM)',
  ICS: 'Institute for Computer Studies (ICS)',
  ITE: 'Institute of Teacher Education (ITE)',
}

export const INSTRUCTOR_DEPARTMENTS = {
  IBM: 'Institute of Business Management (IBM)',
  ICS: 'Institute for Computer Studies (ICS)',
  ITE: 'Institute of Teacher Education (ITE)',
  DGEC: 'Department of General Education and Culture (DGEC)',
  CCS: 'College of Criminal Justice and Sciences (CCS)',
  RSS: 'Research and Statistics Services (RSS)',
  NSTP: 'National Service Training Program (NSTP)',
  PATHFIT: 'Physical Fitness and Health (PATHFIT)',
}

export const DATA_PRIVACY_NOTE =
  'Student data is scoped under RA 10173 (Data Privacy Act). COR images are retained only until extraction is confirmed.'