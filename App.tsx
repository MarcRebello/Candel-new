
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="bg-[#faf9f6] border-t border-neutral-100 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
              <div className="text-2xl font-serif tracking-widest text-neutral-900">
                CANDEL
              </div>
              <div className="flex space-x-12">
                <a 
                  href="https://www.instagram.com/trinketsand.beyond/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Instagram
                </a>
                <button className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Journal</button>
                <button className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Support</button>
              </div>
              <p className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
                &copy; 2024 CANDEL LUXURY FRAGRANCES.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
