import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, Utensils, Coffee, Pizza, Cake, Sparkles, X, ChevronRight } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import MenuCard from './MenuCard';
import ItemDetailSheet from './ItemDetailSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const MenuSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Real-time observer for categories (excluding 'all')
    const categoryIds = useMemo(() => CATEGORIES.filter(c => c.id !== 'all').map(c => c.id), []);
    const visibleCategory = useIntersectionObserver(categoryIds, 100);

    // Sync active category with scroll, but only if user isn't clicking a tab
    useEffect(() => {
        if (visibleCategory && activeCategory !== 'all') {
            setActiveCategory(visibleCategory);
        }
    }, [visibleCategory]);

    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesVeg = !isVegOnly || item.isVeg;
            return matchesSearch && matchesCategory && matchesVeg;
        });
    }, [searchQuery, activeCategory, isVegOnly]);

    const handleCategoryClick = (id) => {
        setActiveCategory(id);
        if (id === 'all') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(id);
            if (element) {
                const offset = 160;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="pb-24">
            {/* Sticky Search & Filter Bar */}
            <div className="sticky top-[64px] z-30 bg-cream-50/80 backdrop-blur-md pb-4 pt-2 px-4 shadow-sm border-b border-coffee-100">
                <div className="max-w-7xl mx-auto flex flex-col gap-4">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400 group-focus-within:text-brand-red transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search for coffee, snacks, desserts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 bg-white border border-coffee-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all shadow-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-400">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Filters Row */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Categories Pills */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat.id
                                            ? 'bg-coffee-900 text-white shadow-lg'
                                            : 'bg-white text-coffee-600 border border-coffee-200 hover:border-coffee-400'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Veg Toggle */}
                        <button
                            onClick={() => setIsVegOnly(!isVegOnly)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isVegOnly
                                    ? 'bg-brand-green/10 border-brand-green text-brand-green font-bold ring-2 ring-brand-green/20'
                                    : 'bg-white border-coffee-200 text-coffee-600'
                                }`}
                        >
                            <div className={`w-3 h-3 border-2 border-brand-green flex items-center justify-center rounded-[1px] ${isVegOnly ? 'bg-brand-green' : ''}`}>
                                <div className="w-1 h-1 rounded-full bg-white" />
                            </div>
                            <span className="text-xs uppercase hidden sm:inline">Pure Veg</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <AnimatePresence mode='popLayout'>
                    {activeCategory === 'all' ? (
                        CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
                            const items = filteredItems.filter(item => item.category === cat.id);
                            if (items.length === 0) return null;

                            return (
                                <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-40">
                                    <h3 className="font-serif text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
                                        {cat.label}
                                        <div className="h-px flex-grow bg-coffee-100 ml-4 opacity-50" />
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {items.map((item) => (
                                            <MenuCard key={item.id} item={item} onOpenDetail={setSelectedItem} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {filteredItems.map((item) => (
                                <MenuCard key={item.id} item={item} onOpenDetail={setSelectedItem} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-coffee-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-coffee-300" />
                        </div>
                        <h4 className="font-bold text-coffee-900 mb-1">No items found</h4>
                        <p className="text-coffee-500 text-sm">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            {/* Selected Item Detail Sheet */}
            <AnimatePresence>
                {selectedItem && (
                    <ItemDetailSheet
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuSection;
