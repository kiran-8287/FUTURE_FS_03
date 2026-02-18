import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartFlyAnimation = ({ startPos, endPos, onComplete, icon }) => {
    if (!startPos || !endPos) return null;

    return (
        <motion.div
            initial={{
                x: startPos.x,
                y: startPos.y,
                scale: 1,
                opacity: 1
            }}
            animate={{
                x: endPos.x,
                y: endPos.y,
                scale: 0.2,
                opacity: 0.5
            }}
            transition={{
                duration: 0.6,
                ease: "easeInOut"
            }}
            onAnimationComplete={onComplete}
            className="fixed z-[999] pointer-events-none text-brand-red"
        >
            {icon || <span className="text-2xl">☕</span>}
        </motion.div>
    );
};

export default CartFlyAnimation;
