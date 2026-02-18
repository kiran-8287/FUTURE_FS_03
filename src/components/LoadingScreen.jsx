import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-coffee-900 flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-brand-gold mb-8 italic font-serif text-3xl font-bold flex flex-col items-center"
                >
                    <span className="text-cream-100 text-6xl mb-2">☕</span>
                    Brew & Code
                </motion.div>

                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-4 flex justify-between text-cream-200/40 font-mono text-[10px] uppercase tracking-widest">
                    <span>Initializing...</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
