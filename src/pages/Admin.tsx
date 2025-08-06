import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  useSiteColors, 
  useSocialLinks, 
  useProducts, 
  useProjects,
  useSiteContent 
} from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProjectForm } from '@/components/admin/ProjectForm';
import HomeCustomizer from '@/components/admin/HomeCustomizer';
import { 
  Palette, 
  Share2, 
  Package, 
  FolderOpen, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Upload,
  Eye,
  Users,
  BarChart3
} from 'lucide-react';

// Import generated images
import heroImage from '@/assets/hero-construction.jpg';
import productBlocks from '@/assets/product-blocks.jpg';
import productCement from '@/assets/product-cement.jpg';
import projectSample from '@/assets/project-sample1.jpg';

const Admin = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { data: siteColors } = useSiteColors();
  const { data: socialLinks } = useSocialLinks();
  const { data: products } = useProducts();
  const { data: projects } = useProjects();
  const { data: siteContent } = useSiteContent();

  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Color Management
  const [colors, setColors] = useState({
    primary: '#f59e0b',
    secondary: '#3182ce',
    accent: '#4299e1',
    success: '#38a169',
    warning: '#d69e2e',
    error: '#e53e3e'
  });

  // Social Links Management
  const [socials, setSocials] = useState([
    { platform: 'facebook', url: '', is_active: true },
    { platform: 'instagram', url: '', is_active: true },
    { platform: 'youtube', url: '', is_active: true },
    { platform: 'linkedin', url: '', is_active: true },
    { platform: 'tiktok', url: '', is_active: true },
  ]);

  // Stats
  const stats = [
    {
      title: language === 'fr' ? 'Produits' : 'المنتجات',
      value: products?.length || 0,
      icon: <Package className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: language === 'fr' ? 'Projets' : 'المشاريع',
      value: projects?.length || 0,
      icon: <FolderOpen className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      title: language === 'fr' ? 'Réseaux Sociaux' : 'الشبكات الاجتماعية',
      value: socialLinks?.filter(s => s.is_active)?.length || 0,
      icon: <Share2 className="w-6 h-6" />,
      color: 'text-purple-600'
    },
    {
      title: language === 'fr' ? 'Contenus' : 'المحتويات',
      value: siteContent?.length || 0,
      icon: <Settings className="w-6 h-6" />,
      color: 'text-orange-600'
    }
  ];

  useEffect(() => {
    // Load current social links
    if (socialLinks) {
      setSocials(socialLinks.map(link => ({
        platform: link.platform,
        url: link.url,
        is_active: link.is_active
      })));
    }
  }, [socialLinks]);

  const updateSiteColors = async () => {
    try {
      // Update colors in database
      for (const [colorName, colorValue] of Object.entries(colors)) {
        await supabase
          .from('site_colors')
          .upsert({ 
            color_name: colorName, 
            color_value: colorValue,
            category: 'primary'
          });
      }
      
      toast({
        title: language === 'fr' ? 'Couleurs mises à jour' : 'تم تحديث الألوان',
        description: language === 'fr' ? 'Les couleurs du site ont été appliquées.' : 'تم تطبيق ألوان الموقع.',
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Impossible de mettre à jour les couleurs.' : 'لا يمكن تحديث الألوان.',
        variant: 'destructive',
      });
    }
  };

  const updateSocialLinks = async () => {
    try {
      // Update each social link
      for (const social of socials) {
        const existingLink = socialLinks?.find(s => s.platform === social.platform);
        
        if (existingLink) {
          await supabase
            .from('social_links')
            .update({ 
              url: social.url, 
              is_active: social.is_active 
            })
            .eq('id', existingLink.id);
        } else {
          await supabase
            .from('social_links')
            .insert({ 
              platform: social.platform,
              url: social.url,
              is_active: social.is_active,
              icon: social.platform,
              sort_order: 0
            });
        }
      }
      
      toast({
        title: language === 'fr' ? 'Liens mis à jour' : 'تم تحديث الروابط',
        description: language === 'fr' ? 'Les liens des réseaux sociaux ont été sauvegardés.' : 'تم حفظ روابط الشبكات الاجتماعية.',
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Impossible de mettre à jour les liens.' : 'لا يمكن تحديث الروابط.',
        variant: 'destructive',
      });
    }
  };

  const handleProductEdit = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleProjectEdit = (project: any) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleProductDelete = async (productId: string) => {
    try {
      await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      toast({
        title: language === 'fr' ? 'Produit supprimé' : 'تم حذف المنتج',
        description: language === 'fr' ? 'Le produit a été supprimé avec succès' : 'تم حذف المنتج بنجاح',
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Erreur lors de la suppression' : 'خطأ في الحذف',
        variant: 'destructive',
      });
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    try {
      await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      
      toast({
        title: language === 'fr' ? 'Projet supprimé' : 'تم حذف المشروع',
        description: language === 'fr' ? 'Le projet a été supprimé avec succès' : 'تم حذف المشروع بنجاح',
      });
    } catch (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'خطأ',
        description: language === 'fr' ? 'Erreur lors de la suppression' : 'خطأ في الحذف',
        variant: 'destructive',
      });
    }
  };

  const refreshData = () => {
    // This will trigger a re-fetch of the data
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {language === 'fr' ? 'Administration ARKAN Open' : 'إدارة أركان أوبن'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Tableau de bord d\'administration' : 'لوحة التحكم الإدارية'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Voir le site' : 'عرض الموقع'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {language === 'fr' ? 'Tableau de bord' : 'لوحة التحكم'}
            </TabsTrigger>
            <TabsTrigger value="homepage" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {language === 'fr' ? 'Page d\'accueil' : 'الصفحة الرئيسية'}
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              {language === 'fr' ? 'Couleurs' : 'الألوان'}
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              {language === 'fr' ? 'Réseaux' : 'الشبكات'}
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {language === 'fr' ? 'Produits' : 'المنتجات'}
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              {language === 'fr' ? 'Projets' : 'المشاريع'}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Actions Rapides' : 'إجراءات سريعة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                >
                  <Plus className="w-6 h-6" />
                  {language === 'fr' ? 'Ajouter Produit' : 'إضافة منتج'}
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                >
                  <Plus className="w-6 h-6" />
                  {language === 'fr' ? 'Ajouter Projet' : 'إضافة مشروع'}
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setSelectedTab('colors')}
                >
                  <Palette className="w-6 h-6" />
                  {language === 'fr' ? 'Modifier Couleurs' : 'تعديل الألوان'}
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setSelectedTab('social')}
                >
                  <Share2 className="w-6 h-6" />
                  {language === 'fr' ? 'Gérer Réseaux' : 'إدارة الشبكات'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage Customizer Tab */}
          <TabsContent value="homepage" className="space-y-6">
            <HomeCustomizer onPreview={() => window.open('/', '_blank')} />
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Gestion des Couleurs' : 'إدارة الألوان'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' 
                    ? 'Personnalisez les couleurs de votre site en temps réel'
                    : 'قم بتخصيص ألوان موقعك في الوقت الفعلي'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(colors).map(([colorName, colorValue]) => (
                    <div key={colorName} className="space-y-2">
                      <label className="text-sm font-medium capitalize">
                        {colorName}
                      </label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded border"
                          style={{ backgroundColor: colorValue }}
                        />
                        <Input
                          type="color"
                          value={colorValue}
                          onChange={(e) => setColors(prev => ({
                            ...prev,
                            [colorName]: e.target.value
                          }))}
                          className="w-20"
                        />
                        <Input
                          value={colorValue}
                          onChange={(e) => setColors(prev => ({
                            ...prev,
                            [colorName]: e.target.value
                          }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={updateSiteColors} className="btn-arkan">
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Appliquer les couleurs' : 'تطبيق الألوان'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setColors({
                      primary: '#f59e0b',
                      secondary: '#3182ce',
                      accent: '#4299e1',
                      success: '#38a169',
                      warning: '#d69e2e',
                      error: '#e53e3e'
                    })}
                  >
                    {language === 'fr' ? 'Réinitialiser' : 'إعادة تعيين'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Gestion des Réseaux Sociaux' : 'إدارة الشبكات الاجتماعية'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' 
                    ? 'Modifiez les liens de vos réseaux sociaux'
                    : 'قم بتعديل روابط الشبكات الاجتماعية'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socials.map((social, index) => (
                  <div key={social.platform} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary capitalize">
                        {social.platform[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium capitalize">{social.platform}</h4>
                      <Input
                        placeholder={`https://${social.platform}.com/...`}
                        value={social.url}
                        onChange={(e) => {
                          const newSocials = [...socials];
                          newSocials[index].url = e.target.value;
                          setSocials(newSocials);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={social.is_active ? "default" : "secondary"}>
                        {social.is_active 
                          ? (language === 'fr' ? 'Actif' : 'نشط')
                          : (language === 'fr' ? 'Inactif' : 'غير نشط')
                        }
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newSocials = [...socials];
                          newSocials[index].is_active = !newSocials[index].is_active;
                          setSocials(newSocials);
                        }}
                      >
                        {social.is_active 
                          ? (language === 'fr' ? 'Désactiver' : 'إلغاء تنشيط')
                          : (language === 'fr' ? 'Activer' : 'تنشيط')
                        }
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button onClick={updateSocialLinks} className="btn-arkan">
                  <Save className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Sauvegarder les liens' : 'حفظ الروابط'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {language === 'fr' ? 'Gestion des Produits' : 'إدارة المنتجات'}
                  <Button 
                    className="btn-arkan"
                    onClick={() => {
                      setEditingProduct(null);
                      setShowProductForm(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Ajouter' : 'إضافة'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products?.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product[`name_${language}` as keyof typeof product] as string}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {product[`name_${language}` as keyof typeof product] as string}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active 
                            ? (language === 'fr' ? 'Actif' : 'نشط')
                            : (language === 'fr' ? 'Inactif' : 'غير نشط')
                          }
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProductEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProductDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {language === 'fr' ? 'Gestion des Projets' : 'إدارة المشاريع'}
                  <Button 
                    className="btn-arkan"
                    onClick={() => {
                      setEditingProject(null);
                      setShowProjectForm(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Ajouter' : 'إضافة'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {projects?.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                        {project.images?.[0] ? (
                          <img 
                            src={project.images[0]} 
                            alt={project[`title_${language}` as keyof typeof project] as string}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FolderOpen className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {project[`title_${language}` as keyof typeof project] as string}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.location} • {project.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={project.featured ? "default" : "secondary"}>
                          {project.featured 
                            ? (language === 'fr' ? 'Vedette' : 'مميز')
                            : (language === 'fr' ? 'Standard' : 'عادي')
                          }
                        </Badge>
                        <Badge variant="outline">
                          {project.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProjectEdit(project)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProjectDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSave={refreshData}
      />

      {/* Project Form Modal */}
      <ProjectForm
        project={editingProject}
        isOpen={showProjectForm}
        onClose={() => {
          setShowProjectForm(false);
          setEditingProject(null);
        }}
        onSave={refreshData}
      />
    </div>
  );
};

export default Admin;