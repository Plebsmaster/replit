-- Updated email_events table to match specification with client_id, type, and meta fields
create table if not exists email_events (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  client_id uuid,
  type text not null,  -- 'otp_sent' | 'otp_failed'
  meta jsonb,
  created_at timestamptz default now()
);

-- Create index for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_email_events_email_created ON email_events(email, created_at);
