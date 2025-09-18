-- Restore admin@salonid.com user to admin_users table
INSERT INTO admin_users (
  id,
  email,
  is_active,
  created_at,
  updated_at,
  created_by
) VALUES (
  gen_random_uuid(),
  'admin@salonid.com',
  true,
  now(),
  now(),
  gen_random_uuid()
);
