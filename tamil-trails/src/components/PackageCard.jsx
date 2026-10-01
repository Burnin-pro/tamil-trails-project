import { useNavigate } from 'react-router-dom';
import { HiOutlineClock } from 'react-icons/hi';

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/package/${pkg.slug}`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-brand-dark flex items-center gap-1">
          <HiOutlineClock className="text-brand-primary" />
          {pkg.duration}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-display text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">{pkg.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights.map((highlight, idx) => (
            <span key={idx} className="bg-brand-light text-gray-700 text-xs px-2 py-1 rounded-md font-medium">
              {highlight}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
            <p className="text-xl font-bold text-brand-dark">₹{pkg.price.toLocaleString('en-IN')}</p>
          </div>
          <button 
            onClick={handleBook}
            className="bg-brand-dark text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-primary transition-colors shadow-sm hover:shadow-md"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
