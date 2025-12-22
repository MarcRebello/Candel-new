
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541832069-e4f383392e1d?q=80&w=2000" 
            alt="Candle Hero" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-neutral-600 mb-6 block"
          >
            Est. 2024 • Artisanal Mastery
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-neutral-900 mb-8"
          >
            Light your <br /> inner sanctuary
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/shop" 
              className="inline-block px-10 py-4 bg-neutral-900 text-white text-sm tracking-widest uppercase hover:bg-neutral-800 transition-all transform hover:-translate-y-1"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif text-neutral-900 mb-4">The Essentials</h2>
            <p className="text-neutral-500 max-w-md italic">Hand-poured in small batches using sustainably sourced soy wax and rare botanical oils.</p>
          </div>
          <Link to="/shop" className="text-sm font-medium border-b border-neutral-900 pb-1">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-serif mb-1">{product.name}</h3>
              <p className="text-neutral-500 text-sm mb-2">{product.category}</p>
              <p className="text-neutral-900 font-medium">${product.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
