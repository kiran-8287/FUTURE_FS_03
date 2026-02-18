import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Clock, Heart, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const MenuCard = ({ item, onOpenDetail }) => {
    const { addItem, items, updateQty } = useCart();

    // Check if item is in cart (ignoring customizations for the quick status)
    const cartItem = items.find(i => i.id === item.id);
    const isInCart = !!cartItem;

    const handleQuickAdd = (e) => {
        e.stopPropagation();

        // If it has customizations, always open the sheet
        if (item.customizations && item.customizations.length > 0) {
            onOpenDetail(item);
            return;
        }

        addItem(item, 1);
        toast.success(`${item.name} added`, {
            icon: '☕',
            style: {
                background: '#2C1810',
                color: '#FAF6F1',
            }
        });
        if (navigator.vibrate) navigator.vibrate(10);
    };

    const handleUpdateQty = (e, newQty) => {
        e.stopPropagation();
        if (cartItem) {
            updateQty(cartItem.cartId, newQty);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenDetail(item)}
            className="bg-white rounded-2xl shadow-card overflow-hidden border border-coffee-200/50 flex flex-col h-full cursor-pointer relative group"
        >
            {/* Image Area */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.badge && (
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${item.badge === 'bestseller' ? 'bg-brand-gold text-coffee-900' :
                                item.badge === 'new' ? 'bg-brand-red text-white' : 'bg-coffee-900 text-white'
                            }`}>
                            {item.badge}
                        </span>
                    )}
                    {item.isVeg ? (
                        <div className="bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm self-start">
                            <div className="w-3 h-3 border-2 border-brand-green flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm self-start">
                            <div className="w-3 h-3 border-2 border-brand-red flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Prep Time */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <Clock size={12} /> {item.prepTime} min
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif font-bold text-coffee-900 text-lg leading-tight line-clamp-2">{item.name}</h3>
                </div>

                <div className="flex items-center gap-1 text-xs text-coffee-500 mb-3">
                    <Star size={14} fill="currentColor" className="text-brand-gold" />
                    <span className="font-bold text-coffee-700">{item.rating}</span>
                    <span>({item.ratingCount})</span>
                </div>

                <p className="text-coffee-600 text-xs line-clamp-2 mb-4 leading-relaxed">{item.description}</p>

                <div className="mt-auto pt-3 border-t border-coffee-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        {item.originalPrice && (
                            <span className="text-[10px] text-coffee-400 line-through">₹{item.originalPrice}</span>
                        )}
                        <span className="text-xl font-bold text-coffee-900 font-mono">₹{item.price}</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {isInCart ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center bg-brand-red text-white rounded-xl h-10 px-1"
                            >
                                <button
                                    onClick={(e) => handleUpdateQty(e, cartItem.qty - 1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-white/10 rounded-lg"
                                >
                                    <Minus size={16} strokeWidth={3} />
                                </button>
                                <span className="w-8 text-center font-bold font-mono">{cartItem.qty}</span>
                                <button
                                    onClick={(e) => handleUpdateQty(e, cartItem.qty + 1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-white/10 rounded-lg"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={handleQuickAdd}
                                className="bg-white border-2 border-brand-red text-brand-red px-4 h-10 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-red hover:text-white transition-all active:scale-90"
                            >
                                ADD <Plus size={16} strokeWidth={3} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuCard;
