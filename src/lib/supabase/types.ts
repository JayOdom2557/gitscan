export interface Database {
  public: {
    Tables: {
      repos: {
        Row: {
          id: string;
          slug: string;
          owner: string;
          name: string;
          full_name: string;
          description: string | null;
          language: string | null;
          stars: number;
          forks: number;
          watchers: number;
          open_issues: number;
          topics: string[];
          html_url: string;
          avatar_url: string;
          homepage: string | null;
          license: string | null;
          momentum_score: number;
          category: string;
          tracked_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['repos']['Row'], 'id' | 'tracked_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['repos']['Insert']>;
      };
      signals: {
        Row: {
          id: string;
          repo_id: string;
          score: number;
          star_velocity: number;
          fork_velocity: number;
          issue_activity: number;
          commit_frequency: number;
          trend: 'rising' | 'stable' | 'declining';
          computed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['signals']['Row'], 'id' | 'computed_at'>;
        Update: Partial<Database['public']['Tables']['signals']['Insert']>;
      };
      wallets: {
        Row: {
          id: string;
          address: string;
          chain_id: number;
          display_name: string | null;
          connected_at: string;
          last_seen_at: string;
        };
        Insert: Omit<Database['public']['Tables']['wallets']['Row'], 'id' | 'connected_at' | 'last_seen_at'>;
        Update: Partial<Database['public']['Tables']['wallets']['Insert']>;
      };
      boosts: {
        Row: {
          id: string;
          wallet_id: string;
          repo_id: string;
          amount: number;
          tx_hash: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['boosts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['boosts']['Insert']>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
