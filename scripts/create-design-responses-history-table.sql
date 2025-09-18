-- Create design_responses_history table for audit trail
CREATE TABLE IF NOT EXISTS design_responses_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('editable', 'locked')),
    schema_version INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Store when this was the current version (from design_responses.updated_at)
    version_created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_design_responses_history_client_id ON design_responses_history(client_id);
CREATE INDEX IF NOT EXISTS idx_design_responses_history_created_at ON design_responses_history(created_at);
CREATE INDEX IF NOT EXISTS idx_design_responses_history_version_created_at ON design_responses_history(version_created_at);

-- Enable RLS
ALTER TABLE design_responses_history ENABLE ROW LEVEL SECURITY;
