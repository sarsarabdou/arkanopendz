import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, X } from 'lucide-react';

interface Product {
  id?: string;
  name_fr: string;
  name_ar: string;
  description_fr: string;
  description_ar: string;
  category: string;
  advantages_fr: string[];
  advantages_ar: string[];
  applications_fr: string[];
  applications_ar: string[];
  images: string[];
  is_active: boolean;
  sort_order: number;
}

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Product>({
    name_fr: '',
    name_ar: '',
    description_fr: '',
    description_ar: '',
    category: '',
    advantages_fr: [''],
    advantages_ar: [''],
    applications_fr: [''],
    applications_ar: [''],
    images: [],
    is_active: true,
    sort_order: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name_fr: '',
        name_ar: '',
        description_fr: '',
        description_ar: '',
        category: '',
        advantages_fr: [''],
        advantages_ar: [''],
        applications_fr: [''],
        applications_ar: [''],
        images: [],
        is_active: true,
        sort_order: 0
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (product?.id) {
        // Update existing product
        await supabase
          .from('products')
          .update(formData)
          .eq('id', product.id);
      } else {
        // Create new product
        await supabase
          .from('products')
          .insert([formData]);
      }

      toast({
        title: language === 'fr' ? 'Succès' : 'نجح',
        description: language === 'fr' ? 'Produit sauvegardé avec succès' : 'تم حفظ المنتج بنجاح',
      });

      onSave();
      onClose();
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Erreur lors de la sauvegarde' : 'خطأ في الحفظ',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleArrayChange = (field: keyof Product, index: number, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: keyof Product) => {
    const currentArray = formData[field] as string[];
    setFormData(prev => ({ ...prev, [field]: [...currentArray, ''] }));
  };

  const removeArrayItem = (field: keyof Product, index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, data.publicUrl]
      }));

      toast({
        title: language === 'fr' ? 'Image téléchargée' : 'تم رفع الصورة',
        description: language === 'fr' ? 'L\'image a été ajoutée au produit' : 'تم إضافة الصورة للمنتج',
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Erreur lors du téléchargement' : 'خطأ في الرفع',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product?.id 
              ? (language === 'fr' ? 'Modifier le produit' : 'تعديل المنتج')
              : (language === 'fr' ? 'Ajouter un produit' : 'إضافة منتج')
            }
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fr' ? 'Informations de base' : 'المعلومات الأساسية'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name_fr">Nom (Français)</Label>
                  <Input
                    id="name_fr"
                    value={formData.name_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_fr: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name_ar">الاسم (العربية)</Label>
                  <Input
                    id="name_ar"
                    value={formData.name_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_ar: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Catégorie / الفئة</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description_fr">Description (Français)</Label>
                  <Textarea
                    id="description_fr"
                    value={formData.description_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_fr: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description_ar">الوصف (العربية)</Label>
                  <Textarea
                    id="description_ar"
                    value={formData.description_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">
                  {language === 'fr' ? 'Produit actif' : 'منتج نشط'}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {language === 'fr' ? 'Images' : 'الصور'}
                <Button type="button" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Ajouter' : 'إضافة'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {language === 'fr' ? 'Annuler' : 'إلغاء'}
            </Button>
            <Button type="submit" className="btn-arkan" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading 
                ? (language === 'fr' ? 'Sauvegarde...' : 'جاري الحفظ...')
                : (language === 'fr' ? 'Sauvegarder' : 'حفظ')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};