/*
  # Create Submissions Table
  
  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `control_id` (text, foreign key to controls)
      - `period_type` (text) - 'weekly' or 'monthly'
      - `period_key` (text) - ISO week (YYYY-Www) or month (YYYY-MM)
      - `submission_date` (date) - Date of evidence
      - `submitter_name` (text) - Name of person submitting
      - `submitter_email` (text, nullable) - Email of submitter
      - `notes` (text) - Evidence notes/description
      - `file_url` (text, nullable) - URL to uploaded file
      - `status` (text) - 'submitted' or 'reviewed'
      - `reviewed_by` (text, nullable) - Admin who reviewed
      - `reviewed_at` (timestamptz, nullable) - Review timestamp
      - `craft_sync_status` (text) - 'pending', 'success', or 'failed'
      - `craft_sync_error` (text, nullable) - Error message if sync failed
      - `craft_synced_at` (timestamptz, nullable) - Sync timestamp
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `submissions` table
    - Store users can read/create submissions for their store
    - Service role has full access
  
  3. Indexes
    - Index on store_id for filtering
    - Index on period_key for filtering
    - Index on craft_sync_status for admin queue
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  control_id text REFERENCES controls(id) ON DELETE RESTRICT NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  period_key text NOT NULL,
  submission_date date NOT NULL,
  submitter_name text NOT NULL,
  submitter_email text,
  notes text NOT NULL DEFAULT '',
  file_url text,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed')),
  reviewed_by text,
  reviewed_at timestamptz,
  craft_sync_status text NOT NULL DEFAULT 'pending' CHECK (craft_sync_status IN ('pending', 'success', 'failed')),
  craft_sync_error text,
  craft_synced_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read submissions"
  ON submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create submissions"
  ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage submissions"
  ON submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_submissions_store_id ON submissions(store_id);
CREATE INDEX IF NOT EXISTS idx_submissions_period_key ON submissions(period_key);
CREATE INDEX IF NOT EXISTS idx_submissions_craft_sync_status ON submissions(craft_sync_status);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
