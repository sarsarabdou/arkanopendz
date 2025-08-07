import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContentByKey } from '@/hooks/useSupabaseData';
import { ArrowRight, MapPin, Award, Users, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-workshop-manufacturing.jpg';
import arkanLogo from '@/assets/arkan-logo.png';

const HeroSection = () => {
  const { language, t } = useLanguage();
  const quoteUrl = useContentByKey('quote_app_url', 'general');
  
  const handleQuoteClick = () => {
    window.open('https://arkanopen-15.lovable.app/', '_blank');
  };

  const stats = [
    {
      icon: <Award className="w-5 h-5" />,
      value: "20+",
      label: language === 'fr' ? 'Années d\'expérience' : 'سنة من الخبرة'
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: "1000+",
      label: language === 'fr' ? 'Clients satisfaits' : 'عميل راضٍ'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      value: "58",
      label: language === 'fr' ? 'Wilayas couvertes' : 'ولاية مغطاة'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: "24h",
      label: language === 'fr' ? 'Délai de réponse' : 'وقت الاستجابة'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with hero image and gradient overlay */}
      <div 
        className="absolute inset-0 hero-gradient"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full float-animation" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/15 rounded-full float-animation" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full float-animation" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-white/20 text-black border-black/30 backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4 mr-2 text-black" />
            {language === 'fr' ? 'Basés à Oran - Service National' : 'مقرنا في وهران - خدمة وطنية'}
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight" data-hero-title>
            <span className="block text-black">ARKAN</span>
            <span className="block text-primary glow-effect">Open</span>
          </h1>

          {/* Hero Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-black mb-4 font-medium" data-hero-subtitle>
            {t('hero.title')}
          </h2>

          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-black/90 mb-8 max-w-3xl mx-auto leading-relaxed" data-hero-description>
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center mb-12">
            <Button 
              onClick={handleQuoteClick}
              size="lg"
              className="btn-arkan text-lg px-8 py-4 group animate-bounce hover:animate-pulse"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center mb-2 text-black">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-black/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-black/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;