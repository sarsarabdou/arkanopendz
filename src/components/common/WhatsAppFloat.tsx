import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminSettings } from '@/hooks/useSupabaseData';
import { cn } from '@/lib/utils';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { language, t } = useLanguage();
  const { data: settings } = useAdminSettings();
  
  const whatsappNumber = settings?.find(s => s.setting_key === 'whatsapp_number')?.setting_value || '+213773098820';
  const whatsappMessage = settings?.find(s => s.setting_key === 'whatsapp_message')?.setting_value || 'Bonjour, je suis intéressé par vos services';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after a delay
      setTimeout(() => setShowTooltip(true), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className={cn(
          "absolute bottom-full mb-4 bg-card border border-border rounded-lg shadow-lg p-3 max-w-xs transition-all duration-300",
          language === 'ar' ? 'right-0' : 'left-0'
        )}>
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-medium mb-1">
            {language === 'fr' ? 'Besoin d\'aide ?' : 'تحتاج مساعدة؟'}
          </p>
          <p className="text-xs text-muted-foreground">
            {language === 'fr' 
              ? 'Contactez-nous sur WhatsApp pour un devis gratuit'
              : 'اتصل بنا على واتساب للحصول على عرض سعر مجاني'
            }
          </p>
          <div className={cn(
            "absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border",
            language === 'ar' ? 'right-4' : 'left-4'
          )} />
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 float-animation"
        aria-label={t('common.whatsapp')}
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        
        {/* Hover Tooltip */}
        <div className={cn(
          "absolute bottom-full mb-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap",
          language === 'ar' ? 'right-0' : 'left-0'
        )}>
          {t('common.whatsapp')}
        </div>
      </button>
    </div>
  );
};

export default WhatsAppFloat;