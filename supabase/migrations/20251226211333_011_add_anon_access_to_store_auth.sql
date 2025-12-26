/*
  # Add Anon Access to Store Auth
  
  1. Changes
    - Add RLS policy to allow anon role to SELECT from store_auth
    - Required for store login functionality to work with anon key
  
  2. Security
    - Only allows SELECT (read) operations
    - Store PIN hashes need to be readable for authentication
    - PIN hashes are bcrypt hashes, safe to read for comparison
*/

CREATE POLICY "Allow anon to read store auth for login"
  ON store_auth
  FOR SELECT
  TO anon
  USING (true);
