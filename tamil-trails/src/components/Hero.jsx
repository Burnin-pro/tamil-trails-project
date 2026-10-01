import { motion } from 'framer-motion';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const scrollToPackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          src="/herovideo.mp4"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-white font-medium tracking-[0.2em] uppercase mb-4 block text-sm md:text-base font-bold drop-shadow-md"
          >
            Tamil Nadu, India
          </motion.span>

          <motion.div className="drop-shadow-2xl">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-text-shine leading-tight py-2"
            >
              Discover the Soul of Tamil Nadu
            </motion.h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light min-h-[4rem]"
          >
            <Typewriter
              options={{
                strings: [
                  "Journey through ancient temples, serene hill stations, and vibrant cultural heritage in India's most enchanting southern state.",
                  "Explore majestic monuments, pristine beaches, and breathtaking natural wonders.",
                  "Experience a land where ancient traditions seamlessly blend with modern life."
                ],
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 20,
              }}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={scrollToPackages}
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium hover:bg-amber-600 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(217,119,6,0.6)]"
            >
              Explore Packages
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-brand-dark transition-all hover:scale-105"
            >
              Plan My Trip
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToPackages}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
            <HiOutlineArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
