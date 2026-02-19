import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import coffeeVideo from '../videos/coffee.mp4';


const OrderConfirmPage = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // Get State from navigation
    const { orderMode, hostelDetails, finalTotal } = location.state || { orderMode: 'pickup', hostelDetails: null, finalTotal: 0 };

    const orderId = `#BNC-${Math.floor(1000 + Math.random() * 9000)}`;

    useEffect(() => {
        // Clear cart on mount
        clearCart();

        // Trigger Confetti
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#C8102E', '#2C1810', '#D4AF37']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#C8102E', '#2C1810', '#D4AF37']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Haptic
        if (navigator.vibrate) navigator.vibrate([10, 50, 10]);

    }, []);

    return (
        <div className="min-h-screen bg-coffee-900 text-cream-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4A2C2A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Video & Checkmark Container */}
            <div className="relative mb-8 z-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative"
                >
                    <video
                        src={coffeeVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-125"
                    />
                    <div className="absolute inset-0 bg-brand-red/10" />
                </motion.div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 w-16 h-16 bg-brand-green rounded-full flex items-center justify-center shadow-xl border-4 border-coffee-900"
                >
                    <Check size={28} className="text-white" strokeWidth={4} />
                </motion.div>
            </div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl font-bold mb-2"
            >
                Order Confirmed!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-cream-200 mb-8 max-w-xs mx-auto"
            >
                {orderMode === 'delivery'
                    ? "Your order is being prepared and will be delivered shortly."
                    : "Your order is being prepared. Please collect it from the counter."}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm mb-8 border border-white/10"
            >
                <div className="flex justify-between mb-4 pb-4 border-b border-white/10">
                    <span className="text-cream-200">Order ID</span>
                    <span className="font-mono font-bold">{orderId}</span>
                </div>

                {/* Context Aware Info */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-cream-200 flex items-center gap-2"><Clock size={16} /> Est. Time</span>
                        <span className="font-bold text-brand-gold">
                            {orderMode === 'delivery' ? '~30 mins' : '~15 mins'}
                        </span>
                    </div>

                    {orderMode === 'delivery' && hostelDetails && (
                        <div className="flex justify-between items-start text-left">
                            <span className="text-cream-200 flex items-center gap-2 shrink-0"><MapPin size={16} /> Delivering To</span>
                            <span className="font-bold text-white text-right text-sm">
                                {hostelDetails.block}<br />
                                <span className="text-cream-200 font-normal">Room {hostelDetails.room}</span>
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-4 w-full max-w-sm relative z-10"
            >
                <a
                    href={`https://wa.me/?text=Hi, inquiring about order ${orderId} (${orderMode})`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                >
                    Track on WhatsApp
                </a>
                <Link
                    to="/"
                    className="w-full bg-white text-coffee-900 py-4 rounded-xl font-bold hover:bg-cream-100 transition-colors flex items-center justify-center gap-2"
                >
                    Back to Menu <ArrowRight size={18} />
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderConfirmPage;
