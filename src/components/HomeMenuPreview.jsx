import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../data/menuData';
import MenuCard from './MenuCard';
import ItemDetailSheet from './ItemDetailSheet';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Coffee } from 'lucide-react';

const HomeMenuPreview = () => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    // Get 4 items: Prioritize bestsellers
    const featuredItems = React.useMemo(() => {
        const bestsellers = MENU_ITEMS.filter(item => item.badge === 'bestseller');
        const others = MENU_ITEMS.filter(item => item.badge !== 'bestseller');
        return [...bestsellers, ...others].slice(0, 4);
    }, []);

    return (
        <section className="py-20 bg-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Alignment Fixed: Centered on mobile, Row/Between on Desktop */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left gap-4 md:gap-0">
                    <div>
                        <h2 className="font-mono text-coffee-500 text-sm mb-2 inline-block bg-coffee-100/50 px-2 py-1 rounded">console.log('Favorites')</h2>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-coffee-900">Campus Favorites</h3>
                    </div>
                    <button
                        onClick={() => navigate('/menu')}
                        className="hidden md:flex items-center gap-2 text-brand-red font-bold hover:translate-x-1 transition-transform mb-1"
                    >
                        View Full Menu <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuredItems.map((item) => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            onOpenDetail={setSelectedItem}
                        />
                    ))}
                </div>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/menu')}
                    className="w-full md:hidden flex items-center justify-center gap-2 bg-white border border-coffee-200 py-4 rounded-xl font-bold text-coffee-900 shadow-sm"
                >
                    View Full Menu <ArrowRight size={20} />
                </motion.button>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ItemDetailSheet
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default HomeMenuPreview;
