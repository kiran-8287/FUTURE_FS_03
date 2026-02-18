import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const MiniCartBar = () => {
    const { totalItems, totalPrice } = useCart();

    return (
        <AnimatePresence>
            {totalItems > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-40 md:hidden"
                >
                    <Link
                        to="/cart"
                        className="bg-brand-red text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl ring-4 ring-brand-red/20 active:scale-95 transition-transform"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <ShoppingBag size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold opacity-80 uppercase tracking-wider">{totalItems} Items Added</span>
                                <span className="font-mono font-bold leading-none">₹{totalPrice}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 font-bold">
                            View Cart <ChevronRight size={20} />
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MiniCartBar;
