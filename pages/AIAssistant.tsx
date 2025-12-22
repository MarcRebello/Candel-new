
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getScentRecommendation } from '../services/gemini';

const AIAssistant: React.FC = () => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    scentName: string;
    reasoning: string;
    suggestedNotes: string[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    try {
      const result = await getScentRecommendation(mood);
      setRecommendation(result);
    } catch (err) {
      alert("Something went wrong with our AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-neutral-900 mb-4">Scent Discovery AI</h1>
        <p className="text-neutral-500 italic">Describe your mood, a memory, or an occasion, and we'll craft your perfect scent profile.</p>
      </div>

      <div className="bg-white p-8 md:p-12 border border-neutral-100 shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="mb-12">
          <label className="block text-sm font-medium text-neutral-600 mb-4 uppercase tracking-widest">
            Tell us about the atmosphere you crave...
          </label>
          <textarea
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g. A rainy afternoon in a library, reading a classic novel with old paper and mahogany surroundings..."
            className="w-full h-32 p-4 border border-neutral-200 focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all resize-none mb-6"
          />
          <button
            disabled={loading}
            className="w-full py-4 bg-neutral-900 text-white tracking-widest uppercase text-sm font-medium hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors"
          >
            {loading ? 'Consulting the Oracle...' : 'Find My Scent'}
          </button>
        </form>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-neutral-100 pt-12"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4">Your Custom Recommendation</h2>
            <h3 className="text-3xl font-serif text-neutral-900 mb-6">{recommendation.scentName}</h3>
            <p className="text-neutral-600 leading-relaxed mb-8 italic">"{recommendation.reasoning}"</p>
            
            <div className="flex flex-wrap gap-3">
              {recommendation.suggestedNotes.map((note) => (
                <span key={note} className="px-4 py-1.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 rounded-full">
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
