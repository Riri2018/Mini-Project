import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import AIInsightCard from '../../components/shared/AIInsightCard';
import ProgressBar from '../../components/ui/ProgressBar';

const scoreHistory = [
  { month: 'Sep', score: 640 }, { month: 'Oct', score: 648 },
  { month: 'Nov', score: 655 }, { month: 'Dec', score: 660 },
  { month: 'Jan', score: 668 }, { month: 'Feb', score: 672 },
  { month: 'Mar', score: 680 },
];

const scoreFactors = [
  { name: 'Payment History', impact: 'High', value: 85, color: '#02C39A', icon: CheckCircle },
  { name: 'Credit Utilization', impact: 'High', value: 30, color: '#EF9F27', icon: AlertTriangle },
  { name: 'Credit Age', impact: 'Medium', value: 20, color: '#E24B4A', icon: AlertTriangle },
  { name: 'Credit Mix', impact: 'Low', value: 60, color: '#5DCAA5', icon: CheckCircle },
  { name: 'New Inquiries', impact: 'Low', value: 70, color: '#9F96FF', icon: CheckCircle },
];

const Credit = () => {
  const score = 680;
  const maxScore = 900;
  const scorePercent = (score / maxScore) * 100;

  const getScoreColor = () => {
    if (score >= 750) return '#02C39A';
    if (score >= 650) return '#EF9F27';
    return '#E24B4A';
  };

  const getScoreLabel = () => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  return (
    <div>
      <TopNav title="Credit Score" subtitle="Your CIBIL score and improvement plan" />
      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Score gauge */}
          <div className="glass-card p-6 text-center">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-4">Your CIBIL Score</p>
            <div className="relative w-40 mx-auto mb-4">
              <svg viewBox="0 0 160 160" className="w-full">
                {/* Background arc */}
                <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14"
                  strokeDasharray="314" strokeDashoffset="0" strokeLinecap="round"
                  transform="rotate(135 80 80)" />
                {/* Score arc */}
                <motion.circle cx="80" cy="80" r="65" fill="none"
                  stroke={getScoreColor()} strokeWidth="14"
                  strokeDasharray="314"
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 314 - (314 * scorePercent / 100) }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  strokeLinecap="round" transform="rotate(135 80 80)" />
                <text x="80" y="80" textAnchor="middle" dominantBaseline="middle"
                  fontSize="28" fontWeight="600" fill={getScoreColor()} fontFamily="Outfit, sans-serif">
                  {score}
                </text>
                <text x="80" y="98" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">
                  out of {maxScore}
                </text>
              </svg>
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold"
              style={{ background: `${getScoreColor()}20`, border: `0.5px solid ${getScoreColor()}50`, color: getScoreColor() }}>
              {getScoreLabel()}
            </div>
            <p className="text-[11px] text-white/35 mt-3">Last updated: March 2026</p>
          </div>

          {/* Score history */}
          <div className="lg:col-span-2 glass-card p-5">
            <SectionHeader title="Score History" subtitle="6-month CIBIL trend" />
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scoreHistory}>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => [v, 'CIBIL Score']} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
                <Line type="monotone" dataKey="score" stroke="#EF9F27" strokeWidth={2.5}
                  dot={{ fill: '#EF9F27', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 rounded-xl flex items-center gap-3"
              style={{ background: 'rgba(2,195,154,0.1)', border: '0.5px solid rgba(2,195,154,0.3)' }}>
              <TrendingUp size={16} className="text-[#02C39A] shrink-0" />
              <p className="text-[12px] text-white/70">
                Your score improved by <span className="text-[#02C39A] font-medium">+40 points</span> in the last 6 months. Keep it up!
              </p>
            </div>
          </div>
        </div>

        {/* Score factors */}
        <div className="glass-card p-5">
          <SectionHeader title="Score Factors" subtitle="What affects your CIBIL score" />
          <div className="space-y-4">
            {scoreFactors.map((factor, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <factor.icon size={13} style={{ color: factor.color }} />
                    <span className="text-[13px] text-white/80">{factor.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                      background: `${factor.color}20`, color: factor.color,
                      border: `0.5px solid ${factor.color}40`
                    }}>
                      {factor.impact} Impact
                    </span>
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: factor.color }}>{factor.value}%</span>
                </div>
                <ProgressBar value={factor.value} variant={factor.value >= 70 ? 'teal' : factor.value >= 50 ? 'amber' : 'danger'} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Improvement tips */}
        <div className="glass-card p-5">
          <SectionHeader title="AI Improvement Tips" subtitle="Personalized recommendations to boost your score" />
          <div className="grid md:grid-cols-2 gap-3">
            <AIInsightCard
              title="Apply for your first credit card"
              description="A secured credit card with low limit helps build credit history. Use it for small purchases and pay on time."
              action="Compare Cards"
              priority="medium"
              delay={0.2}
            />
            <AIInsightCard
              title="Keep credit utilization below 30%"
              description="You're currently at 68% utilization. Reducing this to under 30% can add +50 points to your score."
              action="Learn More"
              priority="high"
              delay={0.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
