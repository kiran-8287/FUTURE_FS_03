import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav = () => {
    const { totalItems } = useCart();
    const location = useLocation();

    // Hide on screens larger than md
    // Add safe area padding for iOS
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-coffee-200 z-40 md:hidden pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-around items-center h-16">
                <NavItem to="/" icon={Home} label="Home" active={location.pathname === '/' && !location.hash} />

                <NavItem to="/menu" icon={UtensilsCrossed} label="Menu" active={location.pathname === '/menu'} />

                <NavLink to="/cart" className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-full h-full space-y-1 relative ${isActive ? 'text-brand-red' : 'text-coffee-500'}`
                }>
                    <div className="relative">
                        <ShoppingCart size={22} />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    key={totalItems}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="text-[10px] font-medium">Cart</span>
                </NavLink>

                <Link to="/#contact" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.hash === '#contact' ? 'text-brand-red' : 'text-coffee-500'}`}>
                    <Phone size={22} />
                    <span className="text-[10px] font-medium">Contact</span>
                </Link>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon: Icon, label, active }) => (
    <NavLink
        to={to}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-brand-red' : 'text-coffee-500'
            }`}
    >
        {active ? (
            <motion.div layoutId="nav-active" className="absolute inset-0 bg-brand-red/5 rounded-xl -z-10 mx-2 my-1" />
        ) : null}
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
);

export default BottomNav;
