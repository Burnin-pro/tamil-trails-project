import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const navBg = isHome ? (isScrolled ? 'bg-white shadow-md text-brand-dark' : 'bg-transparent text-white') : 'bg-white shadow-md text-brand-dark';
  const logoSrc = isHome && !isScrolled ? '/tamiltrailsfooter.png' : '/tamiltrails.png';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/#packages' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (isHome) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={logoSrc} alt="Tamil Trails" className="h-16 md:h-24 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="hover:text-brand-primary transition-colors font-medium text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => navigate('/#packages')}
              className="bg-brand-primary text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="focus:outline-none"
            >
              <HiMenu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 flex justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-dark focus:outline-none">
                  <HiX className="h-8 w-8" />
                </button>
              </div>
              <div className="flex flex-col space-y-6 p-6 text-brand-dark">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => {
                      handleNavClick(e, link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-lg font-medium border-b border-gray-100 pb-2 hover:text-brand-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    navigate('/#packages');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition-all mt-4"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
