import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <img src="/tamiltrailsfooter.png" alt="Tamil Trails" className="h-20 md:h-24 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity" />
            <p className="text-gray-400 mb-6 leading-relaxed">
              Curating unforgettable journeys across the enchanting landscapes and ancient temples of Tamil Nadu since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="/#packages" className="text-gray-400 hover:text-white transition-colors">Packages</a></li>
              <li><a href="/#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Packages */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Popular Packages</h4>
            <ul className="space-y-3">
              <li><Link to="/contact?package=Temple City Tour" className="text-gray-400 hover:text-white transition-colors">Temple City Tour</Link></li>
              <li><Link to="/contact?package=Ooty Hill Retreat" className="text-gray-400 hover:text-white transition-colors">Ooty Hill Retreat</Link></li>
              <li><Link to="/contact?package=Coastal Heritage Walk" className="text-gray-400 hover:text-white transition-colors">Coastal Heritage Walk</Link></li>
              <li><Link to="/contact?package=Nilgiri Wildlife Safari" className="text-gray-400 hover:text-white transition-colors">Nilgiri Safari</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <span className="block text-white font-medium mb-1">Address:</span>
                123 Heritage Lane, T. Nagar, Chennai, Tamil Nadu 600017
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Email:</span>
                hello@tamiltrails.in
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Phone:</span>
                +91 98765 43210
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tamil Trails. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
