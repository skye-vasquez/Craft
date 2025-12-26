# Compliance Evidence Portal

A full-stack compliance evidence management system for Metro Wireless Plus stores with Neobrutalism UI design.

## Features

- **Store User Portal**: Submit compliance evidence with notes and file attachments
- **Admin Dashboard**: Review submissions, manage configurations, retry failed syncs
- **Craft Integration**: Automatic sync of submissions to Craft documents
- **Neobrutalism UI**: Bold, playful design with thick borders and hard shadows
- **Mobile-First**: Optimized for fast, touch-friendly mobile usage

## Tech Stack

- **Framework**: Next.js 14+ App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Neobrutalism design system
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for file uploads
- **Validation**: Zod
- **Authentication**: JWT sessions with HTTP-only cookies

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase - Client-side (safe to expose)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase - Server-side only (keep secret)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Session
SESSION_SECRET=your-secure-random-string-32-chars-minimum

# Admin Configuration
ADMIN_EMAIL_ALLOWLIST=skye.v@metrowirelessplus.com
ADMIN_PASSWORD=your-secure-admin-password

# Craft API (server-side only)
CRAFT_API_BASE_URL=your-craft-api-url
CRAFT_API_TOKEN=your-craft-api-token
CRAFT_WORKSPACE_ID=your-workspace-id

# Storage
SUPABASE_STORAGE_BUCKET=evidence-files
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Setup

The application uses Supabase migrations. The migrations are applied automatically through the Supabase MCP tools. Tables created:

- `stores` - Store locations
- `store_auth` - PIN authentication hashes
- `controls` - Compliance control definitions
- `craft_packet_config` - Craft document ID mappings
- `submissions` - Evidence submissions
- `audit_log` - Security and action audit trail

### Storage Setup

A Supabase Storage bucket named `evidence-files` is created automatically with the following settings:
- Public read access
- 10MB file size limit
- Allowed types: JPEG, PNG, GIF, WebP, PDF, TXT, CSV

## User Roles

### Store User
- Login: Select store + enter 6-digit PIN
- Access: Submit evidence, view own store's history
- Default PIN: `123456` (change after deployment!)

### Admin
- Login: Email + password
- Allowed email: skye.v@metrowirelessplus.com
- Access: Full dashboard, all stores, configuration

## Controls

| ID | Name | Period |
|----|------|--------|
| CASH-01 | Safe count vs POS close proof | Monthly |
| CASH-02 | Refund approvals review | Weekly |
| INV-01 | Cycle count completed + variance notes | Weekly |
| OPS-01 | Open/Close checklist proof | Monthly |
| TRN-01 | Onboarding proof if hires | Monthly |

## Stores

- Archer
- Newberry
- Chiefland
- Inverness
- Homosassa
- Crystal River

## Craft Document Mapping

Pre-configured Craft document IDs:

| Store | Weekly | Monthly |
|-------|--------|---------|
| Archer | 406 | 407 |
| Newberry | 408 | 409 |
| Chiefland | 410 | 411 |
| Inverness | 412 | 413 |
| Homosassa | 414 | 415 |
| Crystal River | 416 | 417 |

## API Endpoints

### Authentication
- `POST /api/auth/store-login` - Store PIN authentication
- `POST /api/auth/admin-login` - Admin authentication
- `POST /api/auth/logout` - Clear session
- `GET /api/me` - Current session info

### Data
- `GET /api/stores` - List all stores
- `GET /api/controls` - List active controls
- `GET /api/submissions` - List submissions (filtered by role)
- `POST /api/submissions` - Create submission
- `GET /api/submissions/:id` - Submission detail
- `PATCH /api/submissions/:id/review` - Mark as reviewed
- `POST /api/submissions/:id/retry-sync` - Retry Craft sync

### Admin
- `POST /api/admin/store-pin` - Update store PIN
- `GET /api/admin/craft-config` - Get Craft mappings
- `POST /api/admin/craft-config` - Update Craft mapping
- `GET /api/admin/controls` - List all controls
- `PATCH /api/admin/controls` - Toggle control active status

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

The application is optimized for Vercel's serverless environment with automatic static optimization where possible.

## Documentation

- `/docs/PRD.md` - Product requirements and acceptance criteria
- `/docs/Runbook.md` - Operational procedures and troubleshooting
- `/docs/Security.md` - Security architecture and considerations

## Security Features

- PIN hashing with bcrypt (cost factor 10)
- JWT sessions with HTTP-only cookies
- Rate limiting on authentication endpoints
- Server-side only secrets (Craft API, admin password)
- Row Level Security (RLS) on all database tables
- Audit logging for all security-relevant actions

## License

Private - Metro Wireless Plus
