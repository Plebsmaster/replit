-- Add client management features to form_submissions table
ALTER TABLE form_submissions 
ADD COLUMN is_active BOOLEAN DEFAULT false,
ADD COLUMN is_locked BOOLEAN DEFAULT false,
ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index on email for faster client lookups
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);

-- Create index on active submissions per email
CREATE INDEX IF NOT EXISTS idx_form_submissions_email_active ON form_submissions(email, is_active) WHERE is_active = true;

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_form_submissions_updated_at 
    BEFORE UPDATE ON form_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraint to ensure only one active submission per email
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_per_email 
ON form_submissions(email) 
WHERE is_active = true;

-- Add RLS policies for client access
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow clients to view their own submissions
CREATE POLICY "Users can view own submissions" ON form_submissions
    FOR SELECT USING (true); -- Allow all for now, will be refined with auth

-- Policy: Allow clients to update their own submissions (set active status)
CREATE POLICY "Users can update own submissions" ON form_submissions
    FOR UPDATE USING (is_locked = false); -- Only if not locked

-- Policy: Allow inserting new submissions
CREATE POLICY "Allow insert submissions" ON form_submissions
    FOR INSERT WITH CHECK (true);
