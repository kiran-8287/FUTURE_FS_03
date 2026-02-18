import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Coffee, Plus, Minus, TicketPercent, ChevronRight, Check, Bike, Building, Footprints, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const HOSTELS = ["Block A (Boys)", "Block B (Girls)", "Block C (Mixed)", "Faculty Quarters", "Library Reading Room"];

const CartPage = () => {
    const { items, totalItems, totalPrice, updateQty, removeItem } = useCart();
    const navigate = useNavigate();
    const [couponApplied, setCouponApplied] = useState(false);

    // Delivery State
    const [orderMode, setOrderMode] = useState('pickup');
    const [hostelDetails, setHostelDetails] = useState({ block: '', room: '' });

    // Calculations
    const deliveryFee = orderMode === 'delivery' ? 10 : 0;
    const discount = couponApplied ? Math.floor(totalPrice * 0.2) : 0;
    const taxes = Math.floor((totalPrice - discount) * 0.05);
    const finalTotal = totalPrice - discount + taxes + deliveryFee;

    const handleApplyCoupon = () => {
        if (couponApplied) {
            setCouponApplied(false);
            toast("Coupon removed", { icon: '🏷️' });
        } else {
            setCouponApplied(true);
            toast.success("CAMPUS20 Applied!", { style: { background: '#22863A', color: '#fff' } });
        }
    };

    const handlePlaceOrder = () => {
        if (orderMode === 'delivery') {
            if (!hostelDetails.block || !hostelDetails.room) {
                toast.error("Please enter hostel details for delivery");
                return;
            }
        }

        navigate('/order-confirm', {
            state: {
                orderMode,
                hostelDetails: orderMode === 'delivery' ? hostelDetails : null,
                finalTotal
            }
        });
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 bg-coffee-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Coffee size={48} className="text-coffee-400" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-2">Your cart is empty</h2>
                <p className="text-coffee-600 mb-8">Looks like you haven't added any caffeine yet.</p>
                <Link
                    to="/menu"
                    className="bg-brand-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
                >
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 pb-40">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-coffee-50 rounded-full">
                    <ArrowLeft className="text-coffee-900" />
                </button>
                <div>
                    <h1 className="font-serif font-bold text-xl text-coffee-900">Your Order</h1>
                    <p className="text-xs text-coffee-500">{totalItems} items</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 md:p-8">
                {/* Items List */}
                <div className="space-y-4 mb-8">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.cartId}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white p-4 rounded-xl shadow-card border border-coffee-100 flex gap-4"
                            >
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-coffee-50" />

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-coffee-900 text-sm md:text-base">{item.name}</h3>
                                        <span className="font-bold text-coffee-900">₹{item.price * item.qty}</span>
                                    </div>

                                    {/* Customizations Display */}
                                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                        <div className="text-xs text-coffee-500 mt-1 flex flex-wrap gap-1">
                                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                                                <span key={key} className="bg-coffee-50 px-1.5 py-0.5 rounded text-[10px]">
                                                    {val}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {item.specialRequest && (
                                        <div className="text-xs text-brand-red mt-1 italic">Note: {item.specialRequest}</div>
                                    )}

                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center border border-coffee-200 rounded-lg h-8 bg-cream-50">
                                            <button
                                                onClick={() => updateQty(item.cartId, item.qty - 1)}
                                                className="w-8 h-full flex items-center justify-center text-coffee-600 hover:bg-coffee-100 rounded-l-lg transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.cartId, item.qty + 1)}
                                                className="w-8 h-full flex items-center justify-center text-coffee-600 hover:bg-coffee-100 rounded-r-lg transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.cartId)}
                                            className="text-coffee-300 hover:text-red-500 p-2 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* ORDER MODE TOGGLE */}
                <div className="bg-white p-4 rounded-xl shadow-card border border-coffee-100 mb-6">
                    <h3 className="font-bold text-coffee-900 mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-brand-red" />
                        Delivery Option
                    </h3>

                    <div className="flex p-1 bg-cream-100 rounded-xl mb-4 relative">
                        {/* Animated Background Pill */}
                        <motion.div
                            className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm z-0"
                            initial={false}
                            animate={{
                                left: orderMode === 'pickup' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                                x: orderMode === 'pickup' ? 0 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={() => setOrderMode('pickup')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg z-10 text-sm font-bold transition-colors ${orderMode === 'pickup' ? 'text-coffee-900' : 'text-coffee-500'}`}
                        >
                            <Footprints size={18} /> Self Pickup
                        </button>
                        <button
                            onClick={() => setOrderMode('delivery')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg z-10 text-sm font-bold transition-colors ${orderMode === 'delivery' ? 'text-coffee-900' : 'text-coffee-500'}`}
                        >
                            <Bike size={18} /> Campus Delivery
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {orderMode === 'delivery' ? (
                            <motion.div
                                key="delivery-form"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-coffee-600 ml-1 mb-1 block">Hostel / Block</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={16} />
                                            <select
                                                value={hostelDetails.block}
                                                onChange={(e) => setHostelDetails({ ...hostelDetails, block: e.target.value })}
                                                className="w-full pl-10 pr-3 py-3 bg-cream-50 border border-coffee-200 rounded-xl text-sm focus:outline-none focus:border-brand-red appearance-none"
                                            >
                                                <option value="">Select Block</option>
                                                {HOSTELS.map(h => <option key={h} value={h}>{h}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-coffee-600 ml-1 mb-1 block">Room Number / Spot</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: 304 or 'Main Entrance'"
                                            value={hostelDetails.room}
                                            onChange={(e) => setHostelDetails({ ...hostelDetails, room: e.target.value })}
                                            className="w-full px-4 py-3 bg-cream-50 border border-coffee-200 rounded-xl text-sm focus:outline-none focus:border-brand-red"
                                        />
                                    </div>
                                    <div className="col-span-2 mt-2 flex items-center gap-2 text-xs text-brand-red bg-red-50 p-2 rounded-lg">
                                        <Bike size={14} />
                                        <span>₹10 Packaging & Delivery fee applies</span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="pickup-info"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-coffee-600 bg-coffee-50 p-3 rounded-xl flex items-center gap-2"
                            >
                                <Check size={14} className="text-brand-green" />
                                <span>No packaging charges. Ready in ~15 mins at Counter.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Coupons Section */}
                <div className="mb-6">
                    <button
                        onClick={handleApplyCoupon}
                        className={`w-full bg-white p-4 rounded-xl shadow-card border border-dashed flex items-center justify-between group transition-all ${couponApplied ? 'border-brand-green bg-green-50' : 'border-coffee-300 hover:border-brand-red'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${couponApplied ? 'bg-brand-green text-white' : 'bg-brand-red/10 text-brand-red'}`}>
                                {couponApplied ? <Check size={20} /> : <TicketPercent size={20} />}
                            </div>
                            <div className="text-left">
                                <h4 className={`font-bold ${couponApplied ? 'text-brand-green' : 'text-coffee-900'}`}>
                                    {couponApplied ? "'CAMPUS20' Applied" : "Apply Coupon"}
                                </h4>
                                <p className="text-xs text-coffee-500">
                                    {couponApplied ? "You saved ₹" + discount : "Save 20% on orders above ₹200"}
                                </p>
                            </div>
                        </div>
                        {!couponApplied && (
                            <span className="text-brand-red font-bold text-sm flex items-center">
                                Select <ChevronRight size={16} />
                            </span>
                        )}
                    </button>
                </div>

                {/* Bill Details */}
                <div className="bg-white p-6 rounded-xl shadow-card border border-coffee-100 mb-6 relative overflow-hidden">
                    {/* Receipt Zigzag Pattern at Top */}
                    <div
                        className="absolute top-0 left-0 right-0 h-2 bg-cream-50"
                        style={{ backgroundImage: 'linear-gradient(135deg, white 25%, transparent 25%), linear-gradient(225deg, white 25%, transparent 25%)', backgroundPosition: '0 0', backgroundSize: '10px 10px' }}
                    />

                    <h3 className="font-bold text-coffee-900 mb-4 uppercase tracking-wider text-xs">Bill Summary</h3>

                    <div className="flex justify-between text-coffee-600 text-sm mb-2">
                        <span>Item Total</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    {couponApplied && (
                        <div className="flex justify-between text-brand-green text-sm mb-2 font-medium">
                            <span className="flex items-center gap-1"><TicketPercent size={12} /> Coupon Savings</span>
                            <span>- ₹{discount}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-coffee-600 text-sm mb-2">
                        <span>Taxes (5%)</span>
                        <span>₹{taxes}</span>
                    </div>

                    {/* Animated Delivery Fee */}
                    <AnimatePresence>
                        {orderMode === 'delivery' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex justify-between text-coffee-600 text-sm mb-2"
                            >
                                <span className="flex items-center gap-1"><Bike size={12} /> Delivery & Pack.</span>
                                <span>₹{deliveryFee}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="border-t border-dashed border-coffee-200 my-3 pt-3 flex justify-between font-bold text-coffee-900 text-lg">
                        <span>To Pay</span>
                        <span>₹{finalTotal}</span>
                    </div>
                </div>

                <Link to="/menu" className="block text-center text-sm font-bold text-coffee-600 hover:text-brand-red mb-8">
                    + Add more items
                </Link>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-coffee-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[calc(1rem+env(safe-area-inset-bottom))] z-20">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-coffee-500 uppercase flex items-center gap-1">
                            Total {couponApplied && <span className="bg-brand-green text-white text-[10px] px-1 rounded">SAVED ₹{discount}</span>}
                        </span>
                        <span className="text-2xl font-bold text-coffee-900">₹{finalTotal}</span>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-brand-red text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-brand-red/20 hover:bg-red-700 active:scale-95 transition-transform"
                    >
                        {orderMode === 'delivery' ? 'Proceed to Pay' : 'Confirm Pickup'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
