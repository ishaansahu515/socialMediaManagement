import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">SMMS Pro</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Professional Social Media Management Services that help your brand grow, engage, and succeed in the digital landscape.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Starter Package</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Growth Package</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pro Boost Package</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Referral Program</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-white transition-colors">Packages</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Call Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 SMMS Pro. All rights reserved.
          </p>
          <p className="text-gray-400 flex items-center">
            Made with <Heart className="mx-2 text-pink-500" size={16} /> for your success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;