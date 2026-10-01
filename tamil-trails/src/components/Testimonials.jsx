import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import client from '../api/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await client.get('/testimonials');
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-brand-light overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-orange-50/50 -skew-y-3 origin-top-left z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">Traveler Stories</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from those who have experienced the magic of Tamil Nadu with us.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 bg-white p-3 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-colors text-brand-dark"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="overflow-hidden px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <HiStar key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-700 italic mb-8 font-light leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonials[currentIndex].photo || 'https://via.placeholder.com/150'} 
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-brand-primary"
                  />
                  <h4 className="font-bold text-brand-dark text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 bg-white p-3 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-colors text-brand-dark"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-brand-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
