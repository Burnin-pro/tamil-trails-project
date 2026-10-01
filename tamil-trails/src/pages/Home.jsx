import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import WhyTamilNadu from '../components/WhyTamilNadu';
import Packages from '../components/Packages';
import PricingTiers from '../components/PricingTiers';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="font-sans min-h-screen bg-brand-light">
      <Hero />
      <Packages />
      <PricingTiers />
      <WhyTamilNadu />
      <Testimonials />
    </div>
  );
};

export default Home;
