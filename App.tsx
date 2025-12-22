
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AIAssistant from './pages/AIAssistant';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-neutral-100 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-neutral-400 tracking-widest uppercase">
              &copy; 2024 CANDEL LUXURY FRAGRANCES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
