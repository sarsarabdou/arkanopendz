export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      discount_requests: {
        Row: {
          client_name: string
          client_phone: string
          created_at: string
          id: string
          product_quantity: number
          status: string
          updated_at: string
        }
        Insert: {
          client_name: string
          client_phone: string
          created_at?: string
          id?: string
          product_quantity: number
          status?: string
          updated_at?: string
        }
        Update: {
          client_name?: string
          client_phone?: string
          created_at?: string
          id?: string
          product_quantity?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text_ar: string | null
          alt_text_fr: string | null
          category: string
          created_at: string
          description_ar: string | null
          description_fr: string | null
          file_size: number | null
          filename: string
          height: number | null
          id: string
          mime_type: string | null
          tags: string[] | null
          url: string
          width: number | null
        }
        Insert: {
          alt_text_ar?: string | null
          alt_text_fr?: string | null
          category?: string
          created_at?: string
          description_ar?: string | null
          description_fr?: string | null
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          mime_type?: string | null
          tags?: string[] | null
          url: string
          width?: number | null
        }
        Update: {
          alt_text_ar?: string | null
          alt_text_fr?: string | null
          category?: string
          created_at?: string
          description_ar?: string | null
          description_fr?: string | null
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          tags?: string[] | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      product_configs: {
        Row: {
          config_data: Json
          config_key: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          config_data: Json
          config_key: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          config_data?: Json
          config_key?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          advantages_ar: string[] | null
          advantages_fr: string[] | null
          applications_ar: string[] | null
          applications_fr: string[] | null
          category: string
          created_at: string
          description_ar: string
          description_fr: string
          id: string
          images: string[] | null
          is_active: boolean
          name_ar: string
          name_fr: string
          region_restriction: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          advantages_ar?: string[] | null
          advantages_fr?: string[] | null
          applications_ar?: string[] | null
          applications_fr?: string[] | null
          category: string
          created_at?: string
          description_ar: string
          description_fr: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          name_ar: string
          name_fr: string
          region_restriction?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          advantages_ar?: string[] | null
          advantages_fr?: string[] | null
          applications_ar?: string[] | null
          applications_fr?: string[] | null
          category?: string
          created_at?: string
          description_ar?: string
          description_fr?: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          name_ar?: string
          name_fr?: string
          region_restriction?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client_name: string | null
          client_testimonial_ar: string | null
          client_testimonial_fr: string | null
          completion_date: string | null
          created_at: string
          description_ar: string
          description_fr: string
          featured: boolean
          id: string
          images: string[] | null
          location: string
          status: string
          title_ar: string
          title_fr: string
          updated_at: string
        }
        Insert: {
          category: string
          client_name?: string | null
          client_testimonial_ar?: string | null
          client_testimonial_fr?: string | null
          completion_date?: string | null
          created_at?: string
          description_ar: string
          description_fr: string
          featured?: boolean
          id?: string
          images?: string[] | null
          location: string
          status?: string
          title_ar: string
          title_fr: string
          updated_at?: string
        }
        Update: {
          category?: string
          client_name?: string | null
          client_testimonial_ar?: string | null
          client_testimonial_fr?: string | null
          completion_date?: string | null
          created_at?: string
          description_ar?: string
          description_fr?: string
          featured?: boolean
          id?: string
          images?: string[] | null
          location?: string
          status?: string
          title_ar?: string
          title_fr?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          client_address: string
          client_full_name: string
          client_phone: string
          created_at: string
          id: string
          products: Json
          status: string
          total_price: number
          updated_at: string
        }
        Insert: {
          client_address: string
          client_full_name: string
          client_phone: string
          created_at?: string
          id?: string
          products: Json
          status?: string
          total_price: number
          updated_at?: string
        }
        Update: {
          client_address?: string
          client_full_name?: string
          client_phone?: string
          created_at?: string
          id?: string
          products?: Json
          status?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_colors: {
        Row: {
          category: string
          color_name: string
          color_value: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          category?: string
          color_name: string
          color_value: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          category?: string
          color_name?: string
          color_value?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_ar: string
          content_fr: string
          content_key: string
          content_type: string
          created_at: string
          id: string
          page: string
          updated_at: string
        }
        Insert: {
          content_ar: string
          content_fr: string
          content_key: string
          content_type?: string
          created_at?: string
          id?: string
          page?: string
          updated_at?: string
        }
        Update: {
          content_ar?: string
          content_fr?: string
          content_key?: string
          content_type?: string
          created_at?: string
          id?: string
          page?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          icon: string
          id: string
          is_active: boolean
          platform: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          is_active?: boolean
          platform: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          is_active?: boolean
          platform?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
