import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ProductsGallery from '@/components/home/ProductsGallery';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import QuoteSection from '@/components/home/QuoteSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductsGallery />
      <ServicesSection />
      <ProjectsShowcase />
      <QuoteSection />
    </Layout>
  );
};

export default Index;
