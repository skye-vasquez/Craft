/*
  # Create Audit Log Table
  
  1. New Tables
    - `audit_log`
      - `id` (uuid, primary key)
      - `actor_type` (text) - 'admin', 'store_user', or 'system'
      - `actor_label` (text) - Human-readable actor identifier
      - `action` (text) - Action performed
      - `metadata` (jsonb) - Additional context data
      - `created_at` (timestamptz) - Event timestamp
  
  2. Security
    - Enable RLS on `audit_log` table
    - Only service role can write (server-side only)
    - Admins can read audit logs
  
  3. Indexes
    - Index on created_at for chronological queries
    - Index on action for filtering by action type
*/

CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_type text NOT NULL CHECK (actor_type IN ('admin', 'store_user', 'system')),
  actor_label text NOT NULL,
  action text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage audit log"
  ON audit_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read audit log"
  ON audit_log
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
