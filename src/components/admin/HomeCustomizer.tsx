import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/admin/ColorPicker';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Layout as LayoutIcon,
  Save,
  Eye,
  RefreshCw 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextStyle {
  fontSize: number;
  color: string;
  fontWeight: string;
  fontFamily: string;
}

interface HomeCustomizerProps {
  onPreview?: () => void;
}

const HomeCustomizer: React.FC<HomeCustomizerProps> = ({ onPreview }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Hero Section States
  const [heroTitle, setHeroTitle] = useState('ARKAN Open');
  const [heroSubtitle, setHeroSubtitle] = useState('Menuiserie Aluminium & PVC');
  const [heroDescription, setHeroDescription] = useState('Votre partenaire de confiance...');
  const [heroImage, setHeroImage] = useState('');
  
  // Text Styles
  const [titleStyle, setTitleStyle] = useState<TextStyle>({
    fontSize: 48,
    color: '#3182ce',
    fontWeight: 'bold',
    fontFamily: 'Inter'
  });
  
  const [subtitleStyle, setSubtitleStyle] = useState<TextStyle>({
    fontSize: 24,
    color: '#3182ce',
    fontWeight: 'medium',
    fontFamily: 'Inter'
  });

  // Colors
  const [primaryColor, setPrimaryColor] = useState('#F7B32B');
  const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');
  const [accentColor, setAccentColor] = useState('#3182ce');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Apply styles to CSS variables
      const root = document.documentElement;
      root.style.setProperty('--primary', `42 100% 57%`); // ARKAN Yellow
      root.style.setProperty('--secondary', secondaryColor);
      root.style.setProperty('--accent', accentColor);
      
      // Apply hero text content
      const heroTitleElement = document.querySelector('[data-hero-title]') as HTMLElement;
      const heroSubtitleElement = document.querySelector('[data-hero-subtitle]') as HTMLElement;
      const heroDescriptionElement = document.querySelector('[data-hero-description]') as HTMLElement;
      
      if (heroTitleElement) heroTitleElement.textContent = heroTitle;
      if (heroSubtitleElement) heroSubtitleElement.textContent = heroSubtitle;
      if (heroDescriptionElement) heroDescriptionElement.textContent = heroDescription;
      
      // Apply text styles
      if (heroTitleElement) {
        heroTitleElement.style.fontSize = `${titleStyle.fontSize}px`;
        heroTitleElement.style.color = titleStyle.color;
        heroTitleElement.style.fontWeight = titleStyle.fontWeight;
      }
      
      if (heroSubtitleElement) {
        heroSubtitleElement.style.fontSize = `${subtitleStyle.fontSize}px`;
        heroSubtitleElement.style.color = subtitleStyle.color;
        heroSubtitleElement.style.fontWeight = subtitleStyle.fontWeight;
      }
      
      toast({
        title: "Modifications appliquées",
        description: "Les changements sont visibles sur la page d'accueil.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'appliquer les modifications.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // Reset to default values
    setHeroTitle('ARKAN Open');
    setHeroSubtitle('Menuiserie Aluminium & PVC');
    setHeroDescription('Votre partenaire de confiance...');
    setPrimaryColor('#F7B32B');
    setSecondaryColor('#FFFFFF');
    setAccentColor('#3182ce');
    
    toast({
      title: "Réinitialisé",
      description: "Tous les paramètres ont été remis aux valeurs par défaut.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Personnaliser la Page d'Accueil
          </h1>
          <p className="text-muted-foreground mt-2">
            Modifiez l'apparence et le contenu de votre page d'accueil
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPreview}>
            <Eye className="w-4 h-4 mr-2" />
            Prévisualiser
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">
            <Type className="w-4 h-4 mr-2" />
            Contenu
          </TabsTrigger>
          <TabsTrigger value="styles">
            <Palette className="w-4 h-4 mr-2" />
            Styles
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="colors">
            <LayoutIcon className="w-4 h-4 mr-2" />
            Couleurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Titre Principal</Label>
                <Input
                  id="hero-title"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="ARKAN Open"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-subtitle">Sous-titre</Label>
                <Input
                  id="hero-subtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Menuiserie Aluminium & PVC"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  placeholder="Votre partenaire de confiance..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Style du Titre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Taille de Police: {titleStyle.fontSize}px</Label>
                <Slider
                  value={[titleStyle.fontSize]}
                  onValueChange={(value) => setTitleStyle({...titleStyle, fontSize: value[0]})}
                  min={24}
                  max={72}
                  step={2}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Couleur du Titre</Label>
                <ColorPicker
                  color={titleStyle.color}
                  onChange={(color) => setTitleStyle({...titleStyle, color})}
                />
              </div>
              
              <div>
                <Label htmlFor="title-weight">Épaisseur</Label>
                <select
                  id="title-weight"
                  value={titleStyle.fontWeight}
                  onChange={(e) => setTitleStyle({...titleStyle, fontWeight: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semi-Bold</option>
                  <option value="bold">Bold</option>
                  <option value="extrabold">Extra-Bold</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Style du Sous-titre</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Taille de Police: {subtitleStyle.fontSize}px</Label>
                <Slider
                  value={[subtitleStyle.fontSize]}
                  onValueChange={(value) => setSubtitleStyle({...subtitleStyle, fontSize: value[0]})}
                  min={14}
                  max={36}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Couleur du Sous-titre</Label>
                <ColorPicker
                  color={subtitleStyle.color}
                  onChange={(color) => setSubtitleStyle({...subtitleStyle, color})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images de la Page d'Accueil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Image de Fond Hero</Label>
                <ImageUpload
                  onImageUpload={(url) => setHeroImage(url)}
                  currentImage={heroImage}
                  aspectRatio="16:9"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Palette de Couleurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Couleur Principale</Label>
                <ColorPicker
                  color={primaryColor}
                  onChange={setPrimaryColor}
                />
              </div>
              
              <div>
                <Label>Couleur Secondaire</Label>
                <ColorPicker
                  color={secondaryColor}
                  onChange={setSecondaryColor}
                />
              </div>
              
              <div>
                <Label>Couleur d'Accent</Label>
                <ColorPicker
                  color={accentColor}
                  onChange={setAccentColor}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeCustomizer;