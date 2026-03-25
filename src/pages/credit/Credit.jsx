import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, TrendingUp, CheckCircle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import ScoreRadarChart from '@/components/charts/ScoreRadarChart'
import useUserStore from '@/store/userStore'

const scoreHistory = [
  { month: 'Sep', score: 695 },
  { month: 'Oct', score: 700 },
  { month: 'Nov', score: 708 },
  { month: 'Dec', score: 712 },
  { month: 'Jan', score: 718 },
  { month: 'Feb', score: 724 },
  { month: 'Mar', score: 730 },
]

const radarData = [
  { subject: 'Payment', A: 92, fullMark: 100 },
  { subject: 'Utilization', A: 74, fullMark: 100 },
  { subject: 'History', A: 58, fullMark: 100 },
  { subject: 'Mix', A: 65, fullMark: 100 },
  { subject: 'Enquiries', A: 80, fullMark: 100 },
]

const scoreFactors = [
  { label: 'Payment History', score: 92, weight: '35%', status: 'Excellent', variant: 'success' },
  { label: 'Credit Utilization', score: 74, weight: '30%', status: 'Good', variant: 'success' },
  { label: 'Credit History Length', score: 58, weight: '15%', status: 'Fair', variant: 'warning' },
  { label: 'Credit Mix', score: 65, weight: '10%', status: 'Fair', variant: 'warning' },
  { label: 'New Enquiries', score: 80, weight: '10%', status: 'Good', variant: 'success' },
]

const improvements = [
  { tip: 'Keep credit utilization below 30% — you\'re at 26%, great!', done: true },
  { tip: 'Never miss an EMI payment. Set auto-pay on all loans.', done: true },
  { tip: 'Avoid applying for multiple credit cards in a short time.', done: false },
  { tip: 'Keep your oldest credit card active to extend history length.', done: false },
  { tip: 'Add a small secured credit card to improve credit mix.', done: false },
]

const creditCards = [
  { name: 'SBI SimplyCLICK', type: 'Entry Level', benefit: 'Amazon vouchers, online cashback', fee: '₹499/year', forYou: true },
  { name: 'Axis Flipkart', type: 'Shopping', benefit: '5% cashback on Flipkart, 4% on Myntra', fee: '₹500/year', forYou: true },
  { name: 'HDFC MoneyBack+', type: 'Rewards', benefit: '2x points on online spends', fee: '₹500/year', forYou: false },
]

