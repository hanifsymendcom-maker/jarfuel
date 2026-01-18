import { supabase, isSupabaseConfigured } from "./supabase";
import type { WaitlistEntry } from "./database.types";
import { nanoid } from "nanoid";

// Local storage fallback for when Supabase is not configured
const LOCAL_STORAGE_KEY = "jarfuel_waitlist";
const LOCAL_USER_KEY = "jarfuel_user";

interface LocalWaitlistData {
  entries: WaitlistEntry[];
  lastUpdated: string;
}

// Generate a unique referral code
export const generateReferralCode = (): string => {
  return `JF-${nanoid(8).toUpperCase()}`;
};

// Get local storage data
const getLocalData = (): LocalWaitlistData => {
  if (typeof window === "undefined") {
    return { entries: [], lastUpdated: new Date().toISOString() };
  }
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { entries: [], lastUpdated: new Date().toISOString() };
};

// Save to local storage
const saveLocalData = (data: LocalWaitlistData) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// Get current user from local storage
export const getCurrentUser = (): WaitlistEntry | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(LOCAL_USER_KEY);
  return data ? JSON.parse(data) : null;
};

// Save current user to local storage
const saveCurrentUser = (user: WaitlistEntry) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
};

// Join the waitlist
export const joinWaitlist = async (
  email: string,
  referredBy?: string | null,
  source?: string
): Promise<{ success: boolean; data?: WaitlistEntry; error?: string }> => {
  const referralCode = generateReferralCode();

  if (isSupabaseConfigured() && supabase) {
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from("waitlist")
        .select("*")
        .eq("email", email.toLowerCase())
        .single();

      if (existing) {
        const existingEntry = existing as unknown as WaitlistEntry;
        saveCurrentUser(existingEntry);
        return { success: true, data: existingEntry };
      }

      // Get current count for position
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      const position = (count || 0) + 1;

      // Insert new entry
      const { data, error } = await supabase
        .from("waitlist")
        .insert({
          email: email.toLowerCase(),
          referral_code: referralCode,
          referred_by: referredBy || null,
          source: source || "website",
        } as never)
        .select()
        .single();

      if (error) throw error;

      // If referred by someone, increment their referral count
      if (referredBy) {
        await supabase.rpc("increment_referral_count", {
          code: referredBy,
        } as never);
      }

      const entry = { ...(data as unknown as WaitlistEntry), position, referral_count: 0 };
      saveCurrentUser(entry);
      return { success: true, data: entry };
    } catch (error: unknown) {
      console.error("Supabase error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to join waitlist";
      return { success: false, error: errorMessage };
    }
  }

  // Local storage fallback
  const localData = getLocalData();
  const existingIndex = localData.entries.findIndex(
    (e) => e.email.toLowerCase() === email.toLowerCase()
  );

  if (existingIndex >= 0) {
    const existing = localData.entries[existingIndex];
    saveCurrentUser(existing);
    return { success: true, data: existing };
  }

  const newEntry: WaitlistEntry = {
    id: nanoid(),
    email: email.toLowerCase(),
    referral_code: referralCode,
    referred_by: referredBy || null,
    referral_count: 0,
    position: localData.entries.length + 1,
    created_at: new Date().toISOString(),
    source: source || "website",
  };

  // Increment referrer's count
  if (referredBy) {
    const referrerIndex = localData.entries.findIndex(
      (e) => e.referral_code === referredBy
    );
    if (referrerIndex >= 0) {
      localData.entries[referrerIndex].referral_count += 1;
    }
  }

  localData.entries.push(newEntry);
  localData.lastUpdated = new Date().toISOString();
  saveLocalData(localData);
  saveCurrentUser(newEntry);

  return { success: true, data: newEntry };
};

// Get waitlist count
export const getWaitlistCount = async (): Promise<number> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Error fetching count:", error);
      return 0;
    }
  }

  // Local storage fallback
  const localData = getLocalData();
  return localData.entries.length;
};

// Get user's position
export const getUserPosition = async (
  email: string
): Promise<number | null> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("position")
        .eq("email", email.toLowerCase())
        .single();

      if (error) throw error;
      const entry = data as unknown as { position: number };
      return entry?.position || null;
    } catch {
      return null;
    }
  }

  // Local storage fallback
  const localData = getLocalData();
  const entry = localData.entries.find(
    (e) => e.email.toLowerCase() === email.toLowerCase()
  );
  return entry?.position || null;
};

// Get referral stats for a user
export const getReferralStats = async (
  referralCode: string
): Promise<{ count: number; position: number } | null> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("referral_count, position")
        .eq("referral_code", referralCode)
        .single();

      if (error) throw error;
      const entry = data as unknown as { referral_count: number; position: number };
      return {
        count: entry?.referral_count || 0,
        position: entry?.position || 0,
      };
    } catch {
      return null;
    }
  }

  // Local storage fallback
  const localData = getLocalData();
  const entry = localData.entries.find((e) => e.referral_code === referralCode);
  return entry
    ? { count: entry.referral_count, position: entry.position }
    : null;
};

// Get all waitlist entries (for admin)
export const getAllEntries = async (): Promise<WaitlistEntry[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as unknown as WaitlistEntry[]) || [];
    } catch (error) {
      console.error("Error fetching entries:", error);
      return [];
    }
  }

  // Local storage fallback
  const localData = getLocalData();
  return [...localData.entries].reverse();
};

// Subscribe to real-time updates (Supabase only)
export const subscribeToWaitlist = (
  callback: (count: number) => void
): (() => void) => {
  if (isSupabaseConfigured() && supabase) {
    const channel = supabase
      .channel("waitlist_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "waitlist" },
        async () => {
          const count = await getWaitlistCount();
          callback(count);
        }
      )
      .subscribe();

    return () => {
      supabase!.removeChannel(channel);
    };
  }

  // No-op for local storage
  return () => {};
};

// Get referral code from URL
export const getReferralFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
};

// Generate shareable referral URL
export const getReferralUrl = (referralCode: string): string => {
  if (typeof window === "undefined") return "";
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralCode}`;
};
