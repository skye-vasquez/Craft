/*
  # Update Craft Document IDs for Crystal River
  
  1. Changes
    - Updates Crystal River weekly document ID to actual Craft document ID
    - Updates Crystal River monthly document ID to actual Craft document ID
  
  2. Notes
    - IDs obtained from Craft API sample documents
    - Weekly: 042af80a-43d8-270f-f7bc-16e7504221fe (2025-W52 packet)
    - Monthly: e71ceb79-ba99-4ef0-0eb0-50e376d5ef91 (2025-12 packet)
*/

UPDATE craft_packet_config
SET craft_doc_id = '042af80a-43d8-270f-f7bc-16e7504221fe',
    updated_at = now()
WHERE store_id = (SELECT id FROM stores WHERE name = 'Crystal River')
  AND period_type = 'weekly';

UPDATE craft_packet_config
SET craft_doc_id = 'e71ceb79-ba99-4ef0-0eb0-50e376d5ef91',
    updated_at = now()
WHERE store_id = (SELECT id FROM stores WHERE name = 'Crystal River')
  AND period_type = 'monthly';
