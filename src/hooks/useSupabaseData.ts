import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

// Products hook
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Projects hook
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Site content hook
export const useSiteContent = (page?: string) => {
  return useQuery({
    queryKey: ['site-content', page],
    queryFn: async () => {
      let query = supabase.from('site_content').select('*');
      
      if (page) {
        query = query.eq('page', page);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Site colors hook
export const useSiteColors = () => {
  return useQuery({
    queryKey: ['site-colors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_colors')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Social links hook
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Admin settings hook
export const useAdminSettings = (settingKey?: string) => {
  return useQuery({
    queryKey: ['admin-settings', settingKey],
    queryFn: async () => {
      let query = supabase.from('admin_settings').select('*');
      
      if (settingKey) {
        query = query.eq('setting_key', settingKey);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Helper hook to get content by key
export const useContentByKey = (contentKey: string, page = 'general') => {
  const { language } = useLanguage();
  const { data: content } = useSiteContent(page);
  
  const item = content?.find(c => c.content_key === contentKey);
  return item ? item[`content_${language}` as keyof typeof item] as string : '';
};

// Quote submission mutation
export const useSubmitQuote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (quoteData: any) => {
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};

// Discount request mutation
export const useSubmitDiscountRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (requestData: any) => {
      const { data, error } = await supabase
        .from('discount_requests')
        .insert([requestData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount-requests'] });
    },
  });
};