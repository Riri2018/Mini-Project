import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const LoginIllustration = () => (
  <svg viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto opacity-80">
    <circle cx="150" cy="100" r="60" fill="rgba(29,158,117,0.08)" stroke="rgba(29,158,117,0.2)" strokeWidth="0.5" />
    <circle cx="150" cy="100" r="45" fill="rgba(29,158,117,0.06)" />
    <circle cx="150" cy="85" r="20" fill="rgba(29,158,117,0.2)" stroke="rgba(29,158,117,0.4)" strokeWidth="0.5" />
    <path d="M 120 130 Q 150 110 180 130 L 190 160 Q 150 175 110 160 Z" fill="rgba(29,158,117,0.15)" stroke="rgba(29,158,117,0.3)" strokeWidth="0.5" />
    {/* Floating coins */}
    <circle cx="60" cy="80" r="16" fill="rgba(239,159,39,0.15)" stroke="rgba(239,159,39,0.4)" strokeWidth="0.5" />
    <text x="60" y="86" textAnchor="middle" fontSize="14" fill="#EF9F27">₹</text>
    <circle cx="240" cy="60" r="12" fill="rgba(108,99,255,0.2)" stroke="rgba(108,99,255,0.4)" strokeWidth="0.5" />
    <text x="240" y="66" textAnchor="middle" fontSize="11" fill="#9F96FF">₹</text>
    <circle cx="50" cy="180" r="10" fill="rgba(2,195,154,0.15)" stroke="rgba(2,195,154,0.3)" strokeWidth="0.5" />
    {/* Chart line */}
    <path d="M 70 220 Q 110 200 140 210 Q 170 220 200 195 Q 220 180 250 170" stroke="#5DCAA5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <rect x="220" y="230" width="80" height="40" rx="10" fill="rgba(29,158,117,0.12)" stroke="rgba(29,158,117,0.3)" strokeWidth="0.5" />
    <text x="260" y="248" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">Portfolio</text>
    <text x="260" y="262" textAnchor="middle" fontSize="10" fill="#5DCAA5" fontFamily="Outfit">+24.6%</text>
  </svg>
);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ name: 'Arjun Sharma', email });
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d2a1e 40%, #1a0a2e 100%)' }}>
      {/* Mesh */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 20% 30%, rgba(29,158,117,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(108,99,255,0.15) 0%, transparent 55%)`
      }} />

      {/* Left panel — illustration */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md w-full text-center"
        >
          <LoginIllustration />
          <h2 className="text-[24px] font-semibold text-white/90 mt-6 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Your financial future starts here
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed">
            Track your salary, manage expenses, and grow your wealth with AI-powered insights tailored for fresh graduates.
          </p>
        </motion.div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-[18px] font-semibold text-white/95" style={{ fontFamily: 'Syne, sans-serif' }}>SmartSalary</span>
          </div>

          <div className="glass-card p-8">
            <h1 className="text-[24px] font-semibold text-white/95 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              Welcome back
            </h1>
            <p className="text-[13px] text-white/45 mb-6">Sign in to your SmartSalary account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.06em] text-white/50 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="arjun@email.com"
                    className="glass-input pl-9"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.06em] text-white/50 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="glass-input pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-[12px] text-[#5DCAA5] hover:opacity-80 transition-opacity">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 text-[14px] font-medium text-white rounded-xl border border-[rgba(93,202,165,0.5)] shadow-[0_4px_16px_rgba(29,158,117,0.3)] flex items-center justify-center gap-2 mt-2"
                style={{ background: loading ? 'rgba(29,158,117,0.5)' : 'rgba(29,158,117,0.9)', backdropFilter: 'blur(8px)' }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><span>Sign In</span><ArrowRight size={15} /></>
                )}
              </motion.button>
            </form>

            {/* Demo mode notice */}
            <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(108,99,255,0.1)', border: '0.5px solid rgba(108,99,255,0.25)' }}>
              <p className="text-[11px] text-white/45">Demo mode — any email/password works</p>
            </div>

            <p className="text-center text-[13px] text-white/40 mt-5">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#5DCAA5] hover:opacity-80 transition-opacity font-medium">
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
