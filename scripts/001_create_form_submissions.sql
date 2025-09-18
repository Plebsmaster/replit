-- Create form submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Form preferences
  style TEXT CHECK (style IN ('elegant', 'modern', '')),
  text_color TEXT CHECK (text_color IN ('black', 'white', '')),
  color_palette TEXT,
  color_mode TEXT CHECK (color_mode IN ('variation', 'uniform')),
  
  -- Ingredients (stored as JSON array)
  ingredients JSONB DEFAULT '[]'::jsonb,
  
  -- Product colors (stored as JSON object)
  product_colors JSONB DEFAULT '{}'::jsonb,
  
  -- Consent and preferences
  agree_terms BOOLEAN DEFAULT false,
  subscribe_newsletter BOOLEAN DEFAULT false
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for form submissions)
-- Note: This is a public form, so we allow anonymous submissions
CREATE POLICY "Allow anonymous form submissions" ON public.form_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading own submissions (if we add auth later)
CREATE POLICY "Allow reading all submissions" ON public.form_submissions
  FOR SELECT 
  USING (true);
