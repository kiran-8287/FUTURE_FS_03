import React from 'react';
import Hero from '../components/Hero';
import HomeMenuPreview from '../components/HomeMenuPreview';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MiniCartBar from '../components/MiniCartBar';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
    return (
        <div className="bg-cream-50 min-h-screen pb-16 md:pb-0">
            <Navbar />
            <Hero />
            <HomeMenuPreview />
            <Gallery />
            <About />
            <Contact />
            <Footer />
            <MiniCartBar />
        </div>
    );
};

export default HomePage;
