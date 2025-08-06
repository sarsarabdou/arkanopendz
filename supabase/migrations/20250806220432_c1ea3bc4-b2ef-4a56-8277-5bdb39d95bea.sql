-- Update products to use new aluminum and PVC windows/doors specific images and content
UPDATE products SET 
  name_fr = 'Fenêtres en Aluminium', 
  name_ar = 'نوافذ الألومنيوم',
  description_fr = 'Fenêtres en aluminium de haute qualité avec isolation thermique et phonique. Design moderne et durabilité exceptionnelle pour tous types de constructions.',
  description_ar = 'نوافذ الألومنيوم عالية الجودة مع العزل الحراري والصوتي. تصميم عصري ومتانة استثنائية لجميع أنواع المباني.',
  category = 'Fenêtres Aluminium',
  advantages_fr = ARRAY['Isolation thermique', 'Résistance à la corrosion', 'Design moderne', 'Maintenance facile'],
  advantages_ar = ARRAY['عزل حراري', 'مقاومة التآكل', 'تصميم عصري', 'صيانة سهلة'],
  applications_fr = ARRAY['Résidentiel', 'Commercial', 'Industriel', 'Rénovation'],
  applications_ar = ARRAY['سكني', 'تجاري', 'صناعي', 'تجديد'],
  images = ARRAY['/src/assets/product-aluminum-windows.jpg']
WHERE id = (SELECT id FROM products ORDER BY created_at LIMIT 1);

UPDATE products SET 
  name_fr = 'Portes et Fenêtres PVC', 
  name_ar = 'أبواب ونوافذ PVC',
  description_fr = 'Système complet de portes et fenêtres en PVC avec double vitrage. Excellent rapport qualité-prix et performance énergétique optimale.',
  description_ar = 'نظام كامل من الأبواب والنوافذ PVC مع زجاج مزدوج. نسبة ممتازة بين الجودة والسعر وأداء طاقة مثالي.',
  category = 'Portes PVC',
  advantages_fr = ARRAY['Économique', 'Isolation phonique', 'Étanchéité parfaite', 'Écologique'],
  advantages_ar = ARRAY['اقتصادي', 'عزل صوتي', 'إحكام مثالي', 'صديق للبيئة'],
  applications_fr = ARRAY['Maisons individuelles', 'Appartements', 'Bureaux', 'Magasins'],
  applications_ar = ARRAY['منازل فردية', 'شقق', 'مكاتب', 'متاجر'],
  images = ARRAY['/src/assets/product-pvc-doors.jpg']
WHERE id = (SELECT id FROM products ORDER BY created_at LIMIT 1 OFFSET 1);

-- Update projects to reflect aluminum and PVC work
UPDATE projects SET 
  title_fr = 'Villa Moderne - Fenêtres Aluminium',
  title_ar = 'فيلا عصرية - نوافذ الألومنيوم',
  description_fr = 'Installation complète de fenêtres en aluminium avec double vitrage pour une villa moderne de 300m². Projet réalisé avec finition haut de gamme.',
  description_ar = 'تركيب كامل لنوافذ الألومنيوم مع زجاج مزدوج لفيلا عصرية بمساحة 300م². تم إنجاز المشروع بتشطيب راقي.',
  category = 'Résidentiel',
  client_testimonial_fr = 'ARKAN Open a transformé notre maison. Qualité exceptionnelle des fenêtres aluminium.',
  client_testimonial_ar = 'أركان أوبن حولت منزلنا. جودة استثنائية لنوافذ الألومنيوم.'
WHERE id = (SELECT id FROM projects ORDER BY created_at LIMIT 1);

UPDATE projects SET 
  title_fr = 'Immeuble Commercial - Système PVC',
  title_ar = 'مبنى تجاري - نظام PVC',
  description_fr = 'Équipement complet d\'un immeuble commercial avec portes et fenêtres PVC. Solution économique et performante pour 50 unités.',
  description_ar = 'تجهيز كامل لمبنى تجاري بأبواب ونوافذ PVC. حل اقتصادي وفعال لـ 50 وحدة.',
  category = 'Commercial',
  client_testimonial_fr = 'Service professionnel et produits PVC de qualité. Très satisfait du résultat.',
  client_testimonial_ar = 'خدمة مهنية ومنتجات PVC عالية الجودة. راضون جداً عن النتيجة.'
WHERE id = (SELECT id FROM projects ORDER BY created_at LIMIT 1 OFFSET 1);