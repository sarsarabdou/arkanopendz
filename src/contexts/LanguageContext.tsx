import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Simple translations object - in production this would come from Supabase
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { fr: 'Accueil', ar: 'الرئيسية' },
  'nav.products': { fr: 'Produits', ar: 'المنتجات' },
  'nav.projects': { fr: 'Projets', ar: 'المشاريع' },
  'nav.about': { fr: 'À Propos', ar: 'من نحن' },
  'nav.quote': { fr: 'Devis', ar: 'عرض السعر' },
  'nav.contact': { fr: 'Contact', ar: 'اتصل بنا' },
  
  // Pages
  'products.title': { fr: 'Nos Produits', ar: 'منتجاتنا' },
  'projects.title': { fr: 'Projets Réalisés', ar: 'المشاريع المنجزة' },
  'about.title': { fr: 'Qui Nous Sommes', ar: 'من نحن' },
  'contact.title': { fr: 'Contactez-Nous', ar: 'اتصل بنا' },
  
  // Hero Section
  'hero.title': { fr: 'Votre partenaire de confiance en menuiserie aluminium et PVC', ar: 'شريكك الموثوق في نجارة الألمنيوم و البي في سي' },
  'hero.subtitle': { fr: 'Solutions sur mesure, qualité professionnelle. Basés à Oran, nous servons toute l\'Algérie', ar: 'حلول مخصصة، جودة مهنية. مقرنا في وهران، نخدم كامل الجزائر' },
  'hero.cta': { fr: 'Obtenez votre devis gratuit', ar: 'احصل على عرض السعر المجاني' },
  'hero.coverage': { fr: 'Service dans les 58 wilayas d\'Algérie', ar: 'خدمة في 58 ولاية جزائرية' },
  
  // Common
  'common.phone': { fr: '+213 773 09 88 20', ar: '+213 773 09 88 20' },
  'common.address': { fr: 'Oran, Algérie', ar: 'وهران، الجزائر' },
  'common.whatsapp': { fr: 'WhatsApp', ar: 'واتساب' },
  'common.loading': { fr: 'Chargement...', ar: 'جاري التحميل...' },
  
  // Buttons
  'btn.quote': { fr: 'Demander un devis', ar: 'طلب عرض سعر' },
  'btn.viewMore': { fr: 'Voir plus', ar: 'عرض المزيد' },
  'btn.contactUs': { fr: 'Contactez-nous', ar: 'اتصل بنا' },
  
  // Footer
  'footer.customize': { fr: 'Personnaliser', ar: 'تخصيص' },
  'footer.rights': { fr: 'Tous droits réservés', ar: 'جميع الحقوق محفوظة' },
  
  // Services
  'services.title': { fr: 'Nos Services', ar: 'خدماتنا' },
  'services.subtitle': { fr: 'Solutions complètes pour tous vos besoins en menuiserie', ar: 'حلول شاملة لجميع احتياجاتك في النجارة' }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Get saved language from localStorage or default to French
    const savedLanguage = localStorage.getItem('arkan-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('arkan-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};