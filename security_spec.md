# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Admin-Only Writes (Google Admin OR Atomic Passkey Gate)**: Writes to `/apk_apps/{appId}` and `/apk_apps/{appId}/chunks/{chunkId}` are permitted only if the caller is a verified Google admin (`officialsomay222@gmail.com` with `email_verified == true`) OR creates an atomic `/upload_gates/{gateId}` document in the exact same batch (`createdAt == request.time`) with the matching SHA-256 passkey digest and matching `appId`.
2. **Zero Passkey Leakage**: `/upload_gates/{gateId}` has `allow read, update, delete: if false;` so no client can ever read passkey hashes or replay an old `gateId` (`createdAt == request.time` fails on existing gate docs).
3. **Public Published Reads**: Public visitors can only read (`get`, `list`) documents in `/apk_apps/{appId}` where `resource.data.published == true`.
4. **Master Gate Relational Sync**: Every `/apk_apps/{appId}/chunks/{chunkId}` document requires the parent `/apk_apps/{appId}` document to exist. Public visitors can only read a chunk if the parent `/apk_apps/{appId}` has `published == true`.
5. **Strict Schema & Volumetric Bounds**: All fields enforce `.hasAll()` and `.hasOnly()` key checks, string `.size()` limits, regex validation, bounded array checks (`<= 6`), and server timestamp integrity (`request.time`).
6. **Immutable Identity & Creation Metadata**: `ownerId` and `createdAt` cannot be modified during an update operation.

## 2. The "Dirty Dozen" Payloads
1. **Unverified Admin Email Spoof**: Authenticated user with `email: "officialsomay222@gmail.com"` and `email_verified: false` attempting to create an `ApkApp`.
2. **Wrong Passkey Gate Hash**: Attempting to create `/upload_gates/{gateId}` with an incorrect `passkeyHash`.
3. **Replay Old Gate ID**: Attempting to reuse an existing `/upload_gates/{oldGateId}` without creating it in the same atomic batch (`createdAt < request.time`).
4. **Read Upload Gate Secret**: Attempting `get` or `list` on `/upload_gates/{gateId}` to scrape `passkeyHash`.
5. **Shadow Field Injection**: Creating an `ApkApp` with an undeclared field `"isFeatured": true`.
6. **Owner UID Spoofing**: Creating an `ApkApp` where `ownerId` does not match `request.auth.uid` (or `'passkey_admin'` for passkey writes).
7. **Client Timestamp Forgery**: Sending a forged past/future `createdAt` or `updatedAt` instead of `request.time`.
8. **Oversized String Denial-of-Wallet**: Payload with `name` exceeding 80 characters or `fullDesc` exceeding 1200 characters.
9. **Path ID Poisoning**: Creating `/apk_apps/{appId}` where `appId` contains special characters or exceeds 128 chars.
10. **Immutable Field Mutation**: Updating `createdAt` or `ownerId` on an existing `ApkApp`.
11. **Orphaned APK Chunk Write**: Writing to `/apk_apps/{appId}/chunks/{chunkId}` when `/apk_apps/{appId}` does not exist.
12. **Unpublished App Scraping**: Unauthenticated user attempting `get` on `/apk_apps/{appId}` where `published == false`.
