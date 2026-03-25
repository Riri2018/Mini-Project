import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, PieChart, BookOpen, Star, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import InvestmentAreaChart from '@/components/charts/InvestmentAreaChart'
import SpendingDonut from '@/components/charts/SpendingDonut'
import useUserStore from '@/store/userStore'

const growthData = [
  { year: '2026', invested: 60000, value: 64000 },
  { year: '2027', invested: 120000, value: 137000 },
  { year: '2028', invested: 180000, value: 221000 },
  { year: '2029', invested: 240000, value: 318000 },
  { year: '2030', invested: 300000, value: 431000 },
  { year: '2031', invested: 360000, value: 562000 },
  { year: '2032', invested: 420000, value: 715000 },
  { year: '2033', invested: 480000, value: 893000 },
  { year: '2034', inserted: 540000, value: 1101000 },
  { year: '2035', invested: 600000, value: 1344000 },
]

const allocationData = [
  { name: 'Large Cap', value: 40, color: '#1D9E75' },
  { name: 'Mid Cap', value: 25, color: '#6C63FF' },
  { name: 'Index Fund', value: 20, color: '#EF9F27' },
  { name: 'Debt Fund', value: 10, color: '#028090' },
  { name: 'Gold ETF', value: 5, color: '#E24B4A' },
]

const funds = [
  { id: 1, name: 'Nifty 50 Index Fund', category: 'Large Cap', returns1y: 18.4, returns3y: 14.2, risk: 'Moderate', rating: 5 },
  { id: 2, name: 'Mirae Asset Emerging Bluechip', category: 'Mid Cap', returns1y: 24.1, returns3y: 18.8, risk: 'High', rating: 5 },
  { id: 3, name: 'HDFC Short Duration Debt', category: 'Debt', returns1y: 7.8, returns3y: 7.1, risk: 'Low', rating: 4 },
  { id: 4, name: 'SBI Gold ETF', category: 'Gold ETF', returns1y: 12.2, returns3y: 10.4, risk: 'Moderate', rating: 4 },
]

const riskFactors = [
  { label: 'Payment History', score: 90 },
  { label: 'Income Stability', score: 78 },
  { label: 'Age', score: 65 },
  { label: 'Dependants', score: 85 },
]

const learnCards = [
  { title: 'What is SIP?', desc: 'Systematic Investment Plan — invest a fixed amount every month in mutual funds.', color: '#1D9E75' },
  { title: 'What is ELSS?', desc: 'Equity Linked Savings Scheme — tax-saving mutual funds under Section 80C.', color: '#6C63FF' },
  { title: 'What is NAV?', desc: 'Net Asset Value — price per unit of a mutual fund, calculated daily.', color: '#EF9F27' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const riskVariantMap = { Low: 'success', Moderate: 'warning', High: 'danger' }

export default function Investments() {
  const { financialHealth } = useUserStore()
  const [showLearn, setShowLearn] = useState(true)
  const investmentScore = financialHealth.investmentScore

  return (
    <AppShell>
      <TopNav title="Investments" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Summary tiles */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Invested', value: '₹18,000', sub: 'Total corpus', color: 'text-ss-teal-light' },
                { label: 'Current Value', value: '₹21,400', sub: '+18.9% returns', color: 'text-ss-mint' },
                { label: 'Investment Score', value: `${investmentScore}/100`, sub: 'Room to grow', color: 'text-ss-violet-light' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            {/* Starter nudge */}
            <motion.div variants={item}>
              <GlassCardAccent>
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-ss-teal-light flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-white/90 mb-1">Start investing early</p>
                    <p className="text-[13px] text-white/60">
                      Investing ₹5,000/month at age 23 could grow to <span className="text-ss-teal-light font-medium">₹1.34 Crore</span> by age 43 at 12% p.a. Start with a simple index fund SIP.
                    </p>
                  </div>
                </div>
              </GlassCardAccent>
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left — growth chart + fund cards */}
              <div className="lg:col-span-2 space-y-5">
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-medium text-[15px] text-white/90">10-Year Growth Projection</h3>
                    <Badge variant="info">₹5k/month @ 12% p.a.</Badge>
                  </div>
                  <InvestmentAreaChart data={growthData} height={220} />
                </GlassCard>

                {/* Fund recommendations */}
                <div>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3 flex items-center gap-2">
                    <Star size={15} className="text-ss-amber" /> Recommended Funds
                  </h3>
                  <div className="space-y-3">
                    {funds.map((fund) => (
                      <GlassCard key={fund.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[14px] font-medium text-white/90">{fund.name}</p>
                              <Badge variant={riskVariantMap[fund.risk]}>{fund.risk}</Badge>
                            </div>
                            <p className="text-[12px] text-white/45">{fund.category}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[12px] text-white/45">1Y Return</p>
                            <p className="font-number font-medium text-[18px] text-ss-mint">{fund.returns1y}%</p>
                            <p className="text-[11px] text-white/35">3Y: {fund.returns3y}%</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < fund.rating ? 'text-ss-amber fill-ss-amber' : 'text-white/20'}
                            />
                          ))}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — risk profile, allocation, learn */}
              <div className="space-y-4">
                <GlassCardViolet>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3 flex items-center gap-2">
                    <TrendingUp size={15} className="text-ss-violet-light" /> Risk Profile
                  </h3>
                  <div className="text-center mb-4">
                    <span className="font-display font-semibold text-[22px] text-ss-violet-light">Moderate</span>
                    <p className="text-[12px] text-white/50 mt-1">Based on age & income stability</p>
                  </div>
                  <div className="space-y-2.5">
                    {riskFactors.map((f) => (
                      <div key={f.label} className="space-y-1">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/60">{f.label}</span>
                          <span className="text-white/50">{f.score}/100</span>
                        </div>
                        <ProgressBar value={f.score} max={100} color="violet" showLabel={false} />
                      </div>
                    ))}
                  </div>
                </GlassCardViolet>

                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3 flex items-center gap-2">
                    <PieChart size={15} className="text-ss-teal-light" /> Suggested Allocation
                  </h3>
                  <SpendingDonut data={allocationData} size={180} />
                  <div className="mt-3 space-y-1.5">
                    {allocationData.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-[12px] text-white/60 flex-1">{d.name}</span>
                        <span className="text-[11px] font-number text-white/50">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() => setShowLearn(!showLearn)}
                  >
                    <h3 className="font-display font-medium text-[14px] text-white/90 flex items-center gap-2">
                      <BookOpen size={15} className="text-ss-amber" /> Learn Basics
                    </h3>
                    {showLearn ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
                  </button>
                  {showLearn && (
                    <div className="mt-3 space-y-2.5">
                      {learnCards.map((c) => (
                        <div key={c.title} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                          <p className="text-[13px] font-medium mb-1" style={{ color: c.color }}>{c.title}</p>
                          <p className="text-[12px] text-white/55">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
