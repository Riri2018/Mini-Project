import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Plus, Target, Shield } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import ProgressBar from '../../components/ui/ProgressBar';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { formatCurrency } from '../../utils/formatCurrency';

const savingsTimeline = [
  { month: 'Sep', amount: 8000 }, { month: 'Oct', amount: 19000 },
  { month: 'Nov', amount: 28500 }, { month: 'Dec', amount: 42500 },
  { month: 'Jan', amount: 54500 }, { month: 'Feb', amount: 72500 },
  { month: 'Mar', amount: 94500 },
];

const goals = [
  { name: 'Emergency Fund', target: 195000, current: 94500, emoji: '🛡️', color: '#1D9E75', months: 5 },
  { name: 'International Trip', target: 120000, current: 35000, emoji: '✈️', color: '#9F96FF', months: 7 },
  { name: 'Laptop Upgrade', target: 80000, current: 60000, emoji: '💻', color: '#02C39A', months: 1 },
];

const Savings = () => {
  const [sipAmount, setSipAmount] = useState(5000);
  const sipReturns = Math.round(sipAmount * 12 * (((1.01 ** 36) - 1) / 0.01));

  return (
    <div>
      <TopNav title="Savings" subtitle="Building your financial safety net" />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Saved', value: 94500, color: '#5DCAA5' },
            { label: 'Monthly Savings', value: 22000, color: '#02C39A' },
            { label: 'Savings Rate', value: '33.8%', color: '#9F96FF' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{s.label}</p>
              <p className="text-[28px] font-semibold" style={{ color: s.color, fontFamily: 'Outfit, sans-serif' }}>
                {typeof s.value === 'number' ? formatCurrency(s.value, true) : s.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Savings timeline */}
          <div className="lg:col-span-2 glass-card p-5">
            <SectionHeader title="Savings Growth" subtitle="Cumulative savings over time" />
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={savingsTimeline}>
                <defs>
                  <linearGradient id="savGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${v / 1000}K`} />
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
                <Area type="monotone" dataKey="amount" stroke="#1D9E75" strokeWidth={2} fill="url(#savGrad2)"
                  dot={{ fill: '#5DCAA5', r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SIP Calculator */}
          <div className="glass-card p-5">
            <SectionHeader title="SIP Calculator" subtitle="Monthly investment growth" />
            <div className="mb-3">
              <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-2">Monthly SIP (₹)</label>
              <input className="glass-input" type="range" min="500" max="20000" step="500"
                value={sipAmount} onChange={e => setSipAmount(Number(e.target.value))}
                style={{ accentColor: '#1D9E75' }} />
              <p className="text-[24px] font-semibold text-[#5DCAA5] mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(sipAmount, true)}
              </p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(29,158,117,0.1)', border: '0.5px solid rgba(29,158,117,0.25)' }}>
              <p className="text-[11px] text-white/45 mb-2">After 3 years @ 12% p.a.</p>
              <p className="text-[22px] font-semibold text-[#5DCAA5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(sipReturns, true)}
              </p>
              <p className="text-[10px] text-[#02C39A] mt-1">
                Invested: {formatCurrency(sipAmount * 36, true)} · Gain: {formatCurrency(sipReturns - sipAmount * 36, true)}
              </p>
            </div>
          </div>
        </div>

        {/* Savings Goals */}
        <div className="glass-card p-5">
          <SectionHeader title="Savings Goals" subtitle="Track your financial targets"
            action={
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
                style={{ background: 'rgba(29,158,117,0.85)', border: '0.5px solid rgba(93,202,165,0.5)' }}>
                <Plus size={12} /> Add Goal
              </button>
            }
          />
          <div className="grid md:grid-cols-3 gap-4">
            {goals.map((goal, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl" style={{ background: `${goal.color}12`, border: `0.5px solid ${goal.color}35` }}>
                <div className="text-2xl mb-2">{goal.emoji}</div>
                <h4 className="text-[14px] font-semibold text-white/90 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{goal.name}</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px]" style={{ color: goal.color }}>{formatCurrency(goal.current, true)}</span>
                  <span className="text-[11px] text-white/40">{formatCurrency(goal.target, true)}</span>
                </div>
                <ProgressBar value={(goal.current / goal.target) * 100} variant={goal.color === '#1D9E75' ? 'teal' : goal.color === '#9F96FF' ? 'violet' : 'mint'} />
                <p className="text-[10px] text-white/35 mt-2">{goal.months} months to reach goal</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Fund */}
        <div className="glass-card-accent p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(29,158,117,0.2)', border: '0.5px solid rgba(29,158,117,0.4)' }}>
              <Shield size={18} className="text-[#5DCAA5]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-semibold text-white/90 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Emergency Fund Status</h3>
              <p className="text-[13px] text-white/55 mb-3">Target: 3× monthly expenses (₹1,95,000)</p>
              <ProgressBar value={48} variant="teal" showLabel />
              <p className="text-[12px] text-white/45 mt-2">You have 1.5 months covered. Keep saving to reach the 3-month target!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
