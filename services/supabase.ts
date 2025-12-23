
import { createClient } from '@supabase/supabase-js';

/**
 * PASTE YOUR KEYS HERE
 * Note: supabaseUrl must start with "https://"
 * Note: supabaseAnonKey is usually a long string starting with "eyJ..."
 */
const supabaseUrl = 'sb_publishable_CY-0bKfY356kD-_VDuNAsw_tgSTs6t3'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbXRza2JuanhwdXdzaW9jeGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDg2MTQsImV4cCI6MjA4MjA4NDYxNH0.EhrRBUJSSRuET3auYWIx5Gl7yOJ1Z04d-XHYC33zTwE';

// Only initialize if both URL and Key are provided and valid
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const fetchTestimonials = async () => {
  if (!supabase) {
    console.warn('Supabase is not configured. Returning default data.');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
};

export const submitTestimonial = async (testimonial: { author: string; location: string; content: string }) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please paste your URL and Anon Key in services/supabase.ts');
  }
  
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select();
  
  if (error) throw error;
  return data;
};
