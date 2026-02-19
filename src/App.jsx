import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import BottomNav from './components/BottomNav';

// Enhanced ScrollToTop to handle both route changes and hash anchors
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // If there's a hash, find the element and scroll to it
            // We use a small timeout to ensure the element is mounted/rendered if navigating from another page
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // If no hash, just scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <CartProvider>
            <BrowserRouter>
                {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
                {!isLoading && (
                    <div className="antialiased text-coffee-900 font-sans selection:bg-brand-red selection:text-white">
                        <ScrollToTop />
                        <Toaster position="top-center" toastOptions={{
                            duration: 2000,
                            style: {
                                borderRadius: '12px',
                                background: '#333',
                                color: '#fff',
                            }
                        }} />

                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/order-confirm" element={<OrderConfirmPage />} />
                        </Routes>

                        <BottomNav />
                    </div>
                )}
            </BrowserRouter>
        </CartProvider>
    );
};

export default App;
