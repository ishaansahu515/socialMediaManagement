import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    packagesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
            ⭐ Professional Social Media Management
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Grow Your Brand with
          <br />
          <span className="bg-gradient-to-r from-pink-300 to-white bg-clip-text text-transparent">
            Expert SMMS
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your social media presence with our comprehensive management services. From content creation to growth analytics, we've got you covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={scrollToPackages}
            className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            View Packages
            <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105">
            Get Started Today
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
            <p className="text-white/80 text-lg">Support Available</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
            <p className="text-white/80 text-lg">Custom Content</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">3-5</h3>
            <p className="text-white/80 text-lg">Days Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;