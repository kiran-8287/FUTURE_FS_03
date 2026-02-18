import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, Clock, Star, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ItemDetailSheet = ({ item, onClose }) => {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState(() => {
        const defaults = {};
        item.customizations?.forEach(c => defaults[c.label] = c.default);
        return defaults;
    });
    const [specialRequest, setSpecialRequest] = useState('');

    // Recommendation Logic: Pick 3 items that are NOT the current item
    // If current is drink, show snack/dessert. If food, show drink.
    const recommendedItems = useMemo(() => {
        const isDrink = item.category.includes('coffee') || item.category.includes('beverage');
        const targetCategories = isDrink ? ['snacks', 'desserts'] : ['hot-coffee', 'cold-beverages'];

        return MENU_ITEMS
            .filter(i => targetCategories.includes(i.category) && i.id !== item.id)
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, 3);
    }, [item]);

    const handleOptionSelect = (label, value) => {
        setSelectedOptions(prev => ({ ...prev, [label]: value }));
    };

    const calculateTotal = () => {
        let total = item.price;
        Object.values(selectedOptions).forEach((val) => {
            const match = val.match(/\(\+₹(\d+)\)/);
            if (match) {
                total += parseInt(match[1]);
            }
        });
        return total * qty;
    };

    const handleAddToCart = (itemToAdd, quantity = 1) => {
        // For main item
        if (itemToAdd.id === item.id) {
            addItem(item, quantity, selectedOptions, specialRequest);
        } else {
            // For upsell items (add directly without options for speed/simplicity in this UI)
            addItem(itemToAdd, 1);
        }

        toast.success(`${itemToAdd.name} added`, {
            icon: '☕',
            style: {
                background: '#2C1810',
                color: '#FAF6F1',
            }
        });
        if (navigator.vibrate) navigator.vibrate(10);

        if (itemToAdd.id === item.id) onClose();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl overflow-hidden h-[90vh] flex flex-col shadow-2xl"
            >
                {/* Header Image */}
                <div className="relative h-56 md:h-64 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/60 transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6 text-white">
                        <h2 className="font-serif text-3xl font-bold mb-1 leading-tight">{item.name}</h2>
                        <div className="flex items-center gap-4 text-sm opacity-90">
                            <span className="flex items-center gap-1"><Star size={14} fill="currentColor" className="text-brand-gold" /> {item.rating} ({item.ratingCount})</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {item.prepTime} min</span>
                            {item.isVeg ? (
                                <span className="flex items-center gap-1 text-brand-green font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-brand-green" /> VEG
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-brand-red font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-brand-red" /> NON-VEG
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto pb-32 no-scrollbar">
                    <div className="p-6">
                        <p className="text-coffee-600 mb-8 leading-relaxed text-base">{item.description}</p>

                        {item.customizations?.map((customization) => (
                            <div key={customization.label} className="mb-8">
                                <h3 className="font-bold text-coffee-900 mb-3 flex justify-between">
                                    {customization.label}
                                    <span className="text-xs font-normal text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">Required</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {customization.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(customization.label, option)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedOptions[customization.label] === option
                                                ? 'bg-brand-red text-white border-brand-red shadow-md transform scale-105'
                                                : 'bg-white text-coffee-600 border-coffee-200 hover:border-coffee-400'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="mb-8">
                            <h3 className="font-bold text-coffee-900 mb-3">Special Instructions</h3>
                            <textarea
                                value={specialRequest}
                                onChange={(e) => setSpecialRequest(e.target.value)}
                                placeholder="E.g. Less ice, make it extra spicy..."
                                className="w-full border border-coffee-200 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none h-24 bg-cream-50"
                            />
                        </div>

                        {/* Upsell Section */}
                        <div className="pt-6 border-t border-coffee-100">
                            <h3 className="font-bold text-coffee-900 mb-4 flex items-center gap-2">
                                Complete your meal
                                <span className="text-xs font-normal text-coffee-500 bg-coffee-100 px-2 py-0.5 rounded-full">Recommended</span>
                            </h3>
                            <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar">
                                {recommendedItems.map((recItem) => (
                                    <div key={recItem.id} className="flex-shrink-0 w-40 bg-white border border-coffee-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                                        <div className="h-24 w-full relative">
                                            <img src={recItem.image} className="w-full h-full object-cover" alt={recItem.name} />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAddToCart(recItem); }}
                                                className="absolute bottom-2 right-2 bg-white text-brand-red shadow-md rounded-lg p-1.5 hover:scale-110 transition-transform"
                                            >
                                                <Plus size={16} strokeWidth={3} />
                                            </button>
                                        </div>
                                        <div className="p-3 flex flex-col flex-grow">
                                            <h4 className="font-bold text-sm text-coffee-900 line-clamp-1 mb-1">{recItem.name}</h4>
                                            <div className="mt-auto flex justify-between items-center">
                                                <span className="text-xs text-coffee-600 font-bold">₹{recItem.price}</span>
                                                <span className="text-[10px] text-coffee-400">
                                                    {recItem.isVeg ? '🟢' : '🔴'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-coffee-100 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="flex items-center gap-4 max-w-lg mx-auto">
                        <div className="flex items-center border border-coffee-200 rounded-xl h-12 px-2 bg-cream-50">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-full flex items-center justify-center text-coffee-600 hover:bg-coffee-200 rounded-lg transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-8 text-center font-bold text-coffee-900">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-full flex items-center justify-center text-coffee-600 hover:bg-coffee-200 rounded-lg transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <button
                            onClick={() => handleAddToCart(item, qty)}
                            className="flex-grow bg-brand-red text-white h-12 rounded-xl font-bold shadow-lg shadow-brand-red/20 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Add Item</span>
                            <span className="w-px h-4 bg-white/30 mx-1" />
                            <span className="font-mono">₹{calculateTotal()}</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ItemDetailSheet;
