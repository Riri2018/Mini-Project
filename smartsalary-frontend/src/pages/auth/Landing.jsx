import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Shield, Bot, Star, ChevronRight, Zap, IndianRupee } from 'lucide-react';

// Finance SVG Illustrations
const HeroIllustration = () => (
  <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Floating cards */}
    <rect x="20" y="60" width="180" height="110" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />
    <rect x="30" y="74" width="90" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
    <rect x="30" y="88" width="60" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
    <text x="30" y="134" fontSize="28" fontWeight="600" fill="#5DCAA5" fontFamily="Outfit, sans-serif">₹65,000</text>
    <text x="30" y="152" fontSize="10" fill="rgba(255,255,255,0.4)">Monthly Salary</text>
    <rect x="148" y="118" width="36" height="16" rx="8" fill="rgba(2,195,154,0.2)" stroke="rgba(2,195,154,0.4)" strokeWidth="0.5" />
    <text x="155" y="130" fontSize="8" fill="#02C39A">+12%</text>

    {/* Chart bars */}
    <rect x="220" y="60" width="180" height="130" rx="16" fill="rgba(108,99,255,0.1)" stroke="rgba(108,99,255,0.3)" strokeWidth="0.5" />
    <rect x="235" y="130" width="18" height="40" rx="4" fill="rgba(108,99,255,0.4)" />
    <rect x="259" y="115" width="18" height="55" rx="4" fill="rgba(108,99,255,0.5)" />
    <rect x="283" y="100" width="18" height="70" rx="4" fill="rgba(108,99,255,0.65)" />
    <rect x="307" y="85" width="18" height="85" rx="4" fill="#6C63FF" />
    <rect x="331" y="108" width="18" height="62" rx="4" fill="rgba(108,99,255,0.5)" />
    <rect x="355" y="90" width="18" height="80" rx="4" fill="rgba(108,99,255,0.6)" />
    <text x="235" y="80" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="Syne, sans-serif">Portfolio Growth</text>

    {/* Savings ring */}
    <circle cx="100" cy="260" r="60" fill="rgba(29,158,117,0.08)" stroke="rgba(29,158,117,0.2)" strokeWidth="0.5" />
    <circle cx="100" cy="260" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
    <circle cx="100" cy="260" r="60" fill="none" stroke="#1D9E75" strokeWidth="20" strokeDasharray="250" strokeDashoffset="80" strokeLinecap="round" transform="rotate(-90 100 260)" />
    <circle cx="100" cy="260" r="60" fill="none" stroke="#6C63FF" strokeWidth="20" strokeDasharray="80" strokeDashoffset="0" strokeLinecap="round" transform="rotate(100 100 260)" />
    <text x="100" y="255" textAnchor="middle" fontSize="18" fontWeight="600" fill="#5DCAA5" fontFamily="Outfit, sans-serif">72</text>
    <text x="100" y="270" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">Health Score</text>

    {/* AI chat bubble */}
    <rect x="185" y="210" width="220" height="70" rx="14" fill="rgba(29,158,117,0.12)" stroke="rgba(29,158,117,0.35)" strokeWidth="0.5" />
    <circle cx="207" cy="235" r="12" fill="rgba(29,158,117,0.3)" />
    <text x="207" y="239" textAnchor="middle" fontSize="10" fill="#5DCAA5">AI</text>
    <rect x="225" y="225" width="120" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
    <rect x="225" y="237" width="90" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
    <rect x="225" y="248" width="105" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
    <text x="350" y="268" fontSize="9" fill="rgba(29,158,117,0.7)">Tap to view →</text>

    {/* Floating coins */}
    <circle cx="370" cy="215" r="14" fill="rgba(239,159,39,0.2)" stroke="rgba(239,159,39,0.4)" strokeWidth="0.5" />
    <text x="370" y="220" textAnchor="middle" fontSize="14">₹</text>
    <circle cx="390" cy="240" r="10" fill="rgba(239,159,39,0.15)" stroke="rgba(239,159,39,0.3)" strokeWidth="0.5" />
    <text x="390" y="245" textAnchor="middle" fontSize="10">₹</text>
    <circle cx="360" cy="250" r="8" fill="rgba(239,159,39,0.1)" stroke="rgba(239,159,39,0.25)" strokeWidth="0.5" />
    <text x="360" y="254" textAnchor="middle" fontSize="8">₹</text>

    {/* Line chart */}
    <path d="M 185 330 Q 215 310 240 320 Q 270 330 295 300 Q 320 270 345 255 Q 360 248 390 235"
      stroke="#5DCAA5" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 185 330 Q 215 310 240 320 Q 270 330 295 300 Q 320 270 345 255 Q 360 248 390 235 L 390 340 L 185 340 Z"
      fill="url(#tealGrad)" opacity="0.3" />
    <defs>
      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const FinanceSVG1 = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="36" fill="rgba(29,158,117,0.12)" stroke="rgba(29,158,117,0.3)" strokeWidth="0.5" />
    <path d="M40 20 L40 60 M30 28 L50 28 M28 40 L52 40 M30 52 L50 52" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" />
    <text x="37" y="45" fontSize="16" fill="#5DCAA5">₹</text>
  </svg>
);

