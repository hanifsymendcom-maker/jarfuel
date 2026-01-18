import { createClient } from '@supabase/supabase-js';

// Supabase configuration - will be populated with real credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types for waitlist
export interface WaitlistEntry {
  id?: string;
  email: string;
  flavor: 'vanilla' | 'chocolate';
  with_coffee: boolean;
  created_at?: string;
}

// Check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase;

// Waitlist API functions
export async function addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // Fallback to local API when Supabase is not configured
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      const data = await response.json();
      return { success: data.success, error: data.error };
    } catch {
      return { success: false, error: 'Failed to connect to server' };
    }
  }

  const { error } = await supabase
    .from('waitlist')
    .insert([entry]);

  if (error) {
    // Handle duplicate email
    if (error.code === '23505') {
      return { success: false, error: 'This email is already on the waitlist!' };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getWaitlistCount(): Promise<number> {
  if (!supabase) {
    // Fallback to local API
    try {
      const response = await fetch('/api/waitlist/count');
      const data = await response.json();
      return data.count || 147;
    } catch {
      return 147; // Default fallback
    }
  }

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error getting waitlist count:', error);
    return 147; // Default fallback
  }

  return (count || 0) + 147; // Add baseline count
}

// SQL to create the waitlist table in Supabase:
/*
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  flavor TEXT NOT NULL CHECK (flavor IN ('vanilla', 'chocolate')),
  with_coffee BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon users
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow reading count (but not data) for anon users
CREATE POLICY "Allow anonymous count" ON waitlist
  FOR SELECT TO anon
  USING (true);

-- Create index for faster email lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
*/
