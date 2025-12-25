
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchReviews, submitReview, supabase } from '../services/supabase';

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    try {
      await submitReview({ text: newReview, author: 'Anonymous' });
      setNewReview('');
      loadData();
    } catch (err) {
      alert("Error submitting review. Check your Supabase RLS policies.");
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-serif text-neutral-900 mb-4">Guest Book</h1>
          <p className="text-neutral-500 uppercase tracking-widest text-xs">Share your experience with our scents</p>
        </header>

        {/* Input Section */}
        <section className="bg-white p-8 shadow-sm mb-16 border border-neutral-100">
          <form onSubmit={handleAddReview} className="space-y-4">
            <textarea
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none transition-colors min-h-[120px] bg-transparent"
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-neutral-900 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-neutral-800 transition-all"
              >
                Post Review
              </button>
            </div>
          </form>
        </section>

        {/* Reviews List */}
        <section className="space-y-8">
          {loading ? (
            <p className="text-center text-neutral-400 animate-pulse">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-neutral-400">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <motion.div 
                key={rev.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-neutral-100 pb-8"
              >
                <p className="text-xl font-serif italic text-neutral-800 mb-4">"{rev.text}"</p>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-400">
                  <span>{rev.author || 'Anonymous'}</span>
                  <span>{new Date(rev.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
