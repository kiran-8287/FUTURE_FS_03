import React from 'react';
import MenuSection from '../components/MenuSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MiniCartBar from '../components/MiniCartBar';

const MenuPage = () => {
    return (
        <div className="bg-cream-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <MenuSection />
            </div>
            <Footer />
            <MiniCartBar />
        </div>
    );
};

export default MenuPage;
