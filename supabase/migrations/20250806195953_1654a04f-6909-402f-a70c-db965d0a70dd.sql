-- Create comprehensive database structure for ARKAN Open website

-- Site content management
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  page TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Site colors management
CREATE TABLE public.site_colors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  color_name TEXT NOT NULL,
  color_value TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'primary',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products management
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  advantages_fr TEXT[] DEFAULT '{}',
  advantages_ar TEXT[] DEFAULT '{}',
  applications_fr TEXT[] DEFAULT '{}',
  applications_ar TEXT[] DEFAULT '{}',
  region_restriction TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects management
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  completion_date DATE,
  description_fr TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  client_testimonial_fr TEXT,
  client_testimonial_ar TEXT,
  client_name TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Social links management
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Media library
CREATE TABLE public.media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text_fr TEXT,
  alt_text_ar TEXT,
  description_fr TEXT,
  description_ar TEXT,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin settings
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL,
  setting_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quotes system
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_full_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_address TEXT NOT NULL,
  products JSONB NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Discount requests
CREATE TABLE public.discount_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  product_quantity INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product configurations
CREATE TABLE public.product_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL,
  config_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for all tables
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_configs ENABLE ROW LEVEL SECURITY;

-- Public read access for most content
CREATE POLICY "Public can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public can view site colors" ON public.site_colors FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view social links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public can view media library" ON public.media_library FOR SELECT USING (true);

-- Admin access for content management
CREATE POLICY "Admin can manage site content" ON public.site_content FOR ALL USING (true);
CREATE POLICY "Admin can manage site colors" ON public.site_colors FOR ALL USING (true);
CREATE POLICY "Admin can manage products" ON public.products FOR ALL USING (true);
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Admin can manage social links" ON public.social_links FOR ALL USING (true);
CREATE POLICY "Admin can manage media library" ON public.media_library FOR ALL USING (true);

-- Anyone can create/manage quotes and requests
CREATE POLICY "Anyone can view admin settings" ON public.admin_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can create admin settings" ON public.admin_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update admin settings" ON public.admin_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete admin settings" ON public.admin_settings FOR DELETE USING (true);

CREATE POLICY "Anyone can view quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Anyone can create quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update quotes" ON public.quotes FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete quotes" ON public.quotes FOR DELETE USING (true);

CREATE POLICY "Anyone can view discount requests" ON public.discount_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can create discount requests" ON public.discount_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update discount requests" ON public.discount_requests FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete discount requests" ON public.discount_requests FOR DELETE USING (true);

CREATE POLICY "Anyone can view product configs" ON public.product_configs FOR SELECT USING (true);
CREATE POLICY "Anyone can create product configs" ON public.product_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update product configs" ON public.product_configs FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete product configs" ON public.product_configs FOR DELETE USING (true);

-- Create trigger for updating timestamps
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_colors_updated_at
  BEFORE UPDATE ON public.site_colors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discount_requests_updated_at
  BEFORE UPDATE ON public.discount_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_configs_updated_at
  BEFORE UPDATE ON public.product_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial ARKAN Open brand colors
INSERT INTO public.site_colors (color_name, color_value, category) VALUES
('primary', '#1a365d', 'primary'),
('secondary', '#3182ce', 'primary'),
('accent', '#4299e1', 'primary'),
('success', '#38a169', 'status'),
('warning', '#d69e2e', 'status'),
('error', '#e53e3e', 'status'),
('text-primary', '#2d3748', 'text'),
('text-secondary', '#718096', 'text'),
('background', '#f7fafc', 'background'),
('white', '#ffffff', 'background'),
('border', '#e2e8f0', 'border');

-- Insert initial social links
INSERT INTO public.social_links (platform, url, icon, is_active, sort_order) VALUES
('facebook', 'https://facebook.com/arkanopen', 'Facebook', true, 1),
('instagram', 'https://instagram.com/arkanopen', 'Instagram', true, 2),
('tiktok', 'https://tiktok.com/@arkanopen', 'TikTok', true, 3),
('youtube', 'https://youtube.com/@arkanopen', 'Youtube', true, 4),
('linkedin', 'https://linkedin.com/company/arkanopen', 'Linkedin', true, 5);

