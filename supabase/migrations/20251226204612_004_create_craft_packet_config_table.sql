/*
  # Create Craft Packet Config Table
  
  1. New Tables
    - `craft_packet_config`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `period_type` (text) - 'weekly' or 'monthly'
      - `craft_doc_id` (text) - Craft document root block ID
      - `updated_at` (timestamptz) - Last config update timestamp
  
  2. Security
    - Enable RLS on `craft_packet_config` table
    - Service role can manage config
    - Authenticated users can read config for their operations
  
  3. Seed Data
    - Pre-configured Craft document IDs for all 6 stores
    - Weekly: 406, 408, 410, 412, 414, 416
    - Monthly: 407, 409, 411, 413, 415, 417
*/

CREATE TABLE IF NOT EXISTS craft_packet_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  craft_doc_id text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(store_id, period_type)
);

ALTER TABLE craft_packet_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read craft config"
  ON craft_packet_config
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage craft config"
  ON craft_packet_config
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

INSERT INTO craft_packet_config (store_id, period_type, craft_doc_id)
SELECT s.id, 'weekly', 
  CASE s.name 
    WHEN 'Archer' THEN '406'
    WHEN 'Newberry' THEN '408'
    WHEN 'Chiefland' THEN '410'
    WHEN 'Inverness' THEN '412'
    WHEN 'Homosassa' THEN '414'
    WHEN 'Crystal River' THEN '416'
  END
FROM stores s
ON CONFLICT (store_id, period_type) DO NOTHING;

INSERT INTO craft_packet_config (store_id, period_type, craft_doc_id)
SELECT s.id, 'monthly', 
  CASE s.name 
    WHEN 'Archer' THEN '407'
    WHEN 'Newberry' THEN '409'
    WHEN 'Chiefland' THEN '411'
    WHEN 'Inverness' THEN '413'
    WHEN 'Homosassa' THEN '415'
    WHEN 'Crystal River' THEN '417'
  END
FROM stores s
ON CONFLICT (store_id, period_type) DO NOTHING;