const features = [
  {
    icon: TrendingUp,
    title: 'Smart Budget Tracker',
    desc: 'Automatically categorize expenses and get 50/30/20 rule insights with ML-powered overspend alerts.',
    color: '#5DCAA5',
    bg: 'rgba(29,158,117,0.12)',
    border: 'rgba(29,158,117,0.3)',
  },
  {
    icon: Bot,
    title: 'AI Financial Advisor',
    desc: 'Get personalized recommendations powered by machine learning. Know exactly where to invest your salary.',
    color: '#9F96FF',
    bg: 'rgba(108,99,255,0.1)',
    border: 'rgba(108,99,255,0.3)',
  },
  {
    icon: Shield,
    title: 'Tax & Insurance Guide',
    desc: 'Navigate Indian tax slabs (Old vs New regime), find deductions under 80C/80D, and plan insurance coverage.',
    color: '#EF9F27',
    bg: 'rgba(239,159,39,0.12)',
    border: 'rgba(239,159,39,0.3)',
  },
  {
    icon: Sparkles,
    title: 'Credit Score Builder',
    desc: 'Track your CIBIL score, understand score factors, and get a personalized improvement roadmap.',
    color: '#02C39A',
    bg: 'rgba(2,195,154,0.1)',
    border: 'rgba(2,195,154,0.3)',
  },
];

const stats = [
  { value: '50K+', label: 'Freshers Helped', color: '#5DCAA5' },
  { value: '₹2Cr+', label: 'Money Saved', color: '#9F96FF' },
  { value: '98%', label: 'Satisfaction', color: '#02C39A' },
  { value: '4.9★', label: 'App Rating', color: '#EF9F27' },
];

const testimonials = [
  {
    name: 'Priya Nair', role: 'Software Engineer, Pune',
    text: 'SmartSalary helped me understand where my ₹72K was going. Built an emergency fund in 4 months!',
    avatar: 'PN',
  },
  {
    name: 'Rohit Verma', role: 'Data Analyst, Bangalore',
    text: 'The AI advisor suggested the perfect SIP allocation. My portfolio is up 23% this year.',
    avatar: 'RV',
  },
  {
    name: 'Sneha Joshi', role: 'HR Executive, Mumbai',
    text: 'Finally understood tax savings! Saved ₹18K in taxes using 80C deductions I had no idea about.',
    avatar: 'SJ',
  },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Reviews', href: '#testimonials' },
  ];

  return (
    <div className="sticky top-0 z-50 flex justify-center" style={{ padding: '14px 24px 0' }}>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1100px',
          padding: '10px 16px 10px 20px',
          borderRadius: '20px',
          background: scrolled
            ? 'rgba(8, 12, 22, 0.92)'
            : 'rgba(10, 14, 26, 0.75)',
          backdropFilter: 'blur(24px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(29,158,117,0.08)'
            : '0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.04) inset',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1D9E75 0%, #6C63FF 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(29,158,117,0.4)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
            <IndianRupee size={15} color="white" />
          </motion.div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}>
            SmartSalary
          </span>
          <span style={{
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em',
            padding: '2px 6px', borderRadius: '20px',
            background: 'rgba(29,158,117,0.2)', border: '0.5px solid rgba(29,158,117,0.5)',
            color: '#5DCAA5', textTransform: 'uppercase',
          }}>BETA</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onHoverStart={() => setHovered(link.label)}
              onHoverEnd={() => setHovered(null)}
              style={{
                position: 'relative', padding: '6px 14px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 500,
                color: active === link.label ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.52)',
                textDecoration: 'none', transition: 'color 0.2s',
                background: hovered === link.label ? 'rgba(255,255,255,0.06)' : 'transparent',
              }}
              whileHover={{ color: 'rgba(255,255,255,0.92)' }}
              onClick={() => setActive(link.label)}
            >
              {link.label}
              {hovered === link.label && (
                <motion.div
                  layoutId="nav-highlight"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              {active === link.label && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#5DCAA5',
                    boxShadow: '0 0 6px #5DCAA5',
                  }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/login" style={{
            fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.55)',
            textDecoration: 'none', padding: '7px 14px', borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.2s',
          }}>
            Sign In
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(29,158,117,0.55)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: 'relative', overflow: 'hidden',
                padding: '8px 18px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #1D9E75 0%, #028090 50%, #6C63FF 100%)',
                border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 600, color: 'white',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 16px rgba(29,158,117,0.4), 0 1px 0 rgba(255,255,255,0.15) inset',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0, width: '60%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              <Sparkles size={13} />
              Get Started Free
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
const Landing = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d2a1e 40%, #1a0a2e 100%)' }}>
      {/* Mesh background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 15% 20%, rgba(29,158,117,0.2) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 75%, rgba(108,99,255,0.18) 0%, transparent 55%),
          radial-gradient(ellipse at 55% 5%, rgba(2,128,144,0.14) 0%, transparent 50%)
        `
      }} />

      {/* ===== NAVBAR ===== */}
      <NavBar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-10 pb-20" style={{ padding: '40px 40px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium"
              style={{ background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.4)', color: '#5DCAA5' }}>
              <Zap size={11} />
              AI-Powered Financial Intelligence for Freshers
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[42px] md:text-[56px] font-bold leading-[1.05] tracking-[-0.025em]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <span className="text-white/95">Your first salary,</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #5DCAA5 0%, #9F96FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                managed smartly.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[15px] text-white/55 leading-relaxed max-w-md">
              SmartSalary is the all-in-one financial platform built for India's fresh graduates.
              Budget, save, invest, and grow — powered by AI that understands your financial journey.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(29,158,117,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-white rounded-xl border border-[rgba(93,202,165,0.5)] shadow-[0_4px_20px_rgba(29,158,117,0.35)]"
                  style={{ background: 'rgba(29,158,117,0.9)', backdropFilter: 'blur(8px)' }}
                >
                  Start for Free <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-white/75 rounded-xl border border-white/[0.18]"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['AS', 'PR', 'MK', 'SJ'].map((init, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border border-[rgba(29,158,117,0.4)] flex items-center justify-center text-[9px] font-medium"
                    style={{ background: `hsl(${160 + i * 30}, 40%, 25%)`, color: '#5DCAA5' }}>
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-white/45">
                Trusted by <span className="text-[#5DCAA5] font-medium">50,000+</span> fresh graduates
              </p>
            </motion.div>
          </motion.div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            >
              <HeroIllustration />
            </motion.div>
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(29,158,117,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{ padding: '40px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center"
            >
              <div className="text-[32px] font-bold mb-1" style={{ color: stat.color, fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-[11px] text-white/45 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={{ padding: '80px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium mb-4"
              style={{ background: 'rgba(108,99,255,0.15)', border: '0.5px solid rgba(108,99,255,0.4)', color: '#9F96FF' }}>
              <Sparkles size={11} />
              Everything you need
            </div>
            <h2 className="text-[36px] font-bold text-white/95 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Your complete financial toolkit
            </h2>
            <p className="text-[15px] text-white/50 max-w-md mx-auto">
              From day-one salary management to long-term wealth building — we've got you covered.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-[20px] cursor-pointer"
                style={{ background: feat.bg, border: `0.5px solid ${feat.border}` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}22`, border: `0.5px solid ${feat.color}44` }}>
                  <feat.icon size={18} style={{ color: feat.color }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white/90 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {feat.title}
                </h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{feat.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-[12px] font-medium" style={{ color: feat.color }}>
                  Learn more <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" style={{ padding: '80px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-white/95 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Get started in minutes
            </h2>
            <p className="text-[15px] text-white/50">Three simple steps to financial clarity</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up with your email and complete a quick 5-minute profile to personalize your experience.', color: '#5DCAA5' },
              { step: '02', title: 'Enter Your Salary', desc: 'Input your CTC, take-home pay, and fixed expenses. Our AI builds your budget instantly.', color: '#9F96FF' },
              { step: '03', title: 'Get AI Insights', desc: 'Receive personalized recommendations on budgeting, investing, and tax-saving — daily.', color: '#02C39A' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-6 relative text-center"
              >
                <div className="text-[48px] font-bold opacity-10 mb-2" style={{ color: step.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>
                  {step.step}
                </div>
                <h3 className="text-[16px] font-semibold text-white/90 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{step.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" style={{ padding: '80px 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-white/95 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Loved by freshers across India
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#EF9F27" className="text-[#EF9F27]" />
                  ))}
                </div>
                <p className="text-[13px] text-white/65 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium"
                    style={{ background: 'rgba(29,158,117,0.25)', border: '1px solid rgba(29,158,117,0.4)', color: '#5DCAA5' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/85">{t.name}</p>
                    <p className="text-[11px] text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '96px 40px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-12 rounded-[28px] relative overflow-hidden"
          style={{
            background: 'rgba(29,158,117,0.12)',
            border: '0.5px solid rgba(29,158,117,0.35)',
            boxShadow: '0 0 60px rgba(29,158,117,0.15)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(29,158,117,0.2) 0%, transparent 60%)' }} />
          <h2 className="text-[36px] font-bold text-white/95 mb-4 relative z-10" style={{ fontFamily: 'Syne, sans-serif' }}>
            Start your financial journey today
          </h2>
          <p className="text-[15px] text-white/55 mb-8 relative z-10">
            Free forever for freshers. No credit card required.
          </p>
          <Link to="/register" className="relative z-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(29,158,117,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white rounded-xl border border-[rgba(93,202,165,0.5)] shadow-[0_4px_24px_rgba(29,158,117,0.4)]"
              style={{ background: 'rgba(29,158,117,0.95)', backdropFilter: 'blur(8px)' }}
            >
              Create Free Account <ArrowRight size={17} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
            <Sparkles size={9} className="text-white" />
          </div>
          <span className="text-white/50 font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>SmartSalary</span>
        </div>
        <p>© 2026 SmartSalary — Mini Project, LTCE Navi Mumbai</p>
      </footer>
    </div>
  );
};

export default Landing;
