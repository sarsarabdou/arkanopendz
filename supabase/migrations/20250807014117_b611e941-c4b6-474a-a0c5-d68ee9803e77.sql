-- Update product images to use proper asset paths
UPDATE products 
SET images = ARRAY['https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
WHERE name_fr = 'Alucoband';

UPDATE products 
SET images = ARRAY['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
WHERE name_fr = 'Murs Rideaux';

-- Update any other products that might have local asset paths
UPDATE products 
SET images = CASE 
  WHEN name_fr = 'Menuiserie aluminium' THEN ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  WHEN name_fr = 'Menuiserie PVC' THEN images -- Keep existing URL as it seems to be correct
  ELSE images
END
WHERE images @> ARRAY['/src/assets/'] OR array_to_string(images, ',') LIKE '%/src/assets/%';