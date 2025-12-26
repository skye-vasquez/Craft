/*
  # Fix Store PIN Hashes
  
  1. Changes
    - Updates all store PIN hashes with valid bcrypt hash for "123456"
    - Previous migration had invalid placeholder hash
  
  2. Notes
    - Valid bcrypt hash for PIN: 123456
    - Cost factor: 10
    - Admin should rotate these after deployment
*/

UPDATE store_auth
SET pin_hash = '$2a$10$m2PNSuTyKQD0Uz1idcj81.meIab1MG2Q7nWT4lAGTh1G7Hf52eLk6',
    updated_at = now();
