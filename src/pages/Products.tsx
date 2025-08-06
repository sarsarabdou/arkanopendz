import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Building, MapPin, Star } from 'lucide-react';

const Products = () => {
  const { language, t } = useLanguage();
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t('products.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {product[`name_${language}` as keyof typeof product] as string}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building className="w-4 h-4" />
                      {product.category}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{t('products.available')}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Product Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                  <Building className="w-16 h-16 text-primary/40" />
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product[`description_${language}` as keyof typeof product] as string}
                </p>
                
                {/* Advantages */}
                {product[`advantages_${language}` as keyof typeof product] && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t('products.advantages')}:</h4>
                    <div className="flex flex-wrap gap-1">
                      {(product[`advantages_${language}` as keyof typeof product] as string[])?.slice(0, 3).map((advantage, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {advantage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Coverage */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{t('products.coverage')}</span>
                </div>
                
                {/* CTA Button */}
                <Button className="w-full btn-arkan">
                  {t('btn.quote')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {t('products.empty')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('products.empty_description')}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;