import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-cream-50 scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Info */}
                    <div>
                        <h2 className="font-serif text-3xl font-bold text-coffee-900 mb-6">Find Us</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-brand-red">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-coffee-900">Block C, Ground Floor</h4>
                                    <p className="text-coffee-600">College Campus Main Building<br />Near Library Entrance</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-brand-red">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-coffee-900">Call / WhatsApp</h4>
                                    <p className="text-coffee-600">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-brand-red">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-coffee-900">Email</h4>
                                    <p className="text-coffee-600">hello@brewandcode.in</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20place%20an%20order%20at%20Brew%20%26%20Code"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1"
                        >
                            <MessageCircle size={20} fill="currentColor" className="text-white" />
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Map */}
                    <div className="h-80 rounded-2xl overflow-hidden shadow-card border border-coffee-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792556272337!2d72.87765631490113!3d19.076090557025816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c87c9644781b%3A0xb35a94776100c598!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Campus Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
