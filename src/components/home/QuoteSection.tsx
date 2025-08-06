import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContentByKey } from '@/hooks/useSupabaseData';
import { 
  Calculator, 
  Clock, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Smartphone,
  Monitor
} from 'lucide-react';

const QuoteSection = () => {
  const { language, t } = useLanguage();
  const quoteUrl = useContentByKey('quote_app_url', 'general');
  
  const handleQuoteClick = () => {
    window.open('https://arkanopen-15.lovable.app/', '_blank');
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === 'fr' ? 'Devis en 5 minutes' : 'عرض سعر في 5 دقائق',
      desc: language === 'fr' ? 'Calculateur automatisé ultra-rapide' : 'حاسبة آلية فائقة السرعة'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: language === 'fr' ? 'Calcul précis' : 'حساب دقيق',
      desc: language === 'fr' ? 'Algorithme avancé pour une estimation exacte' : 'خوارزمية متطورة لتقدير دقيق'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === 'fr' ? '100% Gratuit' : '100% مجاني',
      desc: language === 'fr' ? 'Aucun engagement, devis immédiat' : 'بدون التزام، عرض سعر فوري'
    }
  ];

  const benefits = [
    language === 'fr' ? 'Interface intuitive et moderne' : 'واجهة بديهية وعصرية',
    language === 'fr' ? 'Compatible mobile et desktop' : 'متوافق مع الجوال والكمبيوتر',
    language === 'fr' ? 'Sauvegarde automatique des devis' : 'حفظ تلقائي لعروض الأسعار',
    language === 'fr' ? 'Support technique 24/7' : 'دعم فني 24/7'
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="text-primary text-sm font-semibold mb-4">
              {language === 'fr' ? 'ARKAN Open DEVIS' : 'عرض أسعار أركان أوبن'}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {language === 'fr' ? 'Calculateur de Devis' : 'حاسبة عروض الأسعار'}
              <span className="block text-primary">
                {language === 'fr' ? 'Intelligent' : 'الذكية'}
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === 'fr' 
                ? 'Notre outil révolutionnaire vous permet d\'obtenir un devis précis et personnalisé en quelques clics seulement. Économisez du temps et obtenez une estimation professionnelle instantanément.'
                : 'أداتنا الثورية تسمح لك بالحصول على عرض سعر دقيق ومخصص ببضع نقرات فقط. وفر الوقت واحصل على تقدير مهني فوراً.'
              }
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={handleQuoteClick}
              size="lg"
              className="btn-arkan text-lg px-8 py-4 group"
            >
              {language === 'fr' ? 'Accéder au Calculateur' : 'الوصول إلى الحاسبة'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Content - App Preview */}
          <div className="relative">
            {/* Main Card */}
            <Card className="card-arkan bg-gradient-to-br from-primary to-secondary text-primary-foreground p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Monitor className="w-8 h-8 opacity-30" />
              </div>
              
              <CardContent className="p-0">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    ARKAN Open DEVIS
                  </h3>
                  <p className="opacity-90">
                    {language === 'fr' ? 'Application de devis en ligne' : 'تطبيق عروض الأسعار الإلكتروني'}
                  </p>
                </div>

                {/* Mock Interface */}
                <div className="bg-white/20 rounded-lg p-4 mb-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {language === 'fr' ? 'Interface Moderne' : 'واجهة عصرية'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">5min</div>
                    <div className="text-xs opacity-80">
                      {language === 'fr' ? 'Temps moyen' : 'الوقت المتوسط'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs opacity-80">
                      {language === 'fr' ? 'Gratuit' : 'مجاني'}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full float-animation" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full float-animation" style={{ animationDelay: '2s' }} />
            </Card>

            {/* Secondary Card */}
            <Card className="absolute -bottom-4 -right-4 w-32 h-20 bg-white shadow-lg border-0 z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">1000+</div>
                <div className="text-xs text-muted-foreground">
                  {language === 'fr' ? 'Devis créés' : 'عرض سعر'}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;