-- Create storage bucket for media if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to media bucket
CREATE POLICY "Public can view media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

-- Create policy for authenticated users to upload media
CREATE POLICY "Authenticated users can upload media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to update media
CREATE POLICY "Authenticated users can update media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to delete media
CREATE POLICY "Authenticated users can delete media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');