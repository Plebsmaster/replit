-- Create function to handle form submission with proper transaction logic
CREATE OR REPLACE FUNCTION handle_form_submission(
    p_email TEXT,
    p_first_name TEXT,
    p_last_name TEXT,
    p_phone TEXT,
    p_design_data JSONB,
    p_schema_version INTEGER
) RETURNS JSONB AS $$
DECLARE
    v_client_id UUID;
    v_existing_status TEXT;
    v_result JSONB;
BEGIN
    -- Step 1: Upsert client
    INSERT INTO clients (email, first_name, last_name, phone)
    VALUES (p_email, p_first_name, p_last_name, p_phone)
    ON CONFLICT (email) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        updated_at = NOW()
    RETURNING id INTO v_client_id;

    -- Step 2: Check if design is locked
    SELECT status INTO v_existing_status
    FROM design_responses
    WHERE client_id = v_client_id;

    IF v_existing_status = 'locked' THEN
        RAISE EXCEPTION 'Design is locked. Contact support.';
    END IF;

    -- Step 3: Snapshot existing design to history (if exists)
    INSERT INTO design_responses_history (client_id, data, status, schema_version, version_created_at)
    SELECT client_id, data, status, schema_version, updated_at
    FROM design_responses
    WHERE client_id = v_client_id;

    -- Step 4: Upsert current design response
    INSERT INTO design_responses (client_id, data, status, schema_version)
    VALUES (v_client_id, p_design_data, 'editable', p_schema_version)
    ON CONFLICT (client_id) DO UPDATE SET
        data = EXCLUDED.data,
        status = 'editable',
        schema_version = EXCLUDED.schema_version,
        updated_at = NOW();

    -- Return success result
    v_result := jsonb_build_object(
        'client_id', v_client_id,
        'status', 'success',
        'message', 'Design saved successfully'
    );

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION handle_form_submission TO authenticated, anon;
