-- Update products with new images and clean content
UPDATE products SET 
  images = ARRAY['/src/assets/product-aluminum-windows.jpg'],
  name_fr = 'Menuiserie Aluminium',
  name_ar = 'نجارة الألومنيوم',
  description_fr = 'Fabrication et installation de fenêtres et portes en aluminium de haute qualité.',
  description_ar = 'تصنيع وتركيب نوافذ وأبواب الألومنيوم عالية الجودة.',
  applications_fr = ARRAY['Résidentiel', 'Commercial', 'Industriel'],
  applications_ar = ARRAY['سكني', 'تجاري', 'صناعي']
WHERE name_fr LIKE '%Aluminium%' AND category = 'menuiserie';

UPDATE products SET 
  images = ARRAY['/src/assets/product-pvc-doors.jpg'],
  name_fr = 'Menuiserie PVC',
  name_ar = 'نجارة PVC',
  description_fr = 'Portes et fenêtres en PVC blanc, isolation thermique et phonique optimale.',
  description_ar = 'أبواب ونوافذ PVC بيضاء، عزل حراري وصوتي مثالي.',
  applications_fr = ARRAY['Résidentiel', 'Rénovation'],
  applications_ar = ARRAY['سكني', 'تجديد']
WHERE name_fr LIKE '%PVC%' AND category = 'menuiserie';

UPDATE products SET 
  images = ARRAY['/src/assets/product-alucoband.jpg'],
  name_fr = 'Alucoband',
  name_ar = 'ألوكوباند',
  description_fr = 'Panneaux composites aluminium pour habillage de façades modernes.',
  description_ar = 'ألواح الألومنيوم المركبة لكسوة الواجهات الحديثة.',
  applications_fr = ARRAY['Façades', 'Commercial', 'Architectural'],
  applications_ar = ARRAY['واجهات', 'تجاري', 'معماري']
WHERE name_fr LIKE '%Alucoband%';

UPDATE products SET 
  images = ARRAY['/src/assets/product-curtain-wall.jpg'],
  name_fr = 'Murs Rideaux',
  name_ar = 'الجدران الستارية',
  description_fr = 'Systèmes de façades vitrées continues pour bâtiments modernes.',
  description_ar = 'أنظمة الواجهات الزجاجية المستمرة للمباني الحديثة.',
  applications_fr = ARRAY['Immeubles', 'Bureaux', 'Commercial'],
  applications_ar = ARRAY['مباني', 'مكاتب', 'تجاري']
WHERE name_fr LIKE '%Mur%' OR name_fr LIKE '%Rideau%';

UPDATE products SET 
  images = ARRAY['/src/assets/product-aluminum-kitchen.jpg'],
  name_fr = 'Cuisines Aluminium',
  name_ar = 'مطابخ الألومنيوم',
  description_fr = 'Meubles de cuisine en aluminium, design moderne et durabilité.',
  description_ar = 'أثاث المطبخ من الألومنيوم، تصميم حديث ومتانة.',
  applications_fr = ARRAY['Résidentiel', 'Hôtellerie'],
  applications_ar = ARRAY['سكني', 'فندقة']
WHERE name_fr LIKE '%Cuisine%';

UPDATE products SET 
  images = ARRAY['/src/assets/product-stair-railing.jpg'],
  name_fr = 'Rampes Escalier',
  name_ar = 'درابزين السلالم',
  description_fr = 'Garde-corps et rampes d\'escalier en aluminium, sécurité et esthétique.',
  description_ar = 'حواجز وسور السلالم من الألومنيوم، أمان وجمالية.',
  applications_fr = ARRAY['Escaliers', 'Sécurité', 'Décoration'],
  applications_ar = ARRAY['سلالم', 'أمان', 'ديكور']
WHERE name_fr LIKE '%Rampe%' OR name_fr LIKE '%Escalier%';

UPDATE products SET 
  images = ARRAY['/src/assets/product-mosquito-net.jpg'],
  name_fr = 'Moustiquaires',
  name_ar = 'ناموسيات',
  description_fr = 'Protection contre les insectes, mailles fines et cadres aluminium.',
  description_ar = 'حماية من الحشرات، شباك ناعمة وإطارات ألومنيوم.',
  applications_fr = ARRAY['Fenêtres', 'Portes', 'Protection'],
  applications_ar = ARRAY['نوافذ', 'أبواب', 'حماية']
WHERE name_fr LIKE '%Moustiquaire%';