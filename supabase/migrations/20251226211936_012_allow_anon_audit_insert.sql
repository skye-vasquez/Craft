/*
  # Allow Anon to Insert Audit Logs
  
  1. Changes
    - Add RLS policy to allow anon role to INSERT into audit_log
    - Required for store login audit logging when using anon key
  
  2. Security
    - Only allows INSERT operations
    - Audit logging needs to work even without service role key
    - For production, use service role key instead
*/

CREATE POLICY "Allow anon to insert audit logs"
  ON audit_log
  FOR INSERT
  TO anon
  WITH CHECK (true);
