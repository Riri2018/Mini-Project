import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ name: form.name, email: form.email });
    setLoading(false);
    navigate('/onboarding');
  };

  const passwordStrength = () => {
    const p = form.password;
    if (p.length < 6) return 0;
    if (p.length < 8) return 1;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return 3;
    return 2;
  };
  const strength = passwordStrength();
  const strengthLabels = ['', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['', '#E24B4A', '#EF9F27', '#02C39A'];

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d2a1e 40%, #1a0a2e 100%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 20% 30%, rgba(29,158,117,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(108,99,255,0.15) 0%, transparent 55%)`
      }} />

      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-sm w-full">
          <h2 className="text-[28px] font-bold text-white/95 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Everything you get for free:
          </h2>
          <div className="space-y-4">
            {[
              { text: 'AI-powered budget tracking', color: '#5DCAA5' },
              { text: 'Salary breakdown & insights', color: '#5DCAA5' },
              { text: 'Investment recommendations', color: '#9F96FF' },
              { text: 'Tax planning with 80C/80D', color: '#9F96FF' },
              { text: 'CIBIL score improvement tips', color: '#02C39A' },
              { text: 'Emergency fund calculator', color: '#02C39A' },
              { text: 'SIP & mutual fund guidance', color: '#EF9F27' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}22`, border: `0.5px solid ${item.color}55` }}>
                  <Check size={10} style={{ color: item.color }} />
                </div>
                <span className="text-[14px] text-white/70">{item.text}</span>
              </motion.div>
            ))}
          </div>
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
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-[18px] font-semibold text-white/95" style={{ fontFamily: 'Syne, sans-serif' }}>SmartSalary</span>
          </div>

          <div className="glass-card p-8">
            <h1 className="text-[24px] font-semibold text-white/95 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              Create your account
            </h1>
            <p className="text-[13px] text-white/45 mb-6">Join 50,000+ freshers managing smarter</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.06em] text-white/50 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="Arjun Sharma" className="glass-input pl-9" required />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.06em] text-white/50 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="arjun@email.com" className="glass-input pl-9" required />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.06em] text-white/50 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                    placeholder="Min. 8 characters" className="glass-input pl-9 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-1 flex-1 rounded transition-all"
                          style={{ background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                    <p className="text-[10px]" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
                  </div>
                )}
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
                  <><span>Create Free Account</span><ArrowRight size={15} /></>
                )}
              </motion.button>
            </form>

            <p className="text-center text-[12px] text-white/30 mt-4">
              By signing up, you agree to our Terms & Privacy Policy
            </p>

            <p className="text-center text-[13px] text-white/40 mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-[#5DCAA5] hover:opacity-80 transition-opacity font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
