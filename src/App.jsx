import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Billing from '@/pages/Billing';
import { Toaster } from '@/components/ui/toaster';

function AppContent() {
  const location = useLocation();
  const isPrivatePage = ['/login', '/facturacion'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {!isPrivatePage && <Navigation />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/acerca-de" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/facturacion" element={<Billing />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isPrivatePage && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
