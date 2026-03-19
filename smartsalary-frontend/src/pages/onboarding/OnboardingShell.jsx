import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, DollarSign, Target, Receipt, PartyPopper, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';
import useUserStore from '../../store/userStore';
import useAuthStore from '../../store/authStore';

const steps = [
  { id: 1, title: 'Your Profile', subtitle: 'Tell us about yourself', icon: User },
  { id: 2, title: 'Salary Details', subtitle: 'Your compensation info', icon: DollarSign },
  { id: 3, title: 'Financial Goals', subtitle: "What do you want to achieve?", icon: Target },
  { id: 4, title: 'Fixed Expenses', subtitle: 'Your monthly commitments', icon: Receipt },
  { id: 5, title: "All Done!", subtitle: 'Your dashboard is ready', icon: PartyPopper },
];

const goalOptions = [
  { id: 'emergency_fund', label: 'Emergency Fund', emoji: '🛡️', color: '#5DCAA5' },
  { id: 'travel', label: 'Travel & Experiences', emoji: '✈️', color: '#9F96FF' },
  { id: 'investment', label: 'Wealth Building', emoji: '📈', color: '#02C39A' },
  { id: 'home', label: 'Own a Home', emoji: '🏠', color: '#EF9F27' },
  { id: 'education', label: 'Further Education', emoji: '🎓', color: '#5DCAA5' },
  { id: 'car', label: 'Buy a Vehicle', emoji: '🚗', color: '#9F96FF' },
];

