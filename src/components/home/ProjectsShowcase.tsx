import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProjects } from '@/hooks/useSupabaseData';
import { MapPin, Calendar, Star, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsShowcase = () => {
  const { language, t } = useLanguage();
  const { data: projects, isLoading } = useProjects();

  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            <Star className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Projets Réalisés' : 'المشاريع المنجزة'}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === 'fr' ? 'Nos Réalisations' : 'إنجازاتنا'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez nos projets les plus remarquables à travers l\'Algérie'
              : 'اكتشف مشاريعنا الأكثر تميزاً عبر الجزائر'
            }
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <Card key={project.id} className="card-arkan group overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                {/* Project image with fallback */}
                <img 
                  src={project.images && project.images.length > 0 ? project.images[0] : `/placeholder-${index + 1}.jpg`}
                  alt={language === 'fr' ? project.title_fr : project.title_ar}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center" style={{ display: 'none' }}>
                  <Eye className="w-12 h-12 text-white/80" />
                </div>
                
                {/* Category Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 bg-white/90 text-primary"
                >
                  {project.category}
                </Badge>

                {/* Featured Badge */}
                {project.featured && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 right-4 bg-warning text-white"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {language === 'fr' ? 'Vedette' : 'مميز'}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? project.title_fr : project.title_ar}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {language === 'fr' ? project.description_fr : project.description_ar}
                </p>

                {/* Project Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  {project.completion_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(project.completion_date).toLocaleDateString(
                          language === 'fr' ? 'fr-FR' : 'ar-DZ'
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Client Testimonial */}
                {project.client_testimonial_fr && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-sm italic mb-2">
                      "{language === 'fr' ? project.client_testimonial_fr : project.client_testimonial_ar}"
                    </p>
                    {project.client_name && (
                      <p className="text-xs text-muted-foreground font-medium">
                        - {project.client_name}
                      </p>
                    )}
                  </div>
                )}

                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link to="/projects">
                    {language === 'fr' ? 'Voir les détails' : 'عرض التفاصيل'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            {language === 'fr' 
              ? 'Découvrez tous nos projets et laissez-vous inspirer'
              : 'اكتشف جميع مشاريعنا ودع نفسك تلهم'
            }
          </p>
          <Button asChild className="btn-arkan">
            <Link to="/projects">
              {language === 'fr' ? 'Voir tous les projets' : 'عرض جميع المشاريع'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;