import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, ExternalLink } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import ProgressBar from '../../components/ui/ProgressBar';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { formatCurrency } from '../../utils/formatCurrency';

const portfolioAllocation = [
  { name: 'NIFTY 50 Index', value: 40, color: '#1D9E75' },
  { name: 'Mid Cap Fund', value: 25, color: '#6C63FF' },
  { name: 'ELSS (Tax Saving)', value: 20, color: '#02C39A' },
  { name: 'Gold ETF', value: 10, color: '#EF9F27' },
  { name: 'Liquid Fund', value: 5, color: '#5DCAA5' },
];

const projectionData = [
  { year: '2026', value: 48500 },
  { year: '2027', value: 75000 },
  { year: '2028', value: 112000 },
  { year: '2029', value: 158000 },
  { year: '2030', value: 218000 },
  { year: '2031', value: 295000 },
];

const topFunds = [
  { name: 'Mirae Asset NIFTY 50 ETF', type: 'Large Cap', returns: '18.4%', risk: 'Low', color: '#1D9E75' },
  { name: 'Axis Midcap Fund', type: 'Mid Cap', returns: '24.2%', risk: 'Medium', color: '#6C63FF' },
  { name: 'HDFC ELSS Tax Saver', type: 'ELSS', returns: '21.8%', risk: 'Medium', color: '#02C39A' },
  { name: 'SBI Gold ETF', type: 'Gold', returns: '12.1%', risk: 'Low', color: '#EF9F27' },
];

const Investments = () => {
  return (
    <div>
      <TopNav title="Investments" subtitle="Build long-term wealth with smart allocation" />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Portfolio Value', value: '₹48,500', color: '#9F96FF' },
            { label: 'Monthly SIP', value: '₹5,000', color: '#5DCAA5' },
            { label: 'Total Returns', value: '+18.4%', color: '#02C39A' },
            { label: 'Risk Profile', value: 'Moderate', color: '#EF9F27' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card-violet p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{s.label}</p>
              <p className="text-[24px] font-semibold" style={{ color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Growth projection */}
          <div className="lg:col-span-2 glass-card p-5">
            <SectionHeader title="Portfolio Projection" subtitle="Estimated growth at 15% p.a." />
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="#6C63FF" strokeWidth={2}
                  fill="url(#violetGrad)" dot={{ fill: '#9F96FF', r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio allocation donut */}
          <div className="glass-card p-5">
            <SectionHeader title="Allocation" subtitle="Suggested split" />
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={portfolioAllocation} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                  {portfolioAllocation.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {portfolioAllocation.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[11px] text-white/55">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Funds */}
        <div className="glass-card p-5">
          <SectionHeader title="Recommended Funds" subtitle="AI-curated picks for your risk profile" />
          <div className="grid md:grid-cols-2 gap-4">
            {topFunds.map((fund, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl flex items-start gap-3 cursor-pointer"
                style={{ background: `${fund.color}10`, border: `0.5px solid ${fund.color}30` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${fund.color}22`, border: `0.5px solid ${fund.color}44` }}>
                  <TrendingUp size={16} style={{ color: fund.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold text-white/90">{fund.name}</p>
                    <ExternalLink size={12} className="text-white/25 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[11px] text-white/45 mb-2">{fund.type}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold" style={{ color: '#02C39A' }}>+{fund.returns}</span>
                    <span className="badge-info text-[9px]">{fund.risk} Risk</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-5">
          <SectionHeader title="Investment AI Insights" />
          <div className="grid md:grid-cols-2 gap-3">
            <AIInsightCard
              title="Increase your SIP by ₹2,000/month"
              description="Your savings rate allows for this increase. Over 5 years, this adds ₹1.8L to your corpus."
              action="Adjust SIP"
              priority="medium"
              delay={0.3}
            />
            <AIInsightCard
              title="Add ₹50K in ELSS for tax savings"
              description="You can save up to ₹46,800 in tax by investing ₹1.5L in ELSS under Section 80C."
              action="Invest Now"
              priority="high"
              delay={0.35}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
