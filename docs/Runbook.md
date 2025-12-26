# Compliance Evidence Portal - Operations Runbook

## Weekly Operations

### Monday Morning Review
1. Login to admin dashboard at /admin
2. Check "Sync Failed" count in dashboard stats
3. If any failed syncs:
   - Click "Retry All Failed" button
   - Wait for retry operations to complete
   - Note any persistent failures for manual investigation
4. Review "Pending Review" submissions from previous week
5. Mark legitimate submissions as "Reviewed"

### Weekly Control Check (CASH-02, INV-01)
Expected submissions per week:
- Each store should have at least one CASH-02 (Refund approvals)
- Each store should have at least one INV-01 (Cycle count)

If missing:
1. Contact store manager to follow up
2. Submission can be backdated if evidence exists

## Monthly Operations

### First Week of Month
1. Review previous month's monthly controls:
   - CASH-01 (Safe count)
   - OPS-01 (Open/Close checklist)
   - TRN-01 (Onboarding - only if new hires)
2. Check each store has submitted required monthly controls
3. Verify Craft documents have received synced content

### Monthly Report Generation
1. Filter dashboard by previous month's period key
2. Export or screenshot submission counts per store
3. Note any missing submissions or persistent sync failures

## Troubleshooting

### Sync Failures

**Symptom:** Submission shows "Sync Failed" status

**Causes and Solutions:**

1. **Craft API not configured**
   - Check environment variables CRAFT_API_BASE_URL and CRAFT_API_TOKEN
   - Verify Craft workspace ID is correct
   - Test API connectivity manually

2. **Document structure missing**
   - Portal will auto-create "## Portal submissions" section
   - Portal will auto-create "### CONTROL_ID" headings
   - If still failing, manually add these sections to Craft document

3. **Rate limiting**
   - Wait 1 hour and retry
   - Avoid bulk retries during peak Craft usage

4. **Invalid document ID**
   - Go to /admin/dashboard/config
   - Verify Craft doc IDs are correct for store/period
   - Update if necessary

**Manual Sync Recovery:**
If automated sync continues to fail:
1. Open submission detail page
2. Copy the formatted content from notes
3. Manually paste into correct Craft document
4. Mark submission as reviewed
5. Note in audit log that manual sync was performed

### Authentication Issues

**Store User Can't Login**

1. Verify store exists in database
2. Check store_auth table has PIN hash for store
3. Ask admin to reset PIN via config page
4. Ensure user is entering correct 6-digit PIN (numbers only)

**Admin Can't Login**

1. Verify email is in ADMIN_EMAIL_ALLOWLIST env var
2. Verify ADMIN_PASSWORD env var is set
3. Check for rate limiting (wait 15 minutes)
4. Check server logs for specific error

### Missing Submissions

1. Check submission date - might be filtered out
2. Verify correct store was selected during submission
3. Check audit_log for submission_created events
4. If submission exists but not visible, check RLS policies

## Emergency Procedures

### Database Connection Issues
1. Check Supabase dashboard for service status
2. Verify SUPABASE_URL and keys in environment
3. Contact Supabase support if service is down

### Complete System Outage
1. Store submissions can be collected manually (paper/photo)
2. Once system restored, backdate submissions
3. Manually sync to Craft if sync queue is backed up

## Contact Information

- System Admin: [Your IT Contact]
- Supabase Support: support@supabase.io
- Craft Support: support@craft.do

## Scheduled Maintenance

- Database backups: Automatic via Supabase
- Log retention: 90 days
- Session cleanup: Automatic (7-day expiry)
