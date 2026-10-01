import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import client from '../api/client';
import { mockPackages } from '../data/mockPackages';

const ContactForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const packageParam = params.get('package');
    const tierParam = params.get('tier');
    
    if (packageParam) {
      setFormData(prev => ({ ...prev, package: packageParam }));
    } else if (tierParam) {
      setFormData(prev => ({ ...prev, package: `${tierParam} Tier Package` }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await client.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        packageInterested: formData.package,
        message: formData.message
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', package: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending message. Please try again later.');
      setStatus('idle');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
      <h2 className="text-3xl font-display font-bold text-brand-dark mb-6">Plan Your Trip</h2>
      
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Request Received!</h3>
          <p>Thank you for reaching out. One of our travel experts will contact you shortly to finalize your itinerary.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors outline-none"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="relative">
              <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">Interested Package</label>
              
              {/* Custom Dropdown Trigger */}
              <div 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors outline-none bg-white flex justify-between items-center cursor-pointer ${dropdownOpen ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-gray-300'}`}
              >
                <span className={formData.package ? "text-gray-900" : "text-gray-500"}>
                  {formData.package || "Select a package..."}
                </span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              {/* Custom Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  <div 
                    onClick={() => { setFormData(prev => ({ ...prev, package: '' })); setDropdownOpen(false); }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-500 text-sm border-b"
                  >
                    Select a package...
                  </div>
                  
                  {formData.package && ![
                    ...mockPackages.map(p => p.title),
                    "Gold Tier Package", 
                    "Silver Tier Package", "Bronze Tier Package", "Other / General Inquiry"
                  ].includes(formData.package) && (
                    <div 
                      onClick={() => { setDropdownOpen(false); }}
                      className="px-4 py-3 bg-brand-light text-brand-dark cursor-pointer font-medium"
                    >
                      {formData.package}
                    </div>
                  )}
                  
                  <div className="px-3 py-2 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Destinations</div>
                  {mockPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      onClick={() => { setFormData(prev => ({ ...prev, package: pkg.title })); setDropdownOpen(false); }}
                      className="px-4 py-2 hover:bg-brand-primary hover:text-white cursor-pointer text-gray-700 transition-colors"
                    >
                      {pkg.title}
                    </div>
                  ))}
                  
                  <div className="px-3 py-2 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Tiers</div>
                  {["Gold Tier Package", "Silver Tier Package", "Bronze Tier Package"].map(tier => (
                    <div 
                      key={tier} 
                      onClick={() => { setFormData(prev => ({ ...prev, package: tier })); setDropdownOpen(false); }}
                      className="px-4 py-2 hover:bg-brand-primary hover:text-white cursor-pointer text-gray-700 transition-colors"
                    >
                      {tier}
                    </div>
                  ))}
                  
                  <div className="px-3 py-2 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Other</div>
                  <div 
                    onClick={() => { setFormData(prev => ({ ...prev, package: "Other / General Inquiry" })); setDropdownOpen(false); }}
                    className="px-4 py-2 hover:bg-brand-primary hover:text-white cursor-pointer text-gray-700 transition-colors"
                  >
                    Other / General Inquiry
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message / Requirements</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors outline-none resize-none"
              placeholder="Tell us about your travel dates, group size, or any special requests..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors flex justify-center items-center shadow-lg"
          >
            {status === 'loading' ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Send Request'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
