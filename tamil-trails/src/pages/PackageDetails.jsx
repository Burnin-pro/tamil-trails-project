import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineClock, HiOutlineCurrencyRupee, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';
import client from '../api/client';

const PackageDetails = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPackage = async () => {
      try {
        const { data } = await client.get(`/packages/${slug}`);
        setPkg(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-brand-light flex items-center justify-center text-xl text-gray-500">Loading package...</div>;
  if (error || !pkg) return <div className="min-h-screen bg-brand-light flex items-center justify-center text-xl text-red-500">{error || 'Package not found'}</div>;

  // Fallback padding if gallery has less than 3 images
  const baseGallery = pkg.gallery || [pkg.image];
  const gallery = [
    baseGallery[0] || pkg.image,
    baseGallery[1] || `/images/packages/kanyakumari.jpg`,
    baseGallery[2] || `/images/packages/ooty.jpg`
  ];

  const hotelImage = pkg.hotelImage || `/images/packages/chettinad.jpg`;
  const restaurantImage = pkg.restaurantImage || `/images/packages/madurai.jpg`;
  const hotelName = pkg.hotelName || "Premium Heritage Stay";
  const restaurantName = pkg.restaurantName || "Authentic South Indian Dining";

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4"
          >
            {pkg.name}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-6 text-gray-600 font-medium"
          >
            <span className="flex items-center gap-2"><HiOutlineClock className="text-brand-primary text-xl" /> {pkg.duration}</span>
            <span className="flex items-center gap-2"><HiOutlineCurrencyRupee className="text-brand-primary text-xl" /> ₹{pkg.price.toLocaleString('en-IN')} per person</span>
          </motion.div>
        </div>

        {/* Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12"
        >
          <div className="lg:col-span-2 h-64 lg:h-[400px] rounded-2xl overflow-hidden shadow-lg relative bg-gray-200">
            <img src={gallery[0]} alt={pkg.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex flex-col gap-4 h-[500px] lg:h-[400px]">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg relative bg-gray-200">
              <img src={gallery[1]} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg relative bg-gray-200">
              <img src={gallery[2]} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold font-display text-brand-dark mb-4">About the Destination</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {pkg.description} Experience the true essence of South India with our carefully crafted itinerary. From local culinary delights to breathtaking architectural marvels, this package is designed to give you a comprehensive understanding and appreciation of Tamil Nadu's rich cultural tapestry.
              </p>
            </div>

            {/* Stay & Food Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold font-display text-brand-dark mb-3">Where You'll Stay</h3>
                <div className="flex-1 rounded-xl overflow-hidden mb-3 h-40">
                  <img src={hotelImage} alt={hotelName} className="w-full h-full object-cover" />
                </div>
                <p className="text-brand-primary font-medium text-center">{hotelName}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold font-display text-brand-dark mb-3">Where You'll Eat</h3>
                <div className="flex-1 rounded-xl overflow-hidden mb-3 h-40">
                  <img src={restaurantImage} alt={restaurantName} className="w-full h-full object-cover" />
                </div>
                <p className="text-brand-primary font-medium text-center">{restaurantName}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold font-display text-brand-dark mb-4">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <HiCheckCircle className="text-brand-primary text-xl flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{highlight}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="text-brand-primary text-xl flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">Comfortable AC Accommodation</span>
                </div>
                <div className="flex items-start gap-3">
                  <HiCheckCircle className="text-brand-primary text-xl flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">Professional Local Guide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-xl sticky top-32">
              <h3 className="text-xl font-display font-bold mb-2">Book Your Trip</h3>
              <p className="text-gray-400 text-sm mb-6">Secure your spot today and get ready for an unforgettable journey.</p>
              
              <div className="border-t border-gray-700 py-6 my-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Base Price</span>
                  <span className="font-bold text-xl">₹{pkg.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span className="font-medium">{pkg.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/contact?package=${encodeURIComponent(pkg.name)}`)}
                className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
              >
                Inquire & Book Now
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                No credit card required for inquiry. Our team will contact you with availability.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
