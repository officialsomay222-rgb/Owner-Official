/**
 * Firestore Security Rules Verification Suite for Dirty Dozen Payloads
 */
export interface RuleTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: { uid: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expected: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const dirtyDozenTests: RuleTestCase[] = [
  {
    id: 1,
    name: 'Unverified Admin Email Spoof',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: false },
    payload: { name: 'Loki APK' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Shadow Field Injection',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { name: 'Loki APK', ghostField: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Owner UID Spoofing',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { ownerId: 'someone_else' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Client Timestamp Forgery',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Oversized String Denial-of-Wallet',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { name: 'A'.repeat(120) },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Path ID Poisoning',
    operation: 'create',
    path: '/apk_apps/invalid$id!@#',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { name: 'Valid' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Unbounded Array Injection',
    operation: 'create',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { features: ['1', '2', '3', '4', '5', '6', '7'] },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Immutable Field Mutation',
    operation: 'update',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { ownerId: 'new_owner' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Value Poisoning on Update',
    operation: 'update',
    path: '/apk_apps/loki_apk_1',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { published: 'yes' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Orphaned APK Chunk Write',
    operation: 'create',
    path: '/apk_apps/non_existent_app/chunks/chunk_0',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { appId: 'non_existent_app', index: 0, data: 'AAAA' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Unpublished App Scraping',
    operation: 'get',
    path: '/apk_apps/draft_app_1',
    auth: null,
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Cross-Parent Chunk Spoofing',
    operation: 'create',
    path: '/apk_apps/loki_apk_1/chunks/chunk_0',
    auth: { uid: 'admin1', email: 'officialsomay222@gmail.com', email_verified: true },
    payload: { appId: 'different_app_id', index: 0, data: 'AAAA' },
    expected: 'PERMISSION_DENIED',
  },
];
