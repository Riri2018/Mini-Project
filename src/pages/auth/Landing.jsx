import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, TrendingUp, PiggyBank, Shield, Brain,
  ArrowRight, CheckCircle2, BarChart3, Wallet, Receipt,
  CreditCard, Star, ChevronRight
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Financial Advisor',
    desc: 'Get personalised insights powered by ML — savings tips, tax hacks, and spending alerts tailored to your salary.',
    color: 'teal',
  },
  {
    icon: Wallet,
    title: 'Smart Budget Tracker',
    desc: 'Visualise your 50/30/20 budget split, track every rupee, and get ML-powered overspend alerts before they hit.',
    color: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Investment Guidance',
    desc: 'From SIPs to mutual funds — discover beginner-friendly investments matched to your risk profile.',
    color: 'teal',
  },
  {
    icon: Receipt,
    title: 'Tax Planning',
    desc: 'Compare Old vs New regime, maximise 80C deductions, and get a step-by-step ITR filing guide.',
    color: 'violet',
  },
  {
    icon: CreditCard,
    title: 'Credit Score Builder',
    desc: 'Understand what drives your score, get a first credit card guide, and improve with AI-powered tips.',
    color: 'teal',
  },
  {
    icon: Shield,
    title: 'Insurance Awareness',
    desc: 'Know exactly how much health, term, and vehicle cover you need — and how to get it cheaply.',
    color: 'violet',
  },
]

const stats = [
  { value: '₹45K', label: 'Avg salary tracked' },
  { value: '68%', label: 'Users save more in month 1' },
  { value: '4.9★', label: 'User satisfaction' },
  { value: '10min', label: 'Setup time' },
]

const testimonials = [
  {
    name: 'Priya M.',
    role: 'Software Engineer, Pune',
    quote: 'SmartSalary helped me start my first SIP within 2 weeks of my first salary. The AI tips are super practical!',
    initials: 'PM',
  },
  {
    name: 'Rohan K.',
    role: 'Data Analyst, Bengaluru',
    quote: 'I saved ₹8,000 in taxes just by following the 80C suggestions. This app literally pays for itself.',
    initials: 'RK',
  },
  {
    name: 'Sneha T.',
    role: 'UI Designer, Mumbai',
    quote: 'Finally an app that speaks to freshers. No jargon, just clear advice. My credit score jumped 40 points!',
    initials: 'ST',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Landing() {
  return (
    <div className="bg-mesh-page min-h-screen text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="SmartSalary" className="w-8 h-8" />
            <span className="font-display font-semibold text-[16px] text-white">SmartSalary</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['Features', 'How it works', 'About'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="nav-pill hover:text-white/80 transition-colors px-4 py-2 text-[13px]"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="nav-pill px-4 py-2 text-[13px]">Sign in</Link>
            <Link
              to="/register"
              className="bg-ss-teal/90 hover:bg-ss-teal text-white text-[13px] font-medium px-4 py-2 rounded-[10px] border border-ss-teal-light/40 shadow-[0_4px_16px_rgba(29,158,117,0.3)] hover:shadow-[0_6px_24px_rgba(29,158,117,0.45)] transition-all"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ss-teal/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-ss-violet/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ss-teal/10 border border-ss-teal/30 text-ss-teal-light text-[12px] font-medium mb-6"
          >
            <Sparkles size={13} />
            AI-powered for fresh graduates
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[46px] sm:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] mb-6"
          >
            Make your first salary{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ss-teal-light to-ss-mint">
              work harder
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-[17px] leading-relaxed max-w-xl mx-auto mb-10"
          >
            SmartSalary is your AI co-pilot for financial clarity — budget tracking,
            tax planning, investments, and credit scores in one beautiful dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/register"
              className="group flex items-center gap-2 bg-ss-teal/90 hover:bg-ss-teal text-white font-medium px-7 py-3.5 rounded-[12px] border border-ss-teal-light/40 shadow-[0_4px_24px_rgba(29,158,117,0.35)] hover:shadow-[0_8px_32px_rgba(29,158,117,0.5)] transition-all text-[15px]"
            >
              Start for free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.11] text-white/80 font-medium px-7 py-3.5 rounded-[12px] border border-white/[0.14] hover:border-white/25 transition-all text-[15px]"
            >
              Sign in
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-10 text-[12px] text-white/40"
          >
            {['No credit card required', 'Free forever for basics', 'Setup in 10 minutes'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-ss-teal-light" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16 relative"
        >
          <div className="glass-card p-6 rounded-[20px]">
            {/* Mock dashboard top bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[12px] text-white/40 font-medium uppercase tracking-widest">March 2026</p>
                <h2 className="font-display text-[22px] font-semibold text-white/95 mt-0.5">Good morning, Alex 👋</h2>
              </div>
              <div className="glass-card-violet px-4 py-2 rounded-[12px]">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Health Score</p>
                <p className="font-number text-[24px] font-medium text-ss-violet-light">72</p>
              </div>
            </div>

            {/* Mock stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Net Salary', value: '₹38,250', color: 'text-ss-teal-light', up: true },
                { label: 'Spent', value: '₹18,400', color: 'text-ss-amber', up: false },
                { label: 'Saved', value: '₹8,600', color: 'text-ss-mint', up: true },
                { label: 'Credit Score', value: '730', color: 'text-ss-violet-light', up: true },
              ].map(({ label, value, color, up }) => (
                <div key={label} className="glass-card p-3 rounded-[12px]">
                  <p className="text-[11px] text-white/40 mb-1">{label}</p>
                  <p className={`font-number font-medium text-[18px] ${color}`}>{value}</p>
                  <p className={`text-[10px] mt-0.5 ${up ? 'text-ss-mint' : 'text-ss-amber'}`}>
                    {up ? '↑' : '↓'} vs last month
                  </p>
                </div>
              ))}
            </div>

            {/* Mock budget bars */}
            <div className="glass-card-accent p-4 rounded-[12px]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-ss-teal-light" />
                <p className="text-[13px] font-medium text-white/90">AI Insight</p>
              </div>
              <p className="text-[13px] text-white/70">
                You've spent 48% of your food budget in the first 2 weeks. At this rate, you'll overshoot by ₹1,200. Try home-cooking on weekdays!
              </p>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-ss-teal/5 rounded-[28px] blur-[40px] -z-10" />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-number font-semibold text-[32px] text-ss-teal-light leading-none mb-2">{value}</p>
              <p className="text-[13px] text-white/50">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[12px] font-medium text-ss-teal-light uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="font-display text-[36px] font-semibold leading-tight tracking-[-0.015em]">
              Your complete financial toolkit
            </h2>
            <p className="text-white/50 text-[15px] mt-3 max-w-md mx-auto">
              From your first rupee to your first lakh — we've got every financial dimension covered.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className={`glass-card p-6 group cursor-default`}
              >
                <div className={`inline-flex p-2.5 rounded-[10px] mb-4 ${color === 'teal' ? 'bg-ss-teal/15 text-ss-teal-light' : 'bg-ss-violet/15 text-ss-violet-light'}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-[16px] text-white/95 mb-2">{title}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[12px] font-medium text-ss-violet-light uppercase tracking-widest mb-3">Simple setup</p>
            <h2 className="font-display text-[36px] font-semibold leading-tight tracking-[-0.015em]">
              Up and running in minutes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Enter your salary details', desc: 'Tell us your CTC, employer, and pay date. We calculate your in-hand salary instantly.' },
              { step: '02', title: 'Set your financial goals', desc: 'Emergency fund? Home down payment? Choose your goals and we build a personalised plan.' },
              { step: '03', title: 'Let AI guide your money', desc: 'Get weekly insights, alerts before you overspend, and investment recommendations.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 relative"
              >
                <div className="font-number text-[40px] font-medium text-ss-teal/20 leading-none mb-4">{step}</div>
                <h3 className="font-display font-semibold text-[16px] text-white/95 mb-2">{title}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-ss-amber text-ss-amber" />
              ))}
            </div>
            <h2 className="font-display text-[36px] font-semibold leading-tight tracking-[-0.015em]">
              Loved by freshers across India
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(({ name, role, quote, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <p className="text-[14px] text-white/70 leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ss-teal/25 border border-ss-teal/40 flex items-center justify-center text-[13px] font-medium text-ss-teal-light">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/90">{name}</p>
                    <p className="text-[11px] text-white/40">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-ss-teal/5 rounded-[40px] blur-[60px] -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-accent inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-ss-teal-light text-[12px] font-medium mb-6">
              <Sparkles size={13} />
              Free to get started
            </div>
            <h2 className="font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4">
              Your financial future{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ss-teal-light to-ss-mint">
                starts today
              </span>
            </h2>
            <p className="text-white/55 text-[16px] mb-10">
              Join thousands of freshers building smart money habits from salary day one.
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-ss-teal/90 hover:bg-ss-teal text-white font-medium px-8 py-4 rounded-[12px] border border-ss-teal-light/40 shadow-[0_4px_24px_rgba(29,158,117,0.35)] hover:shadow-[0_8px_40px_rgba(29,158,117,0.5)] transition-all text-[15px]"
            >
              Create your free account
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="SmartSalary" className="w-6 h-6" />
            <span className="font-display font-medium text-[14px] text-white/70">SmartSalary</span>
          </div>
          <p className="text-[12px] text-white/30 text-center">
            Mini Project — LTCE, Navi Mumbai, 2025-26 · Built with ❤️ and AI
          </p>
          <div className="flex items-center gap-4 text-[12px] text-white/40">
            <Link to="/login" className="hover:text-white/70 transition-colors">Sign in</Link>
            <Link to="/register" className="hover:text-white/70 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
