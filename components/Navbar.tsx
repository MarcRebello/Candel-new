
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'AI Assistant', path: '/ai-assistant' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif tracking-widest text-neutral-900">
          CANDEL
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-sm font-medium hover:opacity-70 transition-opacity">Cart (0)</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
