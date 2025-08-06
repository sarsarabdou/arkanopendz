import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, X } from 'lucide-react';

interface Project {
  id?: string;
  title_fr: string;
  title_ar: string;
  description_fr: string;
  description_ar: string;
  category: string;
  location: string;
  status: string;
  featured: boolean;
  client_name?: string;
  client_testimonial_fr?: string;
  client_testimonial_ar?: string;
  completion_date?: string;
  images: string[];
}

interface ProjectFormProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Project>({
    title_fr: '',
    title_ar: '',
    description_fr: '',
    description_ar: '',
    category: '',
    location: '',
    status: 'published',
    featured: false,
    client_name: '',
    client_testimonial_fr: '',
    client_testimonial_ar: '',
    completion_date: '',
    images: []
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title_fr: '',
        title_ar: '',
        description_fr: '',
        description_ar: '',
        category: '',
        location: '',
        status: 'published',
        featured: false,
        client_name: '',
        client_testimonial_fr: '',
        client_testimonial_ar: '',
        completion_date: '',
        images: []
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (project?.id) {
        // Update existing project
        await supabase
          .from('projects')
          .update(formData)
          .eq('id', project.id);
      } else {
        // Create new project
        await supabase
          .from('projects')
          .insert([formData]);
      }

      toast({
        title: language === 'fr' ? 'Succès' : 'نجح',
        description: language === 'fr' ? 'Projet sauvegardé avec succès' : 'تم حفظ المشروع بنجاح',
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

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
        description: language === 'fr' ? 'L\'image a été ajoutée au projet' : 'تم إضافة الصورة للمشروع',
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
            {project?.id 
              ? (language === 'fr' ? 'Modifier le projet' : 'تعديل المشروع')
              : (language === 'fr' ? 'Ajouter un projet' : 'إضافة مشروع')
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
                  <Label htmlFor="title_fr">Titre (Français)</Label>
                  <Input
                    id="title_fr"
                    value={formData.title_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_fr: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title_ar">العنوان (العربية)</Label>
                  <Input
                    id="title_ar"
                    value={formData.title_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie / الفئة</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Emplacement / الموقع</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Statut / الحالة</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon / مسودة</SelectItem>
                      <SelectItem value="published">Publié / منشور</SelectItem>
                      <SelectItem value="completed">Terminé / مكتمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="completion_date">Date d'achèvement / تاريخ الإنجاز</Label>
                  <Input
                    id="completion_date"
                    type="date"
                    value={formData.completion_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                  />
                </div>
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
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">
                  {language === 'fr' ? 'Projet vedette' : 'مشروع مميز'}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'fr' ? 'Informations client' : 'معلومات العميل'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="client_name">Nom du client / اسم العميل</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_testimonial_fr">Témoignage (Français)</Label>
                  <Textarea
                    id="client_testimonial_fr"
                    value={formData.client_testimonial_fr}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_testimonial_fr: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="client_testimonial_ar">الشهادة (العربية)</Label>
                  <Textarea
                    id="client_testimonial_ar"
                    value={formData.client_testimonial_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_testimonial_ar: e.target.value }))}
                    rows={3}
                  />
                </div>
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
                      alt={`Project image ${index + 1}`}
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