import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const tiers = [
  {
    name: 'Basic',
    price: '₹5,000',
    description: 'Perfect for backpackers and budget travelers.',
    features: [
      'Standard Accommodation',
      'Shared Transport',
      'Basic Breakfast',
      'Local Guide (Select Sites)'
    ],
    buttonText: 'Start Basic',
    popular: false
  },
  {
    name: 'Standard',
    price: '₹12,000',
    description: 'Ideal for families seeking comfort and value.',
    features: [
      '3-Star Accommodation',
      'Private AC Cab',
      'Breakfast & Dinner',
      'Dedicated Tour Guide',
      'Entry Tickets Included'
    ],
    buttonText: 'Most Popular',
    popular: true
  },
  {
    name: 'Premium',
    price: '₹25,000',
    description: 'Luxury experience with premium amenities.',
    features: [
      '5-Star / Heritage Stays',
      'Premium SUV',
      'All Meals Included',
      'Expert Historian Guide',
      'VIP Temple Darshan',
      'Cultural Show Tickets'
    ],
    buttonText: 'Go Premium',
    popular: false
  }
];

const PricingTiers = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">Transparent Pricing</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Select a service tier that fits your budget and travel style. Prices are per person for a standard 3-day trip.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.popular 
                  ? 'bg-brand-dark text-white shadow-2xl scale-100 md:scale-105 z-10 border-2 border-brand-primary' 
                  : 'bg-brand-light text-brand-dark shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Recommended
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-brand-dark'}`}>
                {tier.name}
              </h3>
              <p className={`text-sm mb-6 ${tier.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                {tier.description}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className={`text-sm ${tier.popular ? 'text-gray-400' : 'text-gray-500'}`}>/person</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <HiCheck className={`h-5 w-5 mr-3 flex-shrink-0 ${tier.popular ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                    <span className={tier.popular ? 'text-gray-200' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate(`/contact?tier=${tier.name}`)}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  tier.popular
                    ? 'bg-brand-primary hover:bg-amber-600 text-white shadow-md'
                    : 'bg-white hover:bg-gray-50 text-brand-dark border border-gray-200 shadow-sm'
                }`}
              >
                {tier.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