const OnboardingShell = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', city: '',
    employer: '', salary: '', ctc: '', payDate: '1',
    goals: [],
    rent: '', emi: '', transport: '', food: '',
  });
  const { updateProfile } = useUserStore();
  const { completeOnboarding } = useAuthStore();
  const navigate = useNavigate();

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleGoal = (id) => {
    setForm(f => ({
      ...f,
      goals: f.goals.includes(id) ? f.goals.filter(g => g !== id) : [...f.goals, id],
    }));
  };

  const handleNext = () => {
    if (step < 5) setStep(s => s + 1);
  };

  const handleFinish = () => {
    updateProfile({
      name: form.name || 'Arjun Sharma',
      age: parseInt(form.age) || 24,
      city: form.city || 'Mumbai',
      employer: form.employer || 'TechCorp',
      salary: parseInt(form.salary) || 65000,
      goals: form.goals.length ? form.goals : ['emergency_fund', 'investment'],
    });
    completeOnboarding();
    navigate('/dashboard');
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d2a1e 40%, #1a0a2e 100%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 20% 20%, rgba(29,158,117,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(108,99,255,0.15) 0%, transparent 55%)`
      }} />

      <div className="w-full max-w-[480px] relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-[16px] font-semibold text-white/95" style={{ fontFamily: 'Syne, sans-serif' }}>SmartSalary</span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center">
                <motion.div
                  animate={{
                    background: s.id < step ? '#1D9E75' : s.id === step ? 'rgba(29,158,117,0.4)' : 'rgba(255,255,255,0.1)',
                    scale: s.id === step ? 1 : 0.85,
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium"
                  style={{ border: s.id <= step ? '1px solid rgba(29,158,117,0.5)' : '1px solid rgba(255,255,255,0.1)' }}
                >
                  {s.id < step ? <Check size={11} className="text-white" /> : (
                    <span style={{ color: s.id === step ? '#5DCAA5' : 'rgba(255,255,255,0.3)' }}>{s.id}</span>
                  )}
                </motion.div>
                {s.id < 5 && (
                  <motion.div
                    animate={{ background: s.id < step ? '#1D9E75' : 'rgba(255,255,255,0.1)' }}
                    className="w-8 h-[1px] mx-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={step}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-8"
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.35)' }}>
                {(() => { const Icon = steps[step - 1].icon; return <Icon size={18} className="text-[#5DCAA5]" />; })()}
              </div>
              <div>
                <h2 className="text-[18px] font-semibold text-white/95" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {steps[step - 1].title}
                </h2>
                <p className="text-[12px] text-white/45">{steps[step - 1].subtitle}</p>
              </div>
            </div>

            {/* Step content */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Full Name</label>
                  <input className="glass-input" placeholder="Arjun Sharma" value={form.name} onChange={e => setField('name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Age</label>
                    <input className="glass-input" placeholder="24" type="number" value={form.age} onChange={e => setField('age', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">City</label>
                    <input className="glass-input" placeholder="Mumbai" value={form.city} onChange={e => setField('city', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Employer</label>
                  <input className="glass-input" placeholder="TechCorp Pvt. Ltd." value={form.employer} onChange={e => setField('employer', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Monthly Take-Home (₹)</label>
                  <input className="glass-input" placeholder="65000" type="number" value={form.salary} onChange={e => setField('salary', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Annual CTC (₹)</label>
                  <input className="glass-input" placeholder="800000" type="number" value={form.ctc} onChange={e => setField('ctc', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Salary Credit Date</label>
                  <select className="glass-input select" value={form.payDate} onChange={e => setField('payDate', e.target.value)}
                    style={{ appearance: 'none' }}>
                    {[1,5,10,15,20,25,28,30].map(d => (
                      <option key={d} value={d} style={{ background: '#0a0e1a' }}>{d === 1 ? '1st' : d === 5 ? '5th' : `${d}th`} of month</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-[13px] text-white/55 mb-4">Select all that apply. We'll personalize your experience.</p>
                <div className="grid grid-cols-2 gap-3">
                  {goalOptions.map(goal => (
                    <motion.button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="p-3 rounded-xl text-left transition-all"
                      style={{
                        background: form.goals.includes(goal.id) ? `${goal.color}22` : 'rgba(255,255,255,0.04)',
                        border: `0.5px solid ${form.goals.includes(goal.id) ? goal.color + '55' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      <div className="text-xl mb-1">{goal.emoji}</div>
                      <div className="text-[12px] font-medium text-white/80">{goal.label}</div>
                      {form.goals.includes(goal.id) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-1">
                          <Check size={11} style={{ color: goal.color }} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <p className="text-[13px] text-white/55 mb-2">Enter 0 if not applicable. This helps calculate your disposable income.</p>
                {[
                  { key: 'rent', label: 'Rent / PG (₹)' },
                  { key: 'emi', label: 'Loan EMI (₹)' },
                  { key: 'transport', label: 'Travel / Fuel (₹)' },
                  { key: 'food', label: 'Food / Groceries (₹)' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">{f.label}</label>
                    <input className="glass-input" placeholder="0" type="number" value={form[f.key]} onChange={e => setField(f.key, e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(29,158,117,0.2)', border: '2px solid rgba(29,158,117,0.5)' }}
                >
                  <span className="text-4xl">🎉</span>
                </motion.div>
                <h3 className="text-[20px] font-semibold text-white/95 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Setup Complete!
                </h3>
                <p className="text-[13px] text-white/50 mb-5 leading-relaxed">
                  Your personalized financial dashboard is ready. Let's start your smart money journey!
                </p>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    { label: 'Budget Tracked', val: '50/30/20 Rule' },
                    { label: 'AI Advisor', val: 'Activated' },
                    { label: 'Health Score', val: '72 / 100' },
                    { label: 'Goals Set', val: `${form.goals.length || 2} goals` },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(29,158,117,0.1)', border: '0.5px solid rgba(29,158,117,0.25)' }}>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-[13px] font-medium text-[#5DCAA5]">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 1 && step < 5 && (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/60 border border-white/[0.14]"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <ArrowLeft size={14} /> Back
                </motion.button>
              )}
              {step < 5 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium text-white border border-[rgba(93,202,165,0.5)] shadow-[0_4px_16px_rgba(29,158,117,0.3)]"
                  style={{ background: 'rgba(29,158,117,0.9)', backdropFilter: 'blur(8px)' }}
                >
                  Continue <ArrowRight size={14} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleFinish}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium text-white border border-[rgba(93,202,165,0.5)] shadow-[0_4px_24px_rgba(29,158,117,0.4)]"
                  style={{ background: 'rgba(29,158,117,0.95)', backdropFilter: 'blur(8px)' }}
                >
                  Go to Dashboard <ArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingShell;
