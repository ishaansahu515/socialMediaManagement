import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white/10 backdrop-blur-md fixed w-full top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">SMMS Pro</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-pink-200 transition-colors">Home</a>
            <a href="#packages" className="text-white hover:text-pink-200 transition-colors">Packages</a>
            <a href="#contact" className="text-white hover:text-pink-200 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-white">
                  <User size={20} />
                  <span className="hidden sm:inline">Hello, {user?.firstName}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;