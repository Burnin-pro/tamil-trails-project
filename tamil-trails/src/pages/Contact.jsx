import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 lg:pt-40 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Have questions about a package or ready to plan your perfect Tamil Nadu getaway? We are here to help!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>

          {/* Right Column - Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Agency Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-light p-3 rounded-full text-brand-primary mr-4">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Office Location</h4>
                    <p className="text-gray-600 mt-1">123 Tourism Avenue, Mount Road<br />Chennai, Tamil Nadu 600002</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-light p-3 rounded-full text-brand-primary mr-4">
                    <FaPhoneAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1">+91 98765 43210<br />+91 44 2345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-light p-3 rounded-full text-brand-primary mr-4">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">hello@tamiltrails.in<br />bookings@tamiltrails.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embedded */}
            <div className="bg-white rounded-2xl shadow-xl p-2 overflow-hidden h-80">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.721477759247!2d80.25867961908758!3d13.05592862419515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266158b002447%3A0xcda6b0e8ce2fa8!2sMount%20Road%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tamil Trails Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 flex items-center justify-center group"
      >
        <FaWhatsapp className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
          Chat with us
        </span>
      </a>
    </div>
  );
};

export default Contact;
