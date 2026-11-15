# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Admin-Only Writes**: Only a verified administrator (`officialsomay222@gmail.com` with `email_verified == true` or a registered UID in `/admins/{uid}`) may create, update, or delete `/apk_apps/{appId}` or `/apk_apps/{appId}/chunks/{chunkId}`.
2. **Public Published Reads**: Public visitors can only read (`get`, `list`) documents in `/apk_apps/{appId}` where `resource.data.published == true`. Unpublished drafts are restricted strictly to `isAdmin()`.
3. **Master Gate Relational Sync**: Every `/apk_apps/{appId}/chunks/{chunkId}` document requires the parent `/apk_apps/{appId}` document to exist. Public visitors can only read a chunk if the parent `/apk_apps/{appId}` has `published == true`.
4. **Strict Schema & Volumetric Bounds**: All fields on `ApkApp` and `ApkChunk` enforce strict `.hasAll()` and `.hasOnly()` key checks, string `.size()` limits, regex pattern validation, bounded array checks (`<= 6`), and server timestamp integrity (`request.time`).
5. **Immutable Identity & Creation Metadata**: `ownerId` and `createdAt` cannot be modified during an update operation.

## 2. The "Dirty Dozen" Payloads
1. **Unverified Admin Email Spoof**: Authenticated user with `email: "officialsomay222@gmail.com"` and `email_verified: false` attempting to create an `ApkApp`.
2. **Shadow Field Injection**: Admin creating an `ApkApp` with an undeclared field `"isFeatured": true`.
3. **Owner UID Spoofing**: Admin creating an `ApkApp` where `ownerId != request.auth.uid`.
4. **Client Timestamp Forgery**: Admin sending a forged past/future `createdAt` or `updatedAt` instead of `request.time`.
5. **Oversized String Denial-of-Wallet**: Payload with `name` exceeding 80 characters or `fullDesc` exceeding 1200 characters.
6. **Path ID Poisoning**: Creating `/apk_apps/{appId}` where `appId` contains special characters or exceeds 128 chars.
7. **Unbounded Array Injection**: Payload where `features` array has 20 items (`size() > 6`).
8. **Immutable Field Mutation**: Updating `createdAt` or `ownerId` on an existing `ApkApp`.
9. **Value Poisoning on Update**: Updating `published` with a string `"true"` instead of a boolean.
10. **Orphaned APK Chunk Write**: Writing to `/apk_apps/{appId}/chunks/{chunkId}` when `/apk_apps/{appId}` does not exist.
11. **Unpublished App Scraping**: Unauthenticated user attempting `list` or `get` on `/apk_apps/{appId}` where `published == false`.
12. **Cross-Parent Chunk Spoofing**: Creating `/apk_apps/app_1/chunks/chunk_0` where `incoming().appId == "app_2"`.