-- Insert initial site content
INSERT INTO public.site_content (content_key, content_fr, content_ar, page) VALUES
('site_title', 'ARKAN Open - Menuiserie Aluminium & PVC', 'أركان أوبن - نجارة الألمنيوم و البي في سي', 'general'),
('hero_title', 'Votre partenaire de confiance en menuiserie aluminium et PVC', 'شريكك الموثوق في نجارة الألمنيوم و البي في سي', 'home'),
('hero_subtitle', 'Solutions sur mesure, qualité professionnelle. Basés à Oran, nous servons toute l''Algérie', 'حلول مخصصة، جودة مهنية. مقرنا في وهران، نخدم كامل الجزائر', 'home'),
('company_phone', '+213 773 09 88 20', '+213 773 09 88 20', 'contact'),
('company_address', 'Oran, Algérie', 'وهران، الجزائر', 'contact'),
('quote_app_url', 'https://arkanopen-15.lovable.app/', 'https://arkanopen-15.lovable.app/', 'general');

-- Insert initial products
INSERT INTO public.products (name_fr, name_ar, category, description_fr, description_ar, advantages_fr, advantages_ar, applications_fr, applications_ar, region_restriction) VALUES
('Menuiserie Aluminium', 'نجارة الألمنيوم', 'menuiserie', 'Solutions complètes en menuiserie aluminium haute performance', 'حلول شاملة في نجارة الألمنيوم عالية الأداء', ARRAY['Résistance aux intempéries', 'Durabilité exceptionnelle', 'Isolation thermique'], ARRAY['مقاومة للعوامل الجوية', 'متانة استثنائية', 'عزل حراري'], ARRAY['Fenêtres', 'Portes', 'Façades'], ARRAY['النوافذ', 'الأبواب', 'الواجهات'], null),
('Menuiserie PVC', 'نجارة البي في سي', 'menuiserie', 'Menuiserie PVC de qualité supérieure avec isolation optimale', 'نجارة البي في سي عالية الجودة مع عزل مثالي', ARRAY['Isolation thermique excellente', 'Facilité d''entretien', 'Prix compétitif'], ARRAY['عزل حراري ممتاز', 'سهولة الصيانة', 'أسعار تنافسية'], ARRAY['Fenêtres', 'Portes', 'Volets'], ARRAY['النوافذ', 'الأبواب', 'المصاريع'], null),
('Profilés Aluminium B77', 'ملامح الألمنيوم ب77', 'profiles', 'Vente de profilés aluminium B77 de haute qualité', 'بيع ملامح الألمنيوم ب77 عالية الجودة', ARRAY['Qualité premium', 'Livraison rapide', 'Prix grossiste'], ARRAY['جودة ممتازة', 'توصيل سريع', 'أسعار الجملة'], ARRAY['Construction', 'Menuiserie', 'Industrie'], ARRAY['البناء', 'النجارة', 'الصناعة'], 'Région Ouest');

-- Insert initial projects
INSERT INTO public.projects (title_fr, title_ar, category, location, description_fr, description_ar, client_name, status, featured) VALUES
('Villa Moderne Oran', 'فيلا عصرية وهران', 'villa', 'Oran', 'Réalisation complète d''une villa moderne avec menuiserie aluminium haut de gamme', 'إنجاز شامل لفيلا عصرية مع نجارة ألمنيوم راقية', 'Famille Benali', 'published', true),
('Centre Commercial Alger', 'مركز تجاري الجزائر', 'commercial', 'Alger', 'Façade en mur rideau pour centre commercial de 5000m²', 'واجهة بجدار ستاري لمركز تجاري بمساحة 5000 متر مربع', 'Groupe Immobilier ABC', 'published', true);

-- Set admin password
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('admin_password', 'Abdellah@86'),
('whatsapp_number', '+213773098820'),
('whatsapp_message', 'Bonjour, je suis intéressé par vos services');