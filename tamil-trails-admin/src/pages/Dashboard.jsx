import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineChevronDown, HiOutlineInbox, HiLogout } from 'react-icons/hi';
import api from '../api';

const Dashboard = ({ auth, setAuth }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
      return;
    }
    
    const fetchBookings = async () => {
      try {
        const res = await api.get('/admin/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [auth, navigate]);

  return (
    <div className="relative min-h-screen font-body text-white flex flex-col overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/herovideo.mp4" 
          autoPlay 
          loop
          muted
          playsInline
          className="w-full h-full object-cover" 
        />
        {/* Subtle overlay so text remains readable */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-accent-gold/20 shadow-[0_4px_30px_rgba(232,184,75,0.05)] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/tamiltrailsfooter.png" alt="Logo" className="h-16 md:h-20 object-contain drop-shadow-md" />
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-gold to-white bg-[length:200%_auto] animate-text-shine tracking-widest hidden sm:block drop-shadow-lg"
          >
            ADMIN DASHBOARD
          </motion.h1>
        </div>
        
        <button 
          onClick={() => { setAuth(false); navigate('/'); }}
          className="group relative flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 md:px-7 md:py-2.5 rounded-full font-bold text-white tracking-wider uppercase text-xs md:text-sm transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(232,184,75,0.25)] hover:border-accent-gold/50"
        >
          <span className="relative z-10 drop-shadow-md">Logout</span>
          <HiLogout className="relative z-10 text-lg drop-shadow-md group-hover:text-accent-gold transition-colors duration-300" />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] pointer-events-none"></div>
        </button>
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto p-6 md:p-8 space-y-8">
        
        {/* Stat Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-card p-6 hover:-translate-y-1 hover:border-accent-gold/40 transition-all shadow-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-300 font-medium text-sm drop-shadow-md">Total Requests</p>
              <div className="bg-accent-teal/30 p-2 rounded-full"><HiOutlineInbox className="text-accent-teal text-white drop-shadow-md" /></div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-accent-gold drop-shadow-md">
              {isLoading ? "-" : bookings.length}
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-card p-6 hover:-translate-y-1 hover:border-accent-gold/40 transition-all shadow-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-300 font-medium text-sm drop-shadow-md">New This Week</p>
              <div className="bg-accent-teal/30 p-2 rounded-full"><HiOutlineCalendar className="text-accent-teal text-white drop-shadow-md" /></div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-accent-gold drop-shadow-md">
              {isLoading ? "-" : bookings.slice(0, 3).length}
            </h3>
          </motion.div>
        </section>

        {/* Inquiry Table Section */}
        <section className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-card overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/[0.05]">
            <h2 className="text-lg md:text-xl font-heading font-bold text-white">Recent Booking Inquiries</h2>
          </div>

          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="p-12 flex flex-col space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="bg-white/5 p-6 rounded-full mb-4">
                  <HiOutlineInbox className="text-4xl text-gray-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">No inquiries yet</h3>
                <p className="text-gray-400 max-w-sm">When customers request packages, they will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-surface-border">
                    <th scope="col" className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Package</th>
                    <th scope="col" className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, idx) => (
                    <motion.tr 
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="border-b border-surface-border/50 hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-white">{booking.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]" title={booking.message}>{booking.message}</p>
                      </td>
                      <td className="py-4 px-6 space-y-1">
                        <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-accent-gold transition-colors">
                          <HiOutlineMail className="text-gray-500" /> {booking.email}
                        </a>
                        <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-accent-gold transition-colors">
                          <HiOutlinePhone className="text-gray-500" /> {booking.phone}
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
                          {booking.packageInterested || 'General'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <button className="flex items-center gap-1.5 px-3 py-1 bg-danger/15 text-danger border border-danger/30 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-danger/20 transition-colors cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></span>
                          New
                          <HiOutlineChevronDown className="ml-1 opacity-50" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
