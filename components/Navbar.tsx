
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif tracking-widest text-neutral-900">
          CANDEL
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          <button 
            onClick={() => scrollToSection('collection')}
            className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Collection
          </button>
          <button 
            onClick={() => scrollToSection('philosophy')}
            className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Philosophy
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Testimonials
          </button>
        </div>

        <div className="w-20 hidden md:block"></div> {/* Spacer for symmetry */}
      </div>
    </nav>
  );
};

export default Navbar;
