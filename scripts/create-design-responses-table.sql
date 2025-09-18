-- Create design_responses table for current client designs
CREATE TABLE IF NOT EXISTS design_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'editable' CHECK (status IN ('editable', 'locked')),
    schema_version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint - one current design per client
CREATE UNIQUE INDEX IF NOT EXISTS idx_design_responses_client_id ON design_responses(client_id);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_design_responses_status ON design_responses(status);

-- Enable RLS
ALTER TABLE design_responses ENABLE ROW LEVEL SECURITY;

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_design_responses_updated_at 
    BEFORE UPDATE ON design_responses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
