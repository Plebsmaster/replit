-- Create admin_users table to manage admin access
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  is_active BOOLEAN DEFAULT true
);

-- Create RLS policies for admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only service role can access admin_users table
CREATE POLICY "Service role can manage admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Insert the first admin user (replace with your email)
INSERT INTO admin_users (email, created_by) 
VALUES ('admin@salonid.com', NULL)
ON CONFLICT (email) DO NOTHING;
