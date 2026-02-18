import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-coffee-900 text-cream-200/60 py-12 pb-24 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <h2 className="font-serif text-2xl text-cream-100 font-bold mb-2">Brew & Code</h2>
                <p className="mb-6">Fueling campus innovation, one cup at a time.</p>

                <div className="flex gap-6 mb-8">
                    <a href="#" className="hover:text-brand-red transition-colors"><Instagram size={24} /></a>
                    <a href="#" className="hover:text-brand-red transition-colors"><Facebook size={24} /></a>
                    <a href="#" className="hover:text-brand-red transition-colors"><Twitter size={24} /></a>
                </div>

                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Brew & Code. All rights reserved.</p>
                    <p className="mt-1">Made with ☕ inside campus</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
