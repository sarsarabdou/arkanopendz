-- Fix critical security vulnerability: Restrict access to sensitive business data

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can create admin settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Anyone can delete admin settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Anyone can update admin settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Anyone can view admin settings" ON public.admin_settings;

DROP POLICY IF EXISTS "Anyone can create quotes" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can delete quotes" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can update quotes" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can view quotes" ON public.quotes;

DROP POLICY IF EXISTS "Anyone can create discount requests" ON public.discount_requests;
DROP POLICY IF EXISTS "Anyone can delete discount requests" ON public.discount_requests;
DROP POLICY IF EXISTS "Anyone can update discount requests" ON public.discount_requests;
DROP POLICY IF EXISTS "Anyone can view discount requests" ON public.discount_requests;

DROP POLICY IF EXISTS "Anyone can create product configs" ON public.product_configs;
DROP POLICY IF EXISTS "Anyone can delete product configs" ON public.product_configs;
DROP POLICY IF EXISTS "Anyone can update product configs" ON public.product_configs;
DROP POLICY IF EXISTS "Anyone can view product configs" ON public.product_configs;

-- Create secure policies for admin_settings (admin-only access)
CREATE POLICY "Block all access to admin settings until auth is implemented" 
ON public.admin_settings 
FOR ALL 
USING (false) 
WITH CHECK (false);

-- Create secure policies for product_configs (admin-only access)
CREATE POLICY "Block all access to product configs until auth is implemented" 
ON public.product_configs 
FOR ALL 
USING (false) 
WITH CHECK (false);

-- Create secure policies for quotes (public creation, restricted modification)
CREATE POLICY "Public can create quotes" 
ON public.quotes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view quotes" 
ON public.quotes 
FOR SELECT 
USING (true);

CREATE POLICY "Block quote modifications until auth is implemented" 
ON public.quotes 
FOR UPDATE 
USING (false);

CREATE POLICY "Block quote deletions until auth is implemented" 
ON public.quotes 
FOR DELETE 
USING (false);

-- Create secure policies for discount_requests (public creation, restricted modification)
CREATE POLICY "Public can create discount requests" 
ON public.discount_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view discount requests" 
ON public.discount_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Block discount request modifications until auth is implemented" 
ON public.discount_requests 
FOR UPDATE 
USING (false);

CREATE POLICY "Block discount request deletions until auth is implemented" 
ON public.discount_requests 
FOR DELETE 
USING (false);