import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HEADLINES = [
    "Where Deadlines Meet Espresso Shots",
    "Your Campus. Your Café. Your Code.",
    "Fuel for Late Night Submissions",
    "Good Coffee. Great Code. No Regrets.",
    "Brewed for the Brilliant Minds"
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % HEADLINES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
            {/* Background with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/70 via-coffee-900/50 to-coffee-900/80 z-10" />

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 bg-brand-green/20 backdrop-blur-sm border border-brand-green/30 px-3 py-1 rounded-full text-brand-green text-xs font-bold uppercase tracking-wider mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    Open Now
                </motion.div>

                <div className="h-32 md:h-48 mb-6 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream-50 leading-tight"
                        >
                            {HEADLINES[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-cream-200 text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto"
                >
                    Open 8am–10pm · Inside Campus Block C
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-transform active:scale-95 shadow-lg shadow-brand-red/30"
                    >
                        Order Now
                    </button>
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-full sm:w-auto px-8 py-4 border-2 border-cream-100/30 text-cream-100 rounded-2xl font-bold text-lg hover:bg-cream-100/10 transition-colors active:scale-95 backdrop-blur-sm"
                    >
                        View Menu
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-200 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
