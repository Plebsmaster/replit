-- Create clients table to store known clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Insert some sample clients for testing (you can remove this later)
INSERT INTO clients (email, first_name, last_name) VALUES 
('john@example.com', 'John', 'Doe'),
('jane@example.com', 'Jane', 'Smith')
ON CONFLICT (email) DO NOTHING;
