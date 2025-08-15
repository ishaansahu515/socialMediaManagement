import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      <Hero />
      <Packages />
      <Contact />
      <Footer />
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;