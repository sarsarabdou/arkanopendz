import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContentByKey } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  Target,
  Heart,
  Shield
} from 'lucide-react';

const About = () => {
  const { language, t } = useLanguage();
  const phone = useContentByKey('company_phone', 'contact');
  const address = useContentByKey('company_address', 'contact');

  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: language === 'fr' ? 'Excellence' : 'التميز',
      description: language === 'fr' ? 'Nous visons l\'excellence dans chaque projet.' : 'نسعى للتميز في كل مشروع.',
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: language === 'fr' ? 'Satisfaction Client' : 'رضا العميل',
      description: language === 'fr' ? 'Votre satisfaction est notre priorité absolue.' : 'رضاكم هو أولويتنا المطلقة.',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: language === 'fr' ? 'Qualité' : 'الجودة',
      description: language === 'fr' ? 'Matériaux premium et finitions irréprochables.' : 'مواد ممتازة وتشطيبات لا تشوبها شائبة.',
    },
  ];

  const stats = [
    {
      number: '20+',
      label: language === 'fr' ? 'Années d\'expérience' : 'سنوات من الخبرة',
      icon: <Clock className="w-6 h-6 text-primary" />,
    },
    {
      number: '58',
      label: language === 'fr' ? 'Wilayas couvertes' : 'ولاية مغطاة',
      icon: <MapPin className="w-6 h-6 text-primary" />,
    },
    {
      number: '1000+',
      label: language === 'fr' ? 'Projets réalisés' : 'مشروع منجز',
      icon: <Building className="w-6 h-6 text-primary" />,
    },
    {
      number: '50+',
      label: language === 'fr' ? 'Professionnels' : 'محترف',
      icon: <Users className="w-6 h-6 text-primary" />,
    },
  ];

  const certifications = [
    language === 'fr' ? 'ISO 9001:2015' : 'ISO 9001:2015',
    language === 'fr' ? 'Certification Qualité' : 'شهادة الجودة',
    language === 'fr' ? 'Assurance Décennale' : 'ضمان عشر سنوات',
    language === 'fr' ? 'Agrément B77' : 'اعتماد B77',
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              {language === 'fr' ? 'Notre Histoire' : 'قصتنا'}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {language === 'fr' 
                  ? 'Fondée à Oran, ARKAN Open est devenue une référence dans le domaine de la menuiserie aluminium et PVC en Algérie. Avec plus de 20 années d\'expérience, nous avons su développer une expertise reconnue dans tout le territoire national.'
                  : 'تأسست أركان أوبن في وهران، وأصبحت مرجعاً في مجال نجارة الألمنيوم والبي في سي في الجزائر. مع أكثر من 20 عاماً من الخبرة، تمكنا من تطوير خبرة معترف بها في جميع أنحاء التراب الوطني.'
                }
              </p>
              <p>
                {language === 'fr'
                  ? 'Basés à Oran, nous servons désormais les 58 wilayas d\'Algérie avec des solutions sur mesure pour tous vos projets de menuiserie. Notre spécialisation dans les profilés aluminium B77 pour la région Ouest nous positionne comme un partenaire privilégié.'
                  : 'مقرنا في وهران، نخدم الآن 58 ولاية في الجزائر بحلول مخصصة لجميع مشاريع النجارة الخاصة بكم. تخصصنا في ملامح الألمنيوم B77 للمنطقة الغربية يجعلنا شريكاً مفضلاً.'
                }
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  {language === 'fr' ? 'Notre Siège' : 'مقرنا'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Coverage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {language === 'fr' ? 'Zone de Couverture' : 'منطقة التغطية'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  {language === 'fr' ? 'Services: 58 Wilayas' : 'الخدمات: 58 ولاية'}
                </Badge>
                <Badge variant="secondary" className="w-full justify-center">
                  {language === 'fr' ? 'Profilés B77: Région Ouest' : 'ملامح B77: المنطقة الغربية'}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            {language === 'fr' ? 'Nos Valeurs' : 'قيمنا'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            {language === 'fr' ? 'Certifications & Garanties' : 'الشهادات والضمانات'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-medium text-sm">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {language === 'fr' ? 'Prêt à démarrer votre projet ?' : 'مستعد لبدء مشروعك؟'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'fr' 
              ? 'Obtenez votre devis gratuit en quelques minutes avec notre calculateur en ligne.'
              : 'احصل على عرض سعر مجاني في دقائق قليلة باستخدام حاسبة الأسعار الخاصة بنا.'
            }
          </p>
          <Button className="btn-arkan">
            {t('btn.quote')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;