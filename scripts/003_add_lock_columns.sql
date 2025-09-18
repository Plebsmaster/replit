-- Add is_locked column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;

-- Add is_locked column to form_submissions table  
ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;

-- Create index for faster queries on lock status
CREATE INDEX IF NOT EXISTS idx_clients_is_locked ON clients(is_locked);
CREATE INDEX IF NOT EXISTS idx_form_submissions_is_locked ON form_submissions(is_locked);

-- Update the form submission handler to check for lock status
CREATE OR REPLACE FUNCTION handle_form_submission(
    p_email TEXT,
    p_first_name TEXT,
    p_last_name TEXT,
    p_phone TEXT,
    p_design_data JSONB,
    p_schema_version INTEGER DEFAULT 1
) RETURNS JSONB AS $$
DECLARE
    v_client_id UUID;
    v_existing_status TEXT;
    v_result JSONB;
    v_is_locked BOOLEAN;
BEGIN
    -- Check if client exists and get lock status
    SELECT id, is_locked INTO v_client_id, v_is_locked
    FROM clients 
    WHERE email = p_email;
    
    -- If client doesn't exist, create one
    IF v_client_id IS NULL THEN
        INSERT INTO clients (email, first_name, last_name, phone, is_locked)
        VALUES (p_email, p_first_name, p_last_name, p_phone, FALSE)
        RETURNING id, is_locked INTO v_client_id, v_is_locked;
    END IF;
    
    -- Check if client is locked
    IF v_is_locked THEN
        RAISE EXCEPTION 'Design is locked. Contact support.';
    END IF;
    
    -- Check if there's an existing design response and its status
    SELECT status INTO v_existing_status
    FROM design_responses 
    WHERE client_id = v_client_id;
    
    -- If design response exists and is locked, prevent updates
    IF v_existing_status = 'locked' THEN
        RAISE EXCEPTION 'Design is locked. Contact support.';
    END IF;
    
    -- Insert or update design response
    INSERT INTO design_responses (client_id, data, status, schema_version)
    VALUES (v_client_id, p_design_data, 'editable', p_schema_version)
    ON CONFLICT (client_id) 
    DO UPDATE SET 
        data = p_design_data,
        schema_version = p_schema_version,
        updated_at = NOW()
    WHERE design_responses.status != 'locked';
    
    -- Return success result
    v_result := jsonb_build_object(
        'client_id', v_client_id,
        'status', 'success',
        'message', 'Form submitted successfully'
    );
    
    RETURN v_result;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Return error result
        v_result := jsonb_build_object(
            'status', 'error',
            'message', SQLERRM
        );
        RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
