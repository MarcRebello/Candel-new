
import { createClient } from '@supabase/supabase-js';

/**
 * OPTION A: Environment Variables (Best Practice)
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel or your .env file.
 */
const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

/**
 * OPTION B: Hardcoding (Quick Fix)
 * If you can't get environment variables to work, paste your strings here:
 * const supabaseUrl = 'https://your-id.supabase.co';
 * const supabaseAnonKey = 'your-long-key';
 */
const supabaseUrl = envUrl || ''; // PASTE YOUR URL HERE IF NOT USING ENV VARS
const supabaseAnonKey = envKey || ''; // PASTE YOUR KEY HERE IF NOT USING ENV VARS

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const fetchReviews = async () => {
  if (!supabase) {
    console.warn("Supabase not initialized. Check your URL/Key.");
    return [];
  }
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const submitReview = async (review: { text: string; author?: string; location?: string }) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select();
  if (error) throw error;
  return data;
};
