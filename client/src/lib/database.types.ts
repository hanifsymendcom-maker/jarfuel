export interface WaitlistEntry {
  id: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
  position: number;
  created_at: string;
  source: string | null;
}

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistEntry;
        Insert: Omit<WaitlistEntry, "id" | "created_at" | "position" | "referral_count">;
        Update: Partial<WaitlistEntry>;
      };
    };
  };
}
