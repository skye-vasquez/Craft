/*
  # Create Stores Table
  
  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Store name identifier
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `stores` table
    - Add policy for authenticated users to read stores
    - Add policy for service role to manage stores
  
  3. Seed Data
    - 6 Metro Wireless Plus store locations
*/

CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stores"
  ON stores
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage stores"
  ON stores
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

INSERT INTO stores (name) VALUES
  ('Archer'),
  ('Newberry'),
  ('Chiefland'),
  ('Inverness'),
  ('Homosassa'),
  ('Crystal River')
ON CONFLICT (name) DO NOTHING;
