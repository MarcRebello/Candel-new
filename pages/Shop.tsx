
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const Shop: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Woody', 'Floral', 'Fresh', 'Spicy'];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <header className="mb-16">
        <h1 className="text-5xl font-serif text-neutral-900 mb-6">Our Collection</h1>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all ${
                filter === cat 
                ? 'bg-neutral-900 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 text-xs tracking-widest uppercase opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Quick Add
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-neutral-900 mb-1">{product.name}</h3>
                  <p className="text-neutral-500 text-sm italic mb-2">{product.notes.join(', ')}</p>
                </div>
                <span className="text-lg font-medium">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;
