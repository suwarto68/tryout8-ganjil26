/**
 * Security Rule Verification Suite — Dirty Dozen Payloads
 * Reference spec for Firestore Rules Unit Testing (@firebase/rules-unit-testing).
 */

export const DIRTY_DOZEN_CASES = [
  { name: 'Unauthenticated list on quiz_submissions', expected: 'PERMISSION_DENIED' },
  { name: 'Non-admin list on quiz_submissions', expected: 'PERMISSION_DENIED' },
  { name: 'Non-admin delete on quiz_submissions', expected: 'PERMISSION_DENIED' },
  { name: 'Student update on quiz_submissions', expected: 'PERMISSION_DENIED' },
  { name: 'Shadow field isAdmin in create payload', expected: 'PERMISSION_DENIED' },
  { name: 'Invalid className 9C', expected: 'PERMISSION_DENIED' },
  { name: 'Score out of bounds (150)', expected: 'PERMISSION_DENIED' },
  { name: 'Oversized studentName (>80 chars)', expected: 'PERMISSION_DENIED' },
  { name: 'Spoofed submittedAt timestamp', expected: 'PERMISSION_DENIED' },
  { name: 'Unverified admin email access', expected: 'PERMISSION_DENIED' },
  { name: 'Non-admin privilege escalation on /admins', expected: 'PERMISSION_DENIED' },
  { name: 'Invalid path ID with slash/traversal', expected: 'PERMISSION_DENIED' },
] as const;
