import React from 'react';
import { useProducts } from '@/hooks/useSupabaseData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsGallery = () => {
  const { data: products, isLoading } = useProducts();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Nos Produits' : 'منتجاتنا'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez notre gamme complète de produits en aluminium et PVC'
              : 'اكتشف مجموعتنا الكاملة من منتجات الألومنيوم والـ PVC'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.images?.[0] || '/placeholder.svg'}
                    alt={language === 'fr' ? product.name_fr : product.name_ar}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-center text-foreground group-hover:text-primary transition-colors">
                    {language === 'fr' ? product.name_fr : product.name_ar}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGallery;