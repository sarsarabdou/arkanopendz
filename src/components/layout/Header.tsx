import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSocialLinks, useContentByKey } from '@/hooks/useSupabaseData';
import { Menu, X, Phone, Globe, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import arkanLogo from '@/assets/arkan-logo.png';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const { data: socialLinks } = useSocialLinks();
  const phone = useContentByKey('company_phone', 'contact');
  const quoteUrl = useContentByKey('quote_app_url', 'general');

  const navigation = [
    { href: '/', label: t('nav.home'), key: 'home' },
    { href: '/products', label: t('nav.products'), key: 'products' },
    { href: '/projects', label: t('nav.projects'), key: 'projects' },
    { href: '/about', label: t('nav.about'), key: 'about' },
    { href: '/contact', label: t('nav.contact'), key: 'contact' },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'tiktok': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      );
      default: return null;
    }
  };

  const handleQuoteClick = () => {
    window.open('https://arkanopen-15.lovable.app/', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hero-gradient text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${phone}`} className="hover:text-accent transition-colors">
                {phone}
              </a>
            </div>
            <div className="hidden md:block">
              {t('hero.coverage')}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Social Links */}
            {socialLinks?.slice(0, 4).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-l border-primary-foreground/20 pl-3">
              <Globe className="w-4 h-4" />
              <button
                onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
                className="hover:text-accent transition-colors font-medium"
              >
                {language === 'fr' ? 'عربي' : 'FR'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={arkanLogo} alt="ARKAN Open" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">ARKAN</span>
              <span className="text-xs text-muted-foreground -mt-1">Open</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActivePage(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleQuoteClick}
              className="btn-arkan hidden md:flex"
            >
              {t('hero.cta')}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-border hover:bg-accent/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-3 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-accent/10 rounded-lg",
                    isActivePage(item.href)
                      ? "text-primary bg-accent/10"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                onClick={handleQuoteClick}
                className="btn-arkan mx-4 mt-4"
              >
                {t('hero.cta')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;