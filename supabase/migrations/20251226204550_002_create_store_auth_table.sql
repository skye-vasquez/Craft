/*
  # Create Store Auth Table
  
  1. New Tables
    - `store_auth`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `pin_hash` (text) - bcrypt hashed 6-digit PIN
      - `updated_at` (timestamptz) - Last PIN update timestamp
  
  2. Security
    - Enable RLS on `store_auth` table
    - Only service role can access PIN hashes (for server-side auth)
  
  3. Notes
    - One PIN per store for employee authentication
    - PINs are hashed using bcrypt for security
*/

CREATE TABLE IF NOT EXISTS store_auth (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE UNIQUE NOT NULL,
  pin_hash text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE store_auth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage store auth"
  ON store_auth
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
