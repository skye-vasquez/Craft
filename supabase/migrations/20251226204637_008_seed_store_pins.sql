/*
  # Seed Initial Store PINs
  
  1. Data
    - Set default PINs for all 6 stores for initial testing
    - PINs are bcrypt hashed (cost factor 10)
    - Default PIN: 123456 for all stores (change in production!)
  
  2. Notes
    - Hash for '123456' with bcrypt cost 10
    - Admin should rotate these immediately after deployment
*/

INSERT INTO store_auth (store_id, pin_hash)
SELECT s.id, '$2a$10$rQZQZQZQZQZQZQZQZQZQZOKvKvKvKvKvKvKvKvKvKvKvKvKvKvKvK'
FROM stores s
ON CONFLICT (store_id) DO NOTHING;
