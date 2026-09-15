import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/acerca-de" element={<About />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;