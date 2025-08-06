-- Insert sample products with images
INSERT INTO products (
  name_fr, name_ar, description_fr, description_ar, category, 
  advantages_fr, advantages_ar, applications_fr, applications_ar, 
  images, is_active, sort_order
) VALUES 
(
  'Blocs de Béton Premium', 
  'بلوكات الخرسانة المميزة',
  'Blocs de béton de haute qualité pour la construction résidentielle et commerciale. Fabriqués selon les normes internationales avec une résistance exceptionnelle.',
  'بلوكات خرسانية عالية الجودة للبناء السكني والتجاري. مصنعة وفقاً للمعايير الدولية بمقاومة استثنائية.',
  'Blocs de Béton',
  ARRAY['Résistance élevée', 'Isolation thermique', 'Finition parfaite', 'Économique'],
  ARRAY['مقاومة عالية', 'عزل حراري', 'تشطيب مثالي', 'اقتصادي'],
  ARRAY['Construction résidentielle', 'Bâtiments commerciaux', 'Murs porteurs', 'Cloisons'],
  ARRAY['البناء السكني', 'المباني التجارية', 'الجدران الحاملة', 'الفواصل'],
  ARRAY['/src/assets/product-blocks.jpg'],
  true,
  1
),
(
  'Ciment Portland', 
  'الأسمنت البورتلاندي',
  'Ciment Portland de qualité supérieure, idéal pour tous types de construction. Temps de prise optimal et résistance garantie.',
  'أسمنت بورتلاندي عالي الجودة، مثالي لجميع أنواع البناء. وقت تماسك مثالي ومقاومة مضمونة.',
  'Ciment',
  ARRAY['Prise rapide', 'Haute résistance', 'Qualité constante', 'Certifié'],
  ARRAY['تماسك سريع', 'مقاومة عالية', 'جودة ثابتة', 'معتمد'],
  ARRAY['Fondations', 'Dalles', 'Poteaux', 'Enduits'],
  ARRAY['الأساسات', 'البلاطات', 'الأعمدة', 'المحارة'],
  ARRAY['/src/assets/product-cement.jpg'],
  true,
  2
);

-- Insert sample projects with images
INSERT INTO projects (
  title_fr, title_ar, description_fr, description_ar, category, location,
  status, featured, client_name, client_testimonial_fr, client_testimonial_ar,
  completion_date, images
) VALUES 
(
  'Complexe Résidentiel El Mohammadia',
  'المجمع السكني المحمدية',
  'Construction d''un complexe résidentiel moderne de 200 logements avec toutes les commodités. Projet réalisé en 18 mois avec les plus hauts standards de qualité.',
  'بناء مجمع سكني حديث يضم 200 وحدة سكنية مع جميع المرافق. تم إنجاز المشروع في 18 شهراً بأعلى معايير الجودة.',
  'Résidentiel',
  'Oran',
  'completed',
  true,
  'Promotion Immobilière SARL',
  'ARKAN Open a dépassé nos attentes. Qualité exceptionnelle et respect des délais.',
  'أركان أوبن فاقت توقعاتنا. جودة استثنائية والتزام بالمواعيد.',
  '2024-01-15',
  ARRAY['/src/assets/project-sample1.jpg']
),
(
  'Centre Commercial Modern Plaza',
  'المركز التجاري مودرن بلازا',
  'Réalisation d''un centre commercial de 5000m² avec parking souterrain et espaces verts. Architecture moderne et solutions durables.',
  'إنجاز مركز تجاري بمساحة 5000م² مع موقف سيارات تحت أرضي ومساحات خضراء. عمارة حديثة وحلول مستدامة.',
  'Commercial',
  'Alger',
  'published',
  false,
  'Groupe Commercial ABC',
  'Partenaire de confiance, travail de qualité remarquable.',
  'شريك موثوق، عمل ذو جودة ملحوظة.',
  '2024-03-20',
  ARRAY['/src/assets/project-sample1.jpg']
);