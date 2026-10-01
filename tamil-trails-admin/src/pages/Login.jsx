import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import api from '../api';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await api.post('/admin/login', { username, password });
      if (res.data.success) {
        setTimeout(() => {
          setAuth(true);
          navigate('/dashboard');
        }, 300);
      }
    } catch (err) {
      console.error(err);
      setError('Incorrect username or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0F1D] overflow-hidden font-body">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/3dkanniykumari1.mp4" 
          autoPlay 
          loop
          muted
          playsInline
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,10,20,0.35) 0%, rgba(6,10,20,0.55) 100%)' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 glass-card w-[92vw] md:w-[420px] px-8 md:px-[32px] py-[48px] flex flex-col items-center ${error ? 'animate-shake' : ''}`}
      >
        <div className="text-center mb-[24px]">
          <img src="/tamiltrailsfooter.png" alt="Tamil Trails" className="h-[90px] md:h-[120px] object-contain mx-auto mb-[24px]" />
          <motion.h2 
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
            className="text-[22px] md:text-[28px] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-gold to-white bg-[length:200%_auto] animate-text-shine tracking-[4px] uppercase drop-shadow-lg"
          >
            Admin Portal
          </motion.h2>
        </div>

        {error && (
          <div className="mb-4 w-full p-3 bg-[#E14B4B]/20 border border-[#E14B4B]/50 rounded-xl text-[#FFDADA] text-sm text-center backdrop-blur-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-[16px]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className={`w-full px-5 py-3.5 rounded-full bg-white/10 border ${error ? 'border-[#E85D5D]' : 'border-white/20'} text-white placeholder-white/65 focus:outline-none focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(232,184,75,0.25)] transition-all font-body text-[15px]`}
              required
            />
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full px-5 py-3.5 rounded-full bg-white/10 border ${error ? 'border-[#E85D5D]' : 'border-white/20'} text-white placeholder-white/65 focus:outline-none focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(232,184,75,0.25)] transition-all font-body text-[15px]`}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/65 hover:text-white transition-colors p-1"
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black font-bold py-3.5 rounded-full transition-all duration-300 ease-out text-[14px] font-body flex justify-center items-center h-[52px] tracking-[2px] uppercase shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] mt-[16px]"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Access Dashboard"}
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
