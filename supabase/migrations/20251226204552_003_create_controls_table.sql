/*
  # Create Controls Table
  
  1. New Tables
    - `controls`
      - `id` (text, primary key) - Control code like CASH-01
      - `name` (text) - Human-readable control name
      - `period_type` (text) - 'weekly' or 'monthly'
      - `is_active` (boolean) - Whether control is currently active
      - `display_order` (int) - Order for UI display
  
  2. Security
    - Enable RLS on `controls` table
    - Anyone can read active controls
    - Service role can manage controls
  
  3. Seed Data
    - 5 MVP compliance controls
*/

CREATE TABLE IF NOT EXISTS controls (
  id text PRIMARY KEY,
  name text NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  is_active boolean DEFAULT true,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read controls"
  ON controls
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage controls"
  ON controls
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

INSERT INTO controls (id, name, period_type, display_order) VALUES
  ('CASH-01', 'Safe count vs POS close proof', 'monthly', 1),
  ('CASH-02', 'Refund approvals review', 'weekly', 2),
  ('INV-01', 'Cycle count completed + variance notes', 'weekly', 3),
  ('OPS-01', 'Open/Close checklist proof', 'monthly', 4),
  ('TRN-01', 'Onboarding proof if hires', 'monthly', 5)
ON CONFLICT (id) DO NOTHING;
