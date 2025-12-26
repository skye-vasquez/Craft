# Compliance Evidence Portal - Security Documentation

## Architecture Overview

The application follows a security-first architecture with clear separation between client and server responsibilities.

```
[Client Browser]
      |
      v
[Next.js Frontend] -- Public routes only
      |
      v
[Next.js API Routes] -- All sensitive operations
      |
      v
[Supabase] -- Database + Storage + Auth
      |
      v
[Craft API] -- External integration (server-side only)
```

## Authentication

### Store User Authentication

**Method:** PIN-based authentication
- 6-digit numeric PIN per store
- PINs stored as bcrypt hashes (cost factor 10)
- PIN never transmitted in plain text after initial login
- Session stored in HTTP-only, secure cookie

**Session Details:**
- Algorithm: HS256 JWT
- Expiration: 7 days
- Cookie flags: httpOnly, secure (production), sameSite: lax
- Payload: type, storeId, storeName

### Admin Authentication

**Method:** Email + Password
- Email must be in ADMIN_EMAIL_ALLOWLIST
- Password compared against ADMIN_PASSWORD env var
- Same session mechanism as store users

**Allowed Admins:**
- skye.v@metrowirelessplus.com

## Rate Limiting

**Implementation:** In-memory sliding window

| Endpoint | Limit | Window |
|----------|-------|--------|
| Store Login | 5 attempts | 15 minutes |
| Admin Login | 5 attempts | 15 minutes |
| Submissions | 10 requests | 1 minute |

Rate limits are keyed by:
- Login: store name or email
- Submissions: store ID

## Data Protection

### Server-Side Only Secrets

These values are NEVER exposed to the client:

- `SUPABASE_SERVICE_ROLE_KEY` - Full database access
- `SESSION_SECRET` - JWT signing key
- `ADMIN_PASSWORD` - Admin authentication
- `CRAFT_API_TOKEN` - Craft API access
- `CRAFT_API_BASE_URL` - Craft API endpoint

### Client-Safe Values

These are exposed via NEXT_PUBLIC_ prefix:

- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase endpoint
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Limited access key

### PIN Security

1. PINs are hashed using bcrypt before storage
2. Original PIN is never stored or logged
3. PIN comparison uses timing-safe comparison (bcrypt.compare)
4. PIN rotation available via admin interface
5. Old PINs cannot be recovered (one-way hash)

## Row Level Security (RLS)

All Supabase tables have RLS enabled with appropriate policies:

### stores
- SELECT: Anyone (needed for login dropdown)
- ALL: Service role only

### store_auth
- ALL: Service role only (PIN hashes never exposed)

### controls
- SELECT: Anyone (needed for submission form)
- ALL: Service role only

### craft_packet_config
- SELECT: Anyone (needed for sync operations)
- ALL: Service role only

### submissions
- SELECT: Anyone (filtered by session in API)
- INSERT: Anyone (with session validation in API)
- ALL: Service role for admin operations

### audit_log
- SELECT: Anyone (filtered in API for admin only)
- INSERT: Service role only (server-side logging)

## Input Validation

All API inputs are validated using Zod schemas:

- `storeLoginSchema` - Store name, 6-digit PIN
- `adminLoginSchema` - Email format, password required
- `submissionSchema` - Control ID, date, submitter name, notes
- `storePinSchema` - Store UUID, 6-digit PIN
- `craftConfigSchema` - Store UUID, period type, doc ID

## File Upload Security

**Allowed Types:**
- Images: JPEG, PNG, GIF, WebP
- Documents: PDF, TXT, CSV

**Size Limit:** 10MB per file

**Storage:**
- Files stored in Supabase Storage
- Organized by store_id/timestamp-random.ext
- Public URLs for viewing (no sensitive data in files)

## Audit Logging

All security-relevant events are logged:

| Event | Logged Data |
|-------|-------------|
| Store login success | store_id |
| Store login failure | store_id, reason |
| Admin login success | email |
| Admin login failure | email, reason |
| Admin login rate limited | email |
| Logout | session type |
| PIN rotation | store_id, store_name |
| Config change | old/new values |
| Submission review | submission_id |
| Craft sync retry | submission_id, result |

## Security Headers

Next.js provides default security headers. Additional headers configured:

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin

## Deployment Security

### Environment Variables

Required for production:
```
SESSION_SECRET=[Generate unique 32+ char secret]
ADMIN_PASSWORD=[Strong password]
SUPABASE_SERVICE_ROLE_KEY=[From Supabase dashboard]
```

### Vercel Deployment

- Environment variables stored in Vercel dashboard
- Production deployments require manual approval
- Preview deployments use separate Supabase project

## Incident Response

### Suspected Breach

1. Immediately rotate all secrets:
   - SESSION_SECRET (invalidates all sessions)
   - ADMIN_PASSWORD
   - Store PINs (via admin interface)
   - Supabase keys (via Supabase dashboard)

2. Review audit_log for suspicious activity:
   ```sql
   SELECT * FROM audit_log
   WHERE created_at > NOW() - INTERVAL '24 hours'
   ORDER BY created_at DESC;
   ```

3. Disable affected accounts if necessary

4. Notify affected users of PIN changes

### Data Recovery

- Supabase provides point-in-time recovery
- Contact Supabase support for restoration
- Audit logs retained for 90 days by default
