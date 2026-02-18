import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-20 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="font-mono text-coffee-500 text-sm mb-2">console.log('Our Vibes')</h2>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-coffee-900">Life at Brew & Code</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                    {IMAGES.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2 h-[416px]' : ''}`}
                        >
                            <img
                                src={src}
                                alt="Cafe ambience"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
