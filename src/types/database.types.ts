export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          id: string
          image_url: string
          provider: string
          status: string
          title: string
          url: string
          user_id: string
        }
        Insert: {
          created_at: string
          id?: string
          image_url: string
          provider: string
          status: string
          title: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          provider?: string
          status?: string
          title?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      discord_server_channels: {
        Row: {
          channel_id: string | null
          guild_id: string
        }
        Insert: {
          channel_id?: string | null
          guild_id: string
        }
        Update: {
          channel_id?: string | null
          guild_id?: string
        }
        Relationships: []
      }
      discord_server_users: {
        Row: {
          guild_id: string
          is_active: boolean
          user_id: string
        }
        Insert: {
          guild_id: string
          is_active?: boolean
          user_id: string
        }
        Update: {
          guild_id?: string
          is_active?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discord_server_users_guild_id_fkey"
            columns: ["guild_id"]
            referencedRelation: "discord_server_channels"
            referencedColumns: ["guild_id"]
          },
          {
            foreignKeyName: "discord_server_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          created_at: string
          data: Json | null
          name: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          name: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          name?: string
        }
        Relationships: []
      }
      user_providers: {
        Row: {
          created_at: string
          id: string
          provider_type: string | null
          provider_user_id: string | null
          provider_user_name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          provider_type?: string | null
          provider_user_id?: string | null
          provider_user_name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          provider_type?: string | null
          provider_user_id?: string | null
          provider_user_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_providers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          anilist_id: number | null
          created_at: string
          discord_id: string | null
          id: string
          name: string | null
        }
        Insert: {
          anilist_id?: number | null
          created_at?: string
          discord_id?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          anilist_id?: number | null
          created_at?: string
          discord_id?: string | null
          id?: string
          name?: string | null
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
