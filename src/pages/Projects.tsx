import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProjects } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, User, Quote } from 'lucide-react';

const Projects = () => {
  const { language, t } = useLanguage();
  const { data: projects, isLoading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(projects?.map(p => p.category) || [])];
  
  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects?.filter(p => p.category === selectedCategory);

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
                  <Skeleton className="h-48 w-full mb-4" />
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
            {language === 'fr' ? 'Nos Projets Réalisés' : 'مشاريعنا المنجزة'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez nos réalisations à travers toute l\'Algérie'
              : 'اكتشف إنجازاتنا عبر كامل الجزائر'
            }
          </p>
        </div>

        {/* Category Filters */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-auto md:flex md:justify-center gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' 
                  ? (language === 'fr' ? 'Tous' : 'الكل') 
                  : category
                }
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects?.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {project[`title_${language}` as keyof typeof project] as string}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{project.category}</Badge>
                      {project.featured && (
                        <Badge variant="default" className="bg-primary">
                          {language === 'fr' ? 'Vedette' : 'مميز'}
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                  <img 
                    src={'/placeholder-project.jpg'}
                    alt={project[`title_${language}` as keyof typeof project] as string}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-primary">
                          {(project[`title_${language}` as keyof typeof project] as string)?.[0]}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'fr' ? 'Image du projet' : 'صورة المشروع'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="space-y-3">
                  {/* Location & Date */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    {project.completion_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.completion_date).getFullYear()}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project[`description_${language}` as keyof typeof project] as string}
                  </p>
                  
                  {/* Client Testimonial */}
                  {project.client_testimonial_fr && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm italic">
                            "{project[`client_testimonial_${language}` as keyof typeof project] as string}"
                          </p>
                          {project.client_name && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {project.client_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* CTA Button */}
                <Button className="w-full btn-arkan">
                  {language === 'fr' ? 'Voir les détails' : 'عرض التفاصيل'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProjects?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {language === 'fr' ? 'Aucun projet trouvé' : 'لم يتم العثور على مشاريع'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'fr' 
                ? 'Aucun projet disponible dans cette catégorie'
                : 'لا توجد مشاريع متاحة في هذه الفئة'
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;