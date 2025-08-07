import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/hooks/useSupabaseData';
import { 
  Building, 
  Home, 
  Factory, 
  Wrench, 
  Shield, 
  Clock,
  ArrowRight,
  MapPin,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import arkanLogo from '@/assets/arkan-logo.png';

const ServicesSection = () => {
  const { language, t } = useLanguage();
  const { data: products, isLoading } = useProducts();

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'menuiserie': return <Home className="w-8 h-8" />;
      case 'profiles': return <Factory className="w-8 h-8" />;
      case 'commercial': return <Building className="w-8 h-8" />;
      default: return <Wrench className="w-8 h-8" />;
    }
  };

  const getServiceColor = (index: number) => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success'];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            {t('services.title')}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === 'fr' ? 'Nos Solutions' : 'حلولنا'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products?.slice(0, 6).map((product, index) => (
            <Card key={product.id} className="card-arkan group cursor-pointer">
              <CardHeader className="pb-4">
                {/* Product Image */}
                {product.images?.[0] && (
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={language === 'fr' ? product.name_fr : product.name_ar}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardTitle className="text-xl mb-2">
                  {language === 'fr' ? product.name_fr : product.name_ar}
                </CardTitle>
                {product.region_restriction && (
                  <Badge variant="secondary" className="w-fit">
                    <MapPin className="w-3 h-3 mr-1" />
                    {product.region_restriction}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
                  {language === 'fr' ? product.description_fr : product.description_ar}
                </CardDescription>
                
                {/* Advantages */}
                <div className="space-y-2 mb-4">
                  {(language === 'fr' ? product.advantages_fr : product.advantages_ar)?.slice(0, 3).map((advantage, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-success" />
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link to="/products">
                    {t('btn.viewMore')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                {language === 'fr' ? 'Pourquoi nous choisir ?' : 'لماذا تختارنا؟'}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Award className="w-5 h-5" />,
                    title: language === 'fr' ? 'Qualité Garantie' : 'جودة مضمونة',
                    desc: language === 'fr' ? '20 ans d\'expertise en menuiserie' : '20 سنة من الخبرة في النجارة'
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: language === 'fr' ? 'Livraison Rapide' : 'توصيل سريع',
                    desc: language === 'fr' ? 'Délais respectés et service efficace' : 'مواعيد محترمة وخدمة فعالة'
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: language === 'fr' ? 'Couverture Nationale' : 'تغطية وطنية',
                    desc: language === 'fr' ? 'Services dans les 58 wilayas' : 'خدمات في 58 ولاية'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-primary rounded-full text-primary-foreground mb-6 glow-effect overflow-hidden">
                <img 
                  src={arkanLogo} 
                  alt="ARKAN Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                {language === 'fr' ? 'Excellence & Innovation' : 'التميز والابتكار'}
              </h4>
              <p className="text-muted-foreground">
                {language === 'fr' 
                  ? 'Notre engagement envers la qualité et l\'innovation nous distingue sur le marché algérien.'
                  : 'التزامنا بالجودة والابتكار يميزنا في السوق الجزائرية.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;