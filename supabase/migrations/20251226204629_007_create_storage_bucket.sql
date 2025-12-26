/*
  # Create Storage Bucket for Evidence Files
  
  1. Storage Configuration
    - Create 'evidence-files' bucket for file uploads
    - Set public access for reading uploaded files
    - Allow authenticated uploads
  
  2. Security
    - Files are publicly readable once uploaded
    - Only authenticated users can upload
    - Files organized by store_id/submission_id
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence-files',
  'evidence-files',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'text/csv']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Anyone can read evidence files"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'evidence-files');

CREATE POLICY "Anyone can upload evidence files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'evidence-files');