// Score arc gauge colors
function getScoreColor(score) {
  if (score >= 750) return '#1D9E75'
  if (score >= 700) return '#EF9F27'
  return '#E24B4A'
}
function getScoreLabel(score) {
  if (score >= 750) return 'Excellent'
  if (score >= 700) return 'Good'
  if (score >= 650) return 'Fair'
  return 'Poor'
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Credit() {
  const { financialHealth } = useUserStore()
  const score = financialHealth.creditScore
  const [showCards, setShowCards] = useState(false)

  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  // Arc path for SVG gauge (semi-circle)
  const radius = 80
  const cx = 110
  const cy = 110
  const startAngle = 180
  const endAngle = 0
  const pct = (score - 300) / (900 - 300)
  const angle = 180 - pct * 180
  const rad = (angle * Math.PI) / 180
  const pointerX = cx + radius * Math.cos(rad)
  const pointerY = cy - radius * Math.sin(rad)

  return (
    <AppShell>
      <TopNav title="Credit Score" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Summary tiles */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Credit Score', value: score, sub: scoreLabel, color: score >= 750 ? 'text-ss-mint' : score >= 700 ? 'text-ss-amber' : 'text-ss-danger' },
                { label: 'Score Change', value: '+35', sub: 'Last 6 months', color: 'text-ss-teal-light' },
                { label: 'Utilization', value: '26%', sub: 'Recommended <30%', color: 'text-ss-mint' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left: gauge + history + improvements */}
              <div className="lg:col-span-2 space-y-5">

                {/* Score gauge card */}
                <GlassCard>
                  <div className="flex flex-col items-center">
                    <svg width={220} height={130} viewBox="0 0 220 130">
                      {/* Background arc */}
                      <path
                        d="M 30 110 A 80 80 0 0 1 190 110"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      {/* Score range zones */}
                      <path d="M 30 110 A 80 80 0 0 1 79 43" fill="none" stroke="#E24B4A" strokeWidth="16" strokeLinecap="round" opacity="0.35" />
                      <path d="M 79 43 A 80 80 0 0 1 141 43" fill="none" stroke="#EF9F27" strokeWidth="16" strokeLinecap="round" opacity="0.35" />
                      <path d="M 141 43 A 80 80 0 0 1 190 110" fill="none" stroke="#1D9E75" strokeWidth="16" strokeLinecap="round" opacity="0.35" />
                      {/* Pointer */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={pointerX}
                        y2={pointerY}
                        stroke={scoreColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx={cx} cy={cy} r="6" fill={scoreColor} />
                      {/* Score labels */}
                      <text x="18" y="124" fontSize="10" fill="rgba(255,255,255,0.35)">300</text>
                      <text x="95" y="26" fontSize="10" fill="rgba(255,255,255,0.35)">600</text>
                      <text x="185" y="124" fontSize="10" fill="rgba(255,255,255,0.35)">900</text>
                    </svg>
                    <div className="text-center -mt-4">
                      <p className="font-number font-bold text-[48px] leading-none" style={{ color: scoreColor }}>{score}</p>
                      <p className="text-[14px] mt-1 font-medium" style={{ color: scoreColor }}>{scoreLabel}</p>
                      <p className="text-[12px] text-white/40 mt-1">CIBIL Score · Updated Mar 2026</p>
                    </div>
                  </div>
                  {/* Range indicator */}
                  <div className="mt-5 flex justify-between text-[11px] px-2">
                    {[
                      { label: 'Poor', range: '300–549', color: '#E24B4A' },
                      { label: 'Fair', range: '550–649', color: '#EF9F27' },
                      { label: 'Good', range: '650–749', color: '#028090' },
                      { label: 'Excellent', range: '750–900', color: '#1D9E75' },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                        <span className="text-white/40">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Score history */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-medium text-[15px] text-white/90 flex items-center gap-2">
                      <TrendingUp size={15} className="text-ss-teal-light" /> Score History
                    </h3>
                    <Badge variant="success">+35 pts in 6 months</Badge>
                  </div>
                  <div className="flex items-end gap-2 h-[120px] px-2">
                    {scoreHistory.map((s, i) => {
                      const h = ((s.score - 680) / (750 - 680)) * 100
                      const isLast = i === scoreHistory.length - 1
                      return (
                        <div key={s.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className={`text-[10px] font-number ${isLast ? 'text-ss-teal-light font-medium' : 'text-white/35'}`}>
                            {s.score}
                          </span>
                          <div className="w-full rounded-t-md flex-1 flex items-end">
                            <div
                              className="w-full rounded-t-md transition-all"
                              style={{
                                height: `${Math.max(15, h)}%`,
                                background: isLast
                                  ? 'linear-gradient(to top, #028090, #1D9E75)'
                                  : 'rgba(255,255,255,0.1)',
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-white/35">{s.month}</span>
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>

                {/* Improvement tips */}
                <div>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3">How to Improve</h3>
                  <div className="space-y-2.5">
                    {improvements.map((tip, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          tip.done
                            ? 'bg-ss-teal/5 border-ss-teal/20'
                            : 'bg-white/[0.03] border-white/[0.07]'
                        }`}
                      >
                        {tip.done
                          ? <CheckCircle size={16} className="text-ss-teal-light flex-shrink-0 mt-0.5" />
                          : <AlertCircle size={16} className="text-ss-amber flex-shrink-0 mt-0.5" />
                        }
                        <p className="text-[13px] text-white/70">{tip.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: radar + factors + card guide */}
              <div className="space-y-4">
                <GlassCardViolet>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-2">Score Breakdown</h3>
                  <ScoreRadarChart data={radarData} size={220} />
                </GlassCardViolet>

                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Score Factors</h3>
                  <div className="space-y-3">
                    {scoreFactors.map((f) => (
                      <div key={f.label} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[13px] text-white/80">{f.label}</span>
                            <span className="text-[11px] text-white/35 ml-1.5">({f.weight})</span>
                          </div>
                          <Badge variant={f.variant}>{f.status}</Badge>
                        </div>
                        <ProgressBar value={f.score} max={100} color={f.variant === 'success' ? 'teal' : 'amber'} showLabel={false} />
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* First credit card guide */}
                <GlassCardAccent>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() => setShowCards(!showCards)}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-ss-teal-light" />
                      <h3 className="font-display font-medium text-[14px] text-white/90">Card Recommendations</h3>
                    </div>
                    {showCards ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
                  </button>
                  {showCards && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-3"
                    >
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.05] mb-3">
                        <Info size={13} className="text-ss-teal-light flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] text-white/60">
                          With a score of {score}, you qualify for entry-level cards. Build history first.
                        </p>
                      </div>
                      {creditCards.map((card) => (
                        <div
                          key={card.name}
                          className={`p-3 rounded-xl border ${
                            card.forYou
                              ? 'border-ss-teal/25 bg-ss-teal/5'
                              : 'border-white/[0.07] bg-white/[0.03] opacity-60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-[13px] font-medium text-white/90">{card.name}</p>
                            <Badge variant={card.forYou ? 'success' : 'info'}>{card.type}</Badge>
                          </div>
                          <p className="text-[12px] text-white/55 mb-1">{card.benefit}</p>
                          <p className="text-[11px] text-white/35">Annual fee: {card.fee}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </GlassCardAccent>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
