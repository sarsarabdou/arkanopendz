import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContentByKey } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Building
} from 'lucide-react';

const Contact = () => {
  const { language, t } = useLanguage();
  const phone = useContentByKey('company_phone', 'contact');
  const address = useContentByKey('company_address', 'contact');
  const quoteUrl = useContentByKey('quote_app_url', 'general');

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: language === 'fr' ? 'Téléphone' : 'الهاتف',
      value: phone,
      action: `tel:${phone}`,
      description: language === 'fr' ? 'Disponible 7j/7' : 'متاح 7 أيام في الأسبوع',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: 'WhatsApp',
      value: phone,
      action: `https://wa.me/${phone?.replace(/\s/g, '')}`,
      description: language === 'fr' ? 'Réponse rapide' : 'استجابة سريعة',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: language === 'fr' ? 'Adresse' : 'العنوان',
      value: address,
      action: null,
      description: language === 'fr' ? 'Siège social' : 'المقر الرئيسي',
    },
  ];

  const coverage = [
    {
      title: language === 'fr' ? 'Services Généraux' : 'الخدمات العامة',
      description: language === 'fr' ? '58 Wilayas d\'Algérie' : '58 ولاية في الجزائر',
      badge: language === 'fr' ? 'National' : 'وطني',
      variant: 'default' as const,
    },
    {
      title: language === 'fr' ? 'Profilés Aluminium B77' : 'ملامح الألمنيوم B77',
      description: language === 'fr' ? 'Région Ouest uniquement' : 'المنطقة الغربية فقط',
      badge: language === 'fr' ? 'Région Ouest' : 'المنطقة الغربية',
      variant: 'secondary' as const,
    },
  ];

  const handleQuoteClick = () => {
    if (quoteUrl) {
      window.open(quoteUrl, '_blank');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  {language === 'fr' ? 'Nous Contacter' : 'اتصل بنا'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{method.title}</h4>
                      {method.action ? (
                        <a 
                          href={method.action}
                          className="text-sm text-primary hover:underline"
                          target={method.action.startsWith('http') ? '_blank' : undefined}
                          rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{method.value}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Coverage Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {language === 'fr' ? 'Zones de Couverture' : 'مناطق التغطية'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coverage.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{area.title}</h4>
                      <Badge variant={area.variant}>{area.badge}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{area.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Quote CTA */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-center">
                  {language === 'fr' ? 'Devis Express' : 'عرض سعر سريع'}
                </CardTitle>
                <CardDescription className="text-center">
                  {language === 'fr' 
                    ? 'Obtenez votre devis en 5 minutes'
                    : 'احصل على عرض السعر في 5 دقائق'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleQuoteClick}
                  className="w-full btn-arkan"
                >
                  {t('btn.quote')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Envoyez-nous un message' : 'أرسل لنا رسالة'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' 
                    ? 'Nous vous répondrons dans les plus brefs délais'
                    : 'سنرد عليك في أقرب وقت ممكن'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'fr' ? 'Nom complet' : 'الاسم الكامل'}
                      </label>
                      <Input placeholder={language === 'fr' ? 'Votre nom' : 'اسمك'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'fr' ? 'Téléphone' : 'الهاتف'}
                      </label>
                      <Input placeholder="+213" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'fr' ? 'Email' : 'البريد الإلكتروني'}
                    </label>
                    <Input type="email" placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'fr' ? 'Sujet' : 'الموضوع'}
                    </label>
                    <Input placeholder={language === 'fr' ? 'Sujet de votre message' : 'موضوع رسالتك'} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'fr' ? 'Message' : 'الرسالة'}
                    </label>
                    <Textarea 
                      placeholder={language === 'fr' ? 'Décrivez votre projet...' : 'صف مشروعك...'}
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full btn-arkan">
                    <Send className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Envoyer le message' : 'إرسال الرسالة'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {language === 'fr' ? 'Notre Localisation' : 'موقعنا'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">ARKAN Open</h3>
                  <p className="text-muted-foreground">{address}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {language === 'fr' ? 'Carte interactive bientôt disponible' : 'خريطة تفاعلية متاحة قريباً'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;