import { motion } from 'framer-motion'
import { Wallet, PiggyBank, TrendingUp, CreditCard, Bot, ArrowRight, Target, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import StatTile from '@/components/shared/StatTile'
import AIInsightCard from '@/components/shared/AIInsightCard'
import ProgressBar from '@/components/ui/ProgressBar'
import SavingsLineChart from '@/components/charts/SavingsLineChart'
import SpendingDonut from '@/components/charts/SpendingDonut'
import useAuthStore from '@/store/authStore'
import useUserStore from '@/store/userStore'

const savingsData = [
  { month: 'Sep', savings: 3200, target: 5000 },
  { month: 'Oct', savings: 4100, target: 5000 },
  { month: 'Nov', savings: 3800, target: 5000 },
  { month: 'Dec', savings: 5200, target: 5000 },
  { month: 'Jan', savings: 4800, target: 5000 },
  { month: 'Feb', savings: 6100, target: 5000 },
  { month: 'Mar', savings: 5500, target: 5000 },
]

const spendingData = [
  { name: 'Rent', value: 12000, color: '#1D9E75' },
  { name: 'Food', value: 5000, color: '#6C63FF' },
  { name: 'Transport', value: 2000, color: '#EF9F27' },
  { name: 'Utilities', value: 1500, color: '#028090' },
  { name: 'Entertainment', value: 3000, color: '#E24B4A' },
  { name: 'Other', value: 2500, color: '#02C39A' },
]

const recentActivity = [
  { id: 1, label: 'Zomato', category: 'Food', amount: -350, date: 'Today' },
  { id: 2, label: 'Salary Credit', category: 'Income', amount: 45000, date: 'Mar 1' },
  { id: 3, label: 'Netflix', category: 'Entertainment', amount: -649, date: 'Mar 3' },
  { id: 4, label: 'BEST Bus Pass', category: 'Transport', amount: -540, date: 'Mar 4' },
  { id: 5, label: 'Amazon Order', category: 'Shopping', amount: -1299, date: 'Mar 5' },
]

const aiInsights = [
  {
    id: 1,
    title: 'Reduce Entertainment Spend',
    insight: 'Your entertainment budget is 14% over target this month. Cutting back on OTT subscriptions could save ₹2,000/month.',
    route: '/budget',
  },
  {
    id: 2,
    title: 'Start SIP Investment',
    insight: 'You have ₹8,000 idle in savings. Starting a ₹5,000/month SIP in an index fund could grow to ₹9.4L in 10 years.',
    route: '/investments',
  },
  {
    id: 3,
    title: 'Tax Saving Opportunity',
    insight: 'You can save ₹15,000 in taxes by investing ₹50,000 in ELSS funds before March 31st under Section 80C.',
    route: '/tax',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const { profile, financialHealth } = useUserStore()
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <AppShell>
      <TopNav title="Dashboard" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">

          {/* Welcome banner */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <GlassCardAccent className="relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-ss-teal/20 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ss-violet/15 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-white/50 mb-1">{greeting},</p>
                    <h2 className="font-display font-semibold text-[22px] text-white/95">
                      {user?.name || profile.name} 👋
                    </h2>
                    <p className="text-sm text-white/55 mt-1">
                      Your financial health score is{' '}
                      <span className="text-ss-teal-light font-semibold">{financialHealth.score}/100</span>
                      . Keep it up!
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-white/40 uppercase tracking-wider">Health Score</span>
                    <div className="font-number font-bold text-[48px] text-ss-teal-light leading-none">
                      {financialHealth.score}
                    </div>
                    <div className="w-32">
                      <ProgressBar value={financialHealth.score} max={100} color="teal" />
                    </div>
                  </div>
                </div>
              </GlassCardAccent>
            </motion.div>

            {/* Stat tiles */}
            <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <StatTile
                label="Monthly Salary"
                value={`₹${profile.salary.toLocaleString()}`}
                icon={Wallet}
                trend={{ value: 0, isPositive: null, label: 'fixed' }}
              />
              <StatTile
                label="Total Savings"
                value="₹32,400"
                icon={PiggyBank}
                trend={{ value: 12, isPositive: true }}
              />
              <StatTile
                label="Investments"
                value="₹18,000"
                icon={TrendingUp}
                trend={{ value: 8.4, isPositive: true }}
              />
              <StatTile
                label="Credit Score"
                value={financialHealth.creditScore}
                icon={CreditCard}
                trend={{ value: 15, isPositive: true, label: 'pts this month' }}
              />
            </motion.div>

            {/* Charts row */}
            <motion.div variants={item} className="grid lg:grid-cols-2 gap-4 mt-4">
              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-medium text-[15px] text-white/90">Savings Trend</h3>
                  <span className="text-[12px] text-white/40">Last 7 months</span>
                </div>
                <SavingsLineChart data={savingsData} height={200} />
              </GlassCard>

              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-medium text-[15px] text-white/90">Spending Breakdown</h3>
                  <span className="text-[12px] text-white/40">This month</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-[180px]">
                    <SpendingDonut data={spendingData} size={180} />
                  </div>
                  <div className="flex-1 space-y-2">
                    {spendingData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                          <span className="text-[12px] text-white/60">{d.name}</span>
                        </div>
                        <span className="text-[12px] font-number text-white/80">₹{d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Budget Quick Overview */}
            <motion.div variants={item} className="mt-4">
              <GlassCard>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-medium text-[15px] text-white/90">Budget Overview</h3>
                  <button
                    onClick={() => navigate('/budget')}
                    className="flex items-center gap-1.5 text-[12px] text-ss-teal-light hover:text-white transition-colors"
                  >
                    View all <ArrowRight size={13} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Housing', spent: 12000, budget: 13500, color: 'teal' },
                    { label: 'Food & Dining', spent: 5000, budget: 6000, color: 'violet' },
                    { label: 'Transport', spent: 2000, budget: 2500, color: 'amber' },
                    { label: 'Entertainment', spent: 3000, budget: 2500, color: 'danger' },
                    { label: 'Utilities', spent: 1500, budget: 2000, color: 'teal' },
                    { label: 'Other', spent: 2500, budget: 3000, color: 'violet' },
                  ].map((cat) => (
                    <div key={cat.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-white/60">{cat.label}</span>
                        <span className="text-[11px] text-white/40">
                          ₹{cat.spent.toLocaleString()} / ₹{cat.budget.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar
                        value={cat.spent}
                        max={cat.budget}
                        color={cat.color}
                        showLabel={false}
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Bottom row: AI insights + recent activity */}
            <motion.div variants={item} className="grid lg:grid-cols-3 gap-4 mt-4">
              {/* AI Insights */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-medium text-[15px] text-white/90 flex items-center gap-2">
                    <Bot size={16} className="text-ss-teal-light" /> AI Insights
                  </h3>
                  <button
                    onClick={() => navigate('/ai-advisor')}
                    className="text-[12px] text-ss-teal-light hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    Full advisor <ArrowRight size={13} />
                  </button>
                </div>
                {aiInsights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    title={insight.title}
                    insight={insight.insight}
                    actionProps={{
                      label: 'Take action',
                      onClick: () => navigate(insight.route),
                    }}
                  />
                ))}
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-display font-medium text-[15px] text-white/90 mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-ss-amber" /> Recent Activity
                </h3>
                <GlassCard className="space-y-0.5 p-0 overflow-hidden">
                  {recentActivity.map((tx, i) => (
                    <div
                      key={tx.id}
                      className={`flex items-center justify-between px-4 py-3 ${i < recentActivity.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
                    >
                      <div>
                        <p className="text-[13px] text-white/85 font-medium">{tx.label}</p>
                        <p className="text-[11px] text-white/40">{tx.category} · {tx.date}</p>
                      </div>
                      <span
                        className={`font-number text-[13px] font-medium ${tx.amount > 0 ? 'text-ss-mint' : 'text-white/70'}`}
                      >
                        {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </GlassCard>

                {/* Goals quick view */}
                <div className="mt-3">
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3 flex items-center gap-2">
                    <Target size={16} className="text-ss-violet-light" /> Goals
                  </h3>
                  <GlassCard className="space-y-4">
                    {[
                      { label: 'Emergency Fund', current: 32400, target: 135000 },
                      { label: 'Vacation Fund', current: 8000, target: 30000 },
                    ].map((goal) => (
                      <div key={goal.label} className="space-y-1.5">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/70">{goal.label}</span>
                          <span className="text-white/50">
                            ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                          </span>
                        </div>
                        <ProgressBar value={goal.current} max={goal.target} color="violet" />
                      </div>
                    ))}
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
