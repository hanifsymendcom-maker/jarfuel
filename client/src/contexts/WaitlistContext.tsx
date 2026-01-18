import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { addToWaitlist, getWaitlistCount, type WaitlistEntry } from '@/lib/supabase';

interface WaitlistContextType {
  count: number;
  goal: number;
  progress: number;
  isLoading: boolean;
  hasSubmitted: boolean;
  selectedFlavor: 'vanilla' | 'chocolate';
  withCoffee: boolean;
  setSelectedFlavor: (flavor: 'vanilla' | 'chocolate') => void;
  setWithCoffee: (withCoffee: boolean) => void;
  submitEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshCount: () => Promise<void>;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(147);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<'vanilla' | 'chocolate'>('vanilla');
  const [withCoffee, setWithCoffee] = useState(true);

  const goal = 250;

  // Load initial count and check if user has already submitted
  useEffect(() => {
    const checkSubmission = localStorage.getItem('jarfuel_waitlist_submitted');
    if (checkSubmission) {
      setHasSubmitted(true);
    }

    // Load saved preferences
    const savedFlavor = localStorage.getItem('jarfuel_flavor') as 'vanilla' | 'chocolate';
    const savedCoffee = localStorage.getItem('jarfuel_coffee');
    if (savedFlavor) setSelectedFlavor(savedFlavor);
    if (savedCoffee !== null) setWithCoffee(savedCoffee === 'true');

    refreshCount();
  }, []);

  const refreshCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const newCount = await getWaitlistCount();
      setCount(newCount);
    } catch (error) {
      console.error('Failed to refresh count:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitEmail = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    const entry: Omit<WaitlistEntry, 'id' | 'created_at'> = {
      email,
      flavor: selectedFlavor,
      with_coffee: withCoffee,
    };

    const result = await addToWaitlist(entry);

    if (result.success) {
      setHasSubmitted(true);
      localStorage.setItem('jarfuel_waitlist_submitted', 'true');
      localStorage.setItem('jarfuel_flavor', selectedFlavor);
      localStorage.setItem('jarfuel_coffee', String(withCoffee));
      // Optimistically update count
      setCount(prev => prev + 1);
    }

    return result;
  }, [selectedFlavor, withCoffee]);

  const progress = Math.min(Math.round((count / goal) * 100), 100);

  return (
    <WaitlistContext.Provider
      value={{
        count,
        goal,
        progress,
        isLoading,
        hasSubmitted,
        selectedFlavor,
        withCoffee,
        setSelectedFlavor,
        setWithCoffee,
        submitEmail,
        refreshCount,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}
