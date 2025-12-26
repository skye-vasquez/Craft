# Compliance Evidence Portal - Product Requirements Document

## Overview

The Compliance Evidence Portal is a full-stack web application that enables Metro Wireless Plus store employees to submit compliance evidence, which is then synchronized to Craft documents for centralized compliance management.

## User Roles

### Store User (Employee/Manager)
- Authenticates using store selection + 6-digit PIN
- Can submit evidence for their store only
- Can view submission history for their store
- Cannot access other stores' data or admin functions

### Admin (Skye)
- Authenticates using email/password
- Allowed email: skye.v@metrowirelessplus.com
- Can view all submissions across all stores
- Can mark submissions as reviewed
- Can retry failed Craft sync operations
- Can manage store PINs and Craft document mappings
- Can activate/deactivate controls

## Stores

The system supports 6 Metro Wireless Plus locations:
- Archer
- Newberry
- Chiefland
- Inverness
- Homosassa
- Crystal River

## Controls

Five compliance controls are tracked:

| Control ID | Name | Period |
|------------|------|--------|
| CASH-01 | Safe count vs POS close proof | Monthly |
| CASH-02 | Refund approvals review | Weekly |
| INV-01 | Cycle count completed + variance notes | Weekly |
| OPS-01 | Open/Close checklist proof | Monthly |
| TRN-01 | Onboarding proof if hires | Monthly |

## User Flows

### Store User: Submit Evidence
1. Navigate to /login
2. Select store from dropdown
3. Enter 6-digit store PIN
4. On successful login, redirected to /submit
5. Select control type (filtered by weekly/monthly)
6. Enter date (defaults to today)
7. Enter submitter name (required)
8. Enter email (optional)
9. Enter notes OR upload file (at least one required)
10. Click Submit
11. View success confirmation with submission ID and sync status
12. Option to "Submit Another" or view history

### Store User: View History
1. Navigate to /history
2. View list of all submissions for current store
3. Click any submission to view details in modal
4. See status (Submitted/Reviewed) and sync status

### Admin: Review Submissions
1. Navigate to /admin
2. Login with authorized email and password
3. View dashboard with submission statistics
4. Filter by store, control, status, sync status
5. Click eye icon to view submission details
6. Click checkmark to mark as reviewed
7. Click refresh icon to retry failed syncs
8. Bulk retry all failed syncs if needed

### Admin: Manage Configuration
1. Navigate to /admin/dashboard/config
2. Store PINs: Select store, generate or enter new 6-digit PIN, save
3. Craft Mapping: Edit weekly/monthly document IDs for any store
4. Controls: Activate or deactivate controls

## Acceptance Criteria

### Authentication
- [ ] Store users can login with correct store + PIN combination
- [ ] Invalid credentials show clear error message
- [ ] Rate limiting blocks after 5 failed attempts (15 min window)
- [ ] Admin can login with allowlisted email + correct password
- [ ] Sessions expire after 7 days
- [ ] Logout clears session completely

### Submissions
- [ ] Submission requires either notes OR file (or both)
- [ ] Files upload to Supabase Storage successfully
- [ ] Period key calculated correctly (YYYY-Www for weekly, YYYY-MM for monthly)
- [ ] Submissions trigger Craft sync attempt
- [ ] Failed syncs marked with error message
- [ ] Store users only see their own store's submissions

### Admin Functions
- [ ] Admin dashboard shows accurate statistics
- [ ] Filters work correctly in combination
- [ ] Review action updates status and records reviewer
- [ ] Retry sync updates status appropriately
- [ ] PIN changes take effect immediately
- [ ] Craft config changes take effect for new submissions
- [ ] Control activation/deactivation affects submission form

### Audit Trail
- [ ] Login attempts logged (success and failure)
- [ ] PIN changes logged with admin identity
- [ ] Config changes logged with before/after values
- [ ] Reviews logged with reviewer identity
- [ ] Sync retries logged with results

## Technical Requirements

- Mobile-first responsive design
- Sub-3-second page load times
- Works offline for viewing (submissions require connection)
- All sensitive operations server-side only
- No secrets exposed to client
