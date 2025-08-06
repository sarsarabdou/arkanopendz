import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSocialLinks, useContentByKey } from '@/hooks/useSupabaseData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { language, t } = useLanguage();
  const { data: socialLinks } = useSocialLinks();
  const { toast } = useToast();
  
  const phone = useContentByKey('company_phone', 'contact');
  const address = useContentByKey('company_address', 'contact');
  const quoteUrl = useContentByKey('quote_app_url', 'general');

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/about', label: t('nav.about') },
  ];

  const services = [
    { label: language === 'fr' ? 'Menuiserie Aluminium' : 'نجارة الألمنيوم' },
    { label: language === 'fr' ? 'Menuiserie PVC' : 'نجارة البي في سي' },
    { label: language === 'fr' ? 'Murs Rideaux' : 'الجدران الستارية' },
    { label: language === 'fr' ? 'Profilés B77' : 'ملامح ب77' },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      default: return null;
    }
  };

  const handleAdminAccess = () => {
    // Check password (in production, this would be more secure)
    if (password === 'Abdellah@86') {
      toast({
        title: language === 'fr' ? 'Accès autorisé' : 'تم السماح بالوصول',
        description: language === 'fr' ? 'Redirection vers l\'interface d\'administration...' : 'إعادة توجيه إلى واجهة الإدارة...',
      });
      
      // In a real app, this would redirect to admin dashboard
      setTimeout(() => {
        window.open('/admin', '_blank');
      }, 1500);
      
      setShowAdminDialog(false);
      setPassword('');
    } else {
      toast({
        title: language === 'fr' ? 'Accès refusé' : 'تم رفض الوصول',
        description: language === 'fr' ? 'Mot de passe incorrect' : 'كلمة مرور خاطئة',
        variant: 'destructive',
      });
    }
  };

  const handleQuoteClick = () => {
    if (quoteUrl) {
      window.open(quoteUrl, '_blank');
    }
  };

  return (
    <>
      <footer className="bg-primary text-primary-foreground">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl">ARKAN</span>
                  <span className="text-xs opacity-80 -mt-1">Open</span>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${phone}`} className="hover:text-accent transition-colors">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{address}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {language === 'fr' ? 'Liens Rapides' : 'روابط سريعة'}
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href}
                      className="text-sm opacity-90 hover:text-accent transition-colors hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {language === 'fr' ? 'Nos Services' : 'خدماتنا'}
              </h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-sm opacity-90">{service.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {language === 'fr' ? 'Suivez-nous' : 'تابعنا'}
              </h3>
              <div className="flex gap-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
              
              <Button 
                onClick={handleQuoteClick}
                variant="outline" 
                className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                {t('btn.quote')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-90">
              <div>
                © 2024 ARKAN Open. {t('footer.rights')}.
              </div>
              
              {/* Admin Access Button */}
              <button
                onClick={() => setShowAdminDialog(true)}
                className="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
              >
                <Settings className="w-3 h-3" />
                {t('footer.customize')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Access Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Accès Administration' : 'دخول الإدارة'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {language === 'fr' ? 'Mot de passe' : 'كلمة المرور'}
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'fr' ? 'Entrez le mot de passe' : 'أدخل كلمة المرور'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAdminAccess();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAdminDialog(false)}
                className="flex-1"
              >
                {language === 'fr' ? 'Annuler' : 'إلغاء'}
              </Button>
              <Button
                onClick={handleAdminAccess}
                className="flex-1 btn-arkan"
              >
                {language === 'fr' ? 'Accéder' : 'دخول'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;