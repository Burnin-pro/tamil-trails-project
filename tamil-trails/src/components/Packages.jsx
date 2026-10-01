import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiFilter } from 'react-icons/hi';
import client from '../api/client';
import PackageCard from './PackageCard';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 9;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceFilter]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await client.get('/packages');
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching packages');
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const filteredPackages = packages.filter((pkg) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = pkg.name.toLowerCase().includes(term) || 
                          (pkg.highlights && pkg.highlights.some(h => h.toLowerCase().includes(term))) ||
                          (pkg.description && pkg.description.toLowerCase().includes(term));
                          (pkg.description && pkg.description.toLowerCase().includes(term));
    
    if (!matchesSearch) return false;

    if (priceFilter === 'under10k') return pkg.price < 10000;
    if (priceFilter === '10k-20k') return pkg.price >= 10000 && pkg.price <= 20000;
    if (priceFilter === 'above20k') return pkg.price > 20000;
    return true;
  });

  return (
    <section id="packages" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">Curated Experiences</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
            Choose from our handpicked tour packages designed to give you the most authentic Tamil Nadu experience.
          </p>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input 
                type="text" 
                placeholder="Search destinations or highlights..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="relative w-full md:w-1/3">
              <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary appearance-none bg-white"
              >
                <option value="all">All Prices</option>
                <option value="under10k">Under ₹10,000</option>
                <option value="10k-20k">₹10,000 - ₹20,000</option>
                <option value="above20k">Above ₹20,000</option>
              </select>
            </div>
            <button 
              className="w-full md:w-auto bg-brand-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-md"
              onClick={() => {
                // The filter happens automatically due to state variables, 
                // but this button gives users the explicit action they requested.
                console.log("Filter applied!");
              }}
            >
              Filter
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredPackages.length > 0 ? (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {filteredPackages.slice((currentPage - 1) * packagesPerPage, currentPage * packagesPerPage).map((pkg) => (
                <motion.div key={pkg._id} variants={cardVariants} className="h-full">
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {Math.ceil(filteredPackages.length / packagesPerPage) > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(filteredPackages.length / packagesPerPage) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-brand-primary text-white shadow-md' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPackages.length / packagesPerPage)));
                    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === Math.ceil(filteredPackages.length / packagesPerPage)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No packages found matching your criteria. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
