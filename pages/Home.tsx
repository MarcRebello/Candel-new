
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../constants';
import { fetchTestimonials, submitTestimonial, supabase } from '../services/supabase';
import { Testimonial } from '../types';

const ReviewModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void }> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ author: '', location: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      alert('Please configure your Supabase URL and Anon Key in the environment settings to enable reviews.');
      return;
    }
    setSubmitting(true);
    try {
      await submitTestimonial(formData);
      onSuccess();
      onClose();
      setFormData({ author: '', location: '', content: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit review. Check your table schema and RLS policies.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#faf9f6] w-full max-w-lg p-10 shadow-2xl overflow-hidden"
          >
            <h3 className="text-3xl font-serif text-neutral-900 mb-8">Share your experience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Your Name</label>
                <input 
                  required
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full border-b border-neutral-200 py-2 focus:border-neutral-900 outline-none transition-colors"
                  placeholder="Eleanor Vance"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Location</label>
                <input 
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border-b border-neutral-200 py-2 focus:border-neutral-900 outline-none transition-colors"
                  placeholder="London, UK"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Review</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none transition-colors resize-none"
                  placeholder="Tell us about the scent throw, burn quality, or mood..."
                />
              </div>
              <div className="flex justify-end space-x-6 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={submitting}
                  className="bg-neutral-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-800 disabled:bg-neutral-400 transition-all"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Home: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials();
      if (data && data.length > 0) {
        // Merge fetched data with defaults or just use fetched data
        setTestimonials([...data, ...DEFAULT_TESTIMONIALS].slice(0, 6));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, showing default testimonials:', err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#faf9f6]">
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadTestimonials} 
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541832069-e4f383392e1d?q=80&w=2000" 
            alt="Candle Hero" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#faf9f6]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1 }}
            className="text-xs uppercase text-white mb-8 block font-medium"
          >
            Artisanal Fragrance House
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-9xl font-serif text-white mb-12 leading-tight"
          >
            The Art of <br /> Atmosphere
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button 
              onClick={() => scrollToSection('collection')}
              className="inline-block px-12 py-5 bg-white text-neutral-900 text-xs tracking-[0.3em] uppercase hover:bg-neutral-100 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Explore Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="max-w-7xl mx-auto px-6 py-32 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-neutral-400 mb-8">Our Philosophy</h2>
            <p className="text-4xl md:text-5xl font-serif text-neutral-900 leading-tight mb-8">
              Sustainably sourced. <br /> Hand-poured in London. <br /> Designed to inspire.
            </p>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
              We believe a candle is more than just a scent. It is a vessel for memory, a catalyst for calm, and a piece of functional art for your sanctuary.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-neutral-200 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000" 
              alt="Artisanal Process" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Signature Collection */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.4em] text-neutral-400 mb-6">Signature Collection</h2>
          <h3 className="text-5xl font-serif text-neutral-900">The Core Fragrances</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 mb-8">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-end">
                <div className="max-w-md">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 block">{product.category}</span>
                  <h3 className="text-3xl font-serif mb-4">{product.name}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6 italic">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map(note => (
                      <span key={note} className="text-[10px] uppercase tracking-widest border border-neutral-200 px-3 py-1 text-neutral-400">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-serif mb-4">${product.price}</p>
                  <button className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                    Inquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-neutral-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="mb-8 md:mb-0">
              <h2 className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-6">Testimonials</h2>
              <h3 className="text-5xl font-serif">Kind Words</h3>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-white text-neutral-900 text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-100 transition-all"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col justify-between"
              >
                <p className="text-xl font-serif italic leading-relaxed mb-12 text-neutral-300">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="text-sm uppercase tracking-widest font-medium mb-1">{testimonial.author}</p>
                  <p className="text-xs text-neutral-500 tracking-wide">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
