import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { totalItems } = useCart();
    const scrollPosition = useScrollPosition();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isScrolled = scrollPosition > 50;

    // Dynamic Styles
    const navbarBg = isHome
        ? (isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6')
        : 'bg-white shadow-md py-4';

    const textColor = isHome && !isScrolled ? 'text-white' : 'text-coffee-900';
    const logoColor = isHome && !isScrolled ? 'text-brand-gold' : 'text-brand-red';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className={`${logoColor} transition-colors group-hover:rotate-12 duration-300`}>
                        <Coffee size={32} strokeWidth={2.5} />
                    </div>
                    <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${textColor}`}>
                        Brew & Code
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" label="Home" textColor={textColor} />
                    <NavLink to="/menu" label="Menu" textColor={textColor} />
                    <a href="#gallery" className={`font-sans font-bold hover:text-brand-red transition-colors ${textColor}`}>Gallery</a>
                    <a href="#about" className={`font-sans font-bold hover:text-brand-red transition-colors ${textColor}`}>About</a>
                    <a href="#contact" className={`font-sans font-bold hover:text-brand-red transition-colors ${textColor}`}>Contact</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative p-2 group">
                        <ShoppingCart className={`${textColor} transition-colors group-hover:text-brand-red`} size={24} />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, label, textColor }) => (
    <Link
        to={to}
        className={`font-sans font-bold hover:text-brand-red transition-colors ${textColor}`}
    >
        {label}
    </Link>
);

export default Navbar;
