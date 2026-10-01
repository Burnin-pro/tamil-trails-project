import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Typewriter from 'typewriter-effect';

const features = [
  {
    image: "/images/packages/madurai.jpg",
    title: "Ancient Temples",
    description: "Marvel at stunning Dravidian architecture and millennia-old spiritual heritage."
  },
  {
    image: "/images/packages/ooty.jpg",
    title: "Hill Stations",
    description: "Escape to the misty Nilgiris and lush Western Ghats for serene retreats."
  },
  {
    image: "/images/packages/mahabalipuram.jpg",
    title: "Coastal Heritage",
    description: "Explore pristine beaches and historic coastal towns along the Coromandel."
  },
  {
    image: "/images/packages/chettinad.jpg",
    title: "Authentic Cuisine",
    description: "Savor the rich, diverse, and aromatic culinary delights of the south."
  }
];

const WhyTamilNadu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="relative min-h-[90vh] py-16 flex flex-col justify-between overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/vidkanniyakumari2.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        {/* Lighter Gradient Overlay: Darker at top and bottom for text, clear in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col h-full justify-between flex-1">
        
        {/* Top Heading (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            Why Tamil Nadu?
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6 shadow-brand-primary shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
          <div className="text-gray-200 max-w-2xl mx-auto text-lg lg:text-xl drop-shadow-md font-light min-h-[4rem]">
            <Typewriter
              options={{
                strings: [
                  'Experience a land where ancient traditions seamlessly blend with natural wonders.',
                  'Marvel at stunning Dravidian architecture and millennia-old spiritual heritage.',
                  'Escape to the misty Nilgiris and lush Western Ghats for serene retreats.'
                ],
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 20,
                cursor: '|',
              }}
            />
          </div>
        </motion.div>

        <div className="flex-1"></div> {/* Spacer to push cards to bottom */}

        {/* Feature Carousel aligned at the bottom */}
        <div className="max-w-4xl mx-auto w-full mt-16 mb-8 relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-colors text-white border border-white/20"
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
                className="p-8 md:p-10 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] border-4 border-white/10">
                  <img src={features[currentIndex].image} alt={features[currentIndex].title} className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide drop-shadow-md">{features[currentIndex].title}</h3>
                  <p className="text-gray-200 leading-relaxed text-lg md:text-xl font-light">{features[currentIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-colors text-white border border-white/20"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center mt-8 gap-3 relative z-20">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-brand-primary scale-150' : 'bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTamilNadu;
