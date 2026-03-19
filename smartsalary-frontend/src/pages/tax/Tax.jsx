import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Receipt, Info } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { formatCurrency } from '../../utils/formatCurrency';

const taxSlabs = [
  { slab: 'Up to ₹3L', rate: '0%', bg: 'rgba(2,195,154,0.1)', color: '#02C39A' },
  { slab: '₹3L – ₹7L', rate: '5%', bg: 'rgba(239,159,39,0.1)', color: '#EF9F27' },
  { slab: '₹7L – ₹10L', rate: '10%', bg: 'rgba(239,159,39,0.15)', color: '#EF9F27' },
  { slab: '₹10L – ₹12L', rate: '15%', bg: 'rgba(226,75,74,0.1)', color: '#E24B4A' },
  { slab: '₹12L – ₹15L', rate: '20%', bg: 'rgba(226,75,74,0.12)', color: '#E24B4A' },
  { slab: 'Above ₹15L', rate: '30%', bg: 'rgba(226,75,74,0.15)', color: '#E24B4A' },
];

const deductions = [
  { name: '80C – ELSS/PPF/EPF', limit: 150000, claimed: 80000, color: '#1D9E75' },
  { name: '80D – Health Insurance', limit: 25000, claimed: 15000, color: '#6C63FF' },
  { name: 'HRA Exemption', limit: 120000, claimed: 120000, color: '#02C39A' },
  { name: 'Standard Deduction', limit: 50000, claimed: 50000, color: '#EF9F27' },
];

const Tax = () => {
  const [ctc, setCtc] = useState(800000);
  const [regime, setRegime] = useState('new');

  const grossIncome = ctc;
  const totalDeductions = regime === 'old' ? deductions.reduce((s, d) => s + d.claimed, 0) : 50000;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const calcTax = (income) => {
    if (income <= 300000) return 0;
    if (income <= 700000) return (income - 300000) * 0.05;
    if (income <= 1000000) return 20000 + (income - 700000) * 0.10;
    if (income <= 1200000) return 50000 + (income - 1000000) * 0.15;
    if (income <= 1500000) return 80000 + (income - 1200000) * 0.20;
    return 140000 + (income - 1500000) * 0.30;
  };

  const tax = calcTax(taxableIncome);
  const cess = tax * 0.04;
  const totalTax = Math.round(tax + cess);

  const taxBreakdown = [
    { name: 'Tax', value: Math.round(tax), color: '#E24B4A' },
    { name: 'Health & Edu Cess', value: Math.round(cess), color: '#EF9F27' },
    { name: 'Net Take-home', value: grossIncome - totalTax, color: '#1D9E75' },
  ];

  return (
    <div>
      <TopNav title="Tax Planner" subtitle="Maximize savings under Indian tax law" />
      <div className="p-6 space-y-6">
        {/* Regime toggle */}
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-white/90" style={{ fontFamily: 'Syne, sans-serif' }}>Tax Regime</p>
            <p className="text-[12px] text-white/45 mt-0.5">Select the regime that benefits you more</p>
          </div>
          <div className="flex gap-2">
            {['new', 'old'].map(r => (
              <button key={r} onClick={() => setRegime(r)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium capitalize transition-all"
                style={{
                  background: regime === r ? 'rgba(29,158,117,0.85)' : 'rgba(255,255,255,0.06)',
                  border: `0.5px solid ${regime === r ? 'rgba(93,202,165,0.5)' : 'rgba(255,255,255,0.14)'}`,
                  color: regime === r ? 'white' : 'rgba(255,255,255,0.6)',
                }}>
                {r} Regime
              </button>
            ))}
          </div>
        </div>

        {/* Tax Calculator */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-card p-5">
            <SectionHeader title="Tax Calculator" subtitle="FY 2025–26 (AY 2026–27)" />
            <div className="mb-5">
              <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-2">Annual CTC (₹)</label>
              <input type="range" min="300000" max="3000000" step="50000" value={ctc} onChange={e => setCtc(Number(e.target.value))}
                className="w-full" style={{ accentColor: '#1D9E75' }} />
              <p className="text-[24px] font-semibold text-[#5DCAA5] mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(ctc)}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Gross Income', value: formatCurrency(grossIncome, true), color: '#5DCAA5' },
                { label: 'Deductions', value: formatCurrency(totalDeductions, true), color: '#9F96FF' },
                { label: 'Taxable Income', value: formatCurrency(taxableIncome, true), color: '#EF9F27' },
                { label: 'Total Tax', value: formatCurrency(totalTax, true), color: '#E24B4A' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[18px] font-semibold" style={{ color: item.color, fontFamily: 'Outfit, sans-serif' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Deductions */}
            {regime === 'old' && (
              <div className="mt-5">
                <p className="text-[12px] text-white/50 mb-3 font-medium uppercase tracking-wider">Deductions Applied</p>
                <div className="space-y-3">
                  {deductions.map((d, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[12px] text-white/70">{d.name}</span>
                        <span className="text-[12px]" style={{ color: d.color }}>{formatCurrency(d.claimed, true)} / {formatCurrency(d.limit, true)}</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded overflow-hidden">
                        <motion.div className="h-full rounded" initial={{ width: 0 }}
                          animate={{ width: `${(d.claimed / d.limit) * 100}%` }}
                          transition={{ duration: 0.8 }} style={{ background: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tax breakdown pie + slabs */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <SectionHeader title="Tax Breakdown" subtitle="Visual split" />
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={taxBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                    {taxBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5">
                {taxBreakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-[11px] text-white/55">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: item.color }}>{formatCurrency(item.value, true)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <p className="text-[12px] font-medium text-white/70 mb-3">New Regime Slabs (FY26)</p>
              <div className="space-y-1.5">
                {taxSlabs.map((slab, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ background: slab.bg }}>
                    <span className="text-[11px] text-white/60">{slab.slab}</span>
                    <span className="text-[12px] font-semibold" style={{ color: slab.color }}>{slab.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Tax Tips */}
        <div className="glass-card p-5">
          <SectionHeader title="AI Tax Saving Tips" />
          <div className="grid md:grid-cols-2 gap-3">
            <AIInsightCard
              title="Invest ₹70K more in 80C to max out limit"
              description="You've invested ₹80K under 80C. Add ₹70K more (ELSS/PPF) to save additional ₹21,840 in taxes."
              action="Invest in ELSS"
              priority="high"
              delay={0.2}
            />
            <AIInsightCard
              title="Switch to Old Regime to save more"
              description="With your deductions, the Old Regime saves you ₹28,000 more in taxes this year."
              action="Compare Regimes"
              priority="medium"
              delay={0.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tax;
