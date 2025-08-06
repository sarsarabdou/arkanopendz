import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(React.lazy(() => import('./pages/Products')))}
              </React.Suspense>
            } />
            <Route path="/projects" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(React.lazy(() => import('./pages/Projects')))}
              </React.Suspense>
            } />
            <Route path="/about" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(React.lazy(() => import('./pages/About')))}
              </React.Suspense>
            } />
            <Route path="/contact" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(React.lazy(() => import('./pages/Contact')))}
              </React.Suspense>
            } />
            <Route path="/admin" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {React.createElement(React.lazy(() => import('./pages/Admin')))}
              </React.Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
