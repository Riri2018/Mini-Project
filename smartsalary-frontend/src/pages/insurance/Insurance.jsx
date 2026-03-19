import { motion } from 'framer-motion';
import { Shield, Heart, Car, Home, Check, ArrowRight } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { formatCurrency } from '../../utils/formatCurrency';

const insuranceTypes = [
  {
    icon: Heart, name: 'Health Insurance', coverage: '5 Lakh', premium: '600/mo', status: 'Active',
    color: '#E24B4A', bg: 'rgba(226,75,74,0.1)', border: 'rgba(226,75,74,0.3)',
    features: ['Hospitalization', 'Day Care', 'Pre & Post Care', 'Ambulance Cover'],
  },
  {
    icon: Shield, name: 'Term Life Insurance', coverage: '1 Crore', premium: '800/mo', status: 'Active',
    color: '#5DCAA5', bg: 'rgba(29,158,117,0.1)', border: 'rgba(29,158,117,0.3)',
    features: ['Death Benefit', 'Critical Illness', 'Accidental Death', 'Tax Benefit 80C'],
  },
  {
    icon: Car, name: 'Vehicle Insurance', coverage: 'Comprehensive', premium: '2,800/yr', status: 'Active',
    color: '#9F96FF', bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.3)',
    features: ['Third-party Liability', 'Own Damage', 'Personal Accident', 'Zero Depreciation'],
  },
  {
    icon: Home, name: 'Home Insurance', coverage: 'Not Covered', premium: '—', status: 'Not Active',
    color: '#EF9F27', bg: 'rgba(239,159,39,0.08)', border: 'rgba(239,159,39,0.25)',
    features: ['Contents Cover', 'Structure', 'Natural Calamity', 'Theft'],
  },
];

const Insurance = () => (
  <div>
    <TopNav title="Insurance" subtitle="Protect yourself and your family" />
    <div className="p-6 space-y-6">
      {/* Coverage summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Policies', value: '3', color: '#02C39A' },
          { label: 'Annual Premium', value: '₹16.2K', color: '#5DCAA5' },
          { label: 'Total Coverage', value: '₹1.05Cr', color: '#9F96FF' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-5 text-center">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{s.label}</p>
            <p className="text-[28px] font-semibold" style={{ color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Insurance cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {insuranceTypes.map((ins, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-[16px]"
            style={{ background: ins.bg, border: `0.5px solid ${ins.border}` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${ins.color}22`, border: `0.5px solid ${ins.color}44` }}>
                  <ins.icon size={18} style={{ color: ins.color }} />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-white/90" style={{ fontFamily: 'Syne, sans-serif' }}>{ins.name}</h3>
                  <p className="text-[11px] text-white/45">{ins.coverage} coverage</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium"
                style={{
                  background: ins.status === 'Active' ? 'rgba(2,195,154,0.15)' : 'rgba(239,159,39,0.15)',
                  color: ins.status === 'Active' ? '#02C39A' : '#EF9F27',
                  border: `0.5px solid ${ins.status === 'Active' ? 'rgba(2,195,154,0.3)' : 'rgba(239,159,39,0.3)'}`,
                }}>
                {ins.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {ins.features.map((f, j) => (
                <div key={j} className="flex items-center gap-1.5">
                  <Check size={10} style={{ color: ins.status === 'Active' ? ins.color : 'rgba(255,255,255,0.2)' }} />
                  <span className="text-[11px] text-white/55">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: `0.5px solid ${ins.color}20` }}>
              <span className="text-[13px] font-semibold" style={{ color: ins.color, fontFamily: 'Outfit, sans-serif' }}>
                ₹{ins.premium}
              </span>
              <button className="flex items-center gap-1 text-[12px]" style={{ color: ins.color }}>
                {ins.status === 'Active' ? 'View Policy' : 'Get Covered'} <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-5">
        <SectionHeader title="AI Insurance Advice" />
        <div className="grid md:grid-cols-2 gap-3">
          <AIInsightCard
            title="Get Home Insurance — you're not covered"
            description="As a renter in Mumbai, renters insurance costs only ₹500/year and covers theft and damages up to ₹2L."
            action="Get Covered"
            priority="medium"
            delay={0.2}
          />
          <AIInsightCard
            title="Upgrade health cover to ₹10 Lakh"
            description="With medical inflation at 14%, your ₹5L cover may fall short. Upgrade for just ₹400/month extra."
            action="Upgrade Plan"
            priority="low"
            delay={0.25}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Insurance;
