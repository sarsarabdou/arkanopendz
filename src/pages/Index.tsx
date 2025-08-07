import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import QuoteSection from '@/components/home/QuoteSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ProjectsShowcase />
      <QuoteSection />
    </Layout>
  );
};

export default Index;
