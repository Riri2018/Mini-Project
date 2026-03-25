import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, TrendingUp, Shield, Calculator, ChevronDown, ChevronUp } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import SavingsLineChart from '@/components/charts/SavingsLineChart'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const savingsHistory = [
  { month: 'Aug', savings: 2800, target: 4500 },
  { month: 'Sep', savings: 3200, target: 4500 },
  { month: 'Oct', savings: 4100, target: 4500 },
  { month: 'Nov', savings: 3800, target: 4500 },
  { month: 'Dec', savings: 5200, target: 4500 },
  { month: 'Jan', savings: 4800, target: 4500 },
  { month: 'Feb', savings: 6100, target: 4500 },
  { month: 'Mar', savings: 5500, target: 4500 },
]

const goals = [
  { id: 1, name: 'Emergency Fund', target: 135000, current: 32400, deadline: 'Dec 2026', icon: Shield, color: '#1D9E75' },
  { id: 2, name: 'Vacation Fund', target: 30000, current: 8000, deadline: 'Jun 2026', icon: Target, color: '#6C63FF' },
  { id: 3, name: 'Laptop Upgrade', target: 80000, current: 12000, deadline: 'Sep 2026', icon: TrendingUp, color: '#EF9F27' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Savings() {
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [sipAmount, setSipAmount] = useState(5000)
  const [sipYears, setSipYears] = useState(10)
  const [sipReturn, setSipReturn] = useState(12)
  const [showSIP, setShowSIP] = useState(false)

  const totalSaved = goals.reduce((s, g) => s + g.current, 0)

  // SIP Calculator
  const monthlyRate = sipReturn / 100 / 12
  const months = sipYears * 12
  const sipMaturity = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  const sipInvested = sipAmount * months

  return (
    <AppShell>
      <TopNav title="Savings" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Summary */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Saved', value: `₹${totalSaved.toLocaleString()}`, sub: 'Across all goals', color: 'text-ss-teal-light' },
                { label: 'Monthly Savings', value: '₹5,500', sub: 'This month', color: 'text-white/90' },
                { label: 'Savings Rate', value: '12.2%', sub: 'Of income', color: 'text-ss-violet-light' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-5">
                {/* Savings trend */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-medium text-[15px] text-white/90">Savings Trend</h3>
                    <Badge variant="success">On Track</Badge>
                  </div>
                  <SavingsLineChart data={savingsHistory} height={220} />
                </GlassCard>

                {/* Goals */}
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-medium text-[15px] text-white/90 flex items-center gap-2">
                    <Target size={16} className="text-ss-teal-light" /> Savings Goals
                  </h3>
                  <Button variant="ghost" onClick={() => setShowGoalModal(true)} icon={<Plus size={14} />}>
                    Add Goal
                  </Button>
                </div>
                <div className="space-y-3">
                  {goals.map((goal) => {
                    const GoalIcon = goal.icon
                    const pct = Math.round(goal.current / goal.target * 100)
                    const monthly = Math.round((goal.target - goal.current) / 9) // rough months
                    return (
                      <GlassCard key={goal.id} className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl" style={{ background: `${goal.color}22` }}>
                              <GoalIcon size={18} style={{ color: goal.color }} />
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-white/90">{goal.name}</p>
                              <p className="text-[12px] text-white/45">Target: {goal.deadline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-number text-white/85">
                              ₹{goal.current.toLocaleString()} <span className="text-white/35">/ ₹{goal.target.toLocaleString()}</span>
                            </p>
                            <p className="text-[11px] text-white/40">Need ₹{monthly.toLocaleString()}/mo</p>
                          </div>
                        </div>
                        <ProgressBar value={goal.current} max={goal.target} color={pct > 60 ? 'teal' : 'violet'} />
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/50">{pct}% complete</span>
                          <span className="text-white/35">₹{(goal.target - goal.current).toLocaleString()} remaining</span>
                        </div>
                      </GlassCard>
                    )
                  })}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Emergency fund */}
                <GlassCardAccent>
                  <div className="flex items-center gap-2.5 mb-4">
                    <Shield size={18} className="text-ss-teal-light" />
                    <h3 className="font-display font-medium text-[15px] text-white/90">Emergency Fund</h3>
                  </div>
                  <p className="text-[13px] text-white/60 mb-4">
                    Recommended: <span className="text-white/80 font-medium">3–6 months</span> of expenses.
                    You need ₹1,35,000 (3 months).
                  </p>
                  <ProgressBar value={32400} max={135000} color="teal" />
                  <div className="flex justify-between mt-2 text-[12px]">
                    <span className="text-white/60">₹32,400 saved</span>
                    <span className="text-ss-teal-light">24% done</span>
                  </div>
                  <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/[0.08]">
                    <p className="text-[12px] text-white/60">
                      At ₹5,500/month, you'll complete this in ~19 months.
                    </p>
                  </div>
                </GlassCardAccent>

                {/* SIP Calculator */}
                <GlassCardViolet>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() => setShowSIP(!showSIP)}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calculator size={18} className="text-ss-violet-light" />
                      <h3 className="font-display font-medium text-[15px] text-white/90">SIP Calculator</h3>
                    </div>
                    {showSIP ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
                  </button>

                  {showSIP && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-3"
                    >
                      <div className="space-y-1">
                        <label className="text-[12px] text-white/55">Monthly SIP (₹)</label>
                        <input
                          type="range" min={500} max={50000} step={500}
                          value={sipAmount}
                          onChange={(e) => setSipAmount(Number(e.target.value))}
                          className="w-full accent-ss-violet"
                        />
                        <div className="flex justify-between text-[12px] text-white/50">
                          <span>₹500</span>
                          <span className="text-ss-violet-light font-medium">₹{sipAmount.toLocaleString()}</span>
                          <span>₹50k</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[12px] text-white/55">Duration: {sipYears} years</label>
                        <input
                          type="range" min={1} max={30} step={1}
                          value={sipYears}
                          onChange={(e) => setSipYears(Number(e.target.value))}
                          className="w-full accent-ss-violet"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[12px] text-white/55">Expected Return: {sipReturn}% p.a.</label>
                        <input
                          type="range" min={6} max={20} step={0.5}
                          value={sipReturn}
                          onChange={(e) => setSipReturn(Number(e.target.value))}
                          className="w-full accent-ss-violet"
                        />
                      </div>
                      <div className="mt-3 p-3 rounded-xl bg-white/5 border border-ss-violet/20 space-y-2">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/55">Total Invested</span>
                          <span className="text-white/80 font-number">₹{sipInvested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/55">Maturity Value</span>
                          <span className="text-ss-violet-light font-number font-medium">
                            ₹{Math.round(sipMaturity).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/55">Wealth Gain</span>
                          <span className="text-ss-mint font-number">
                            ₹{Math.round(sipMaturity - sipInvested).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </GlassCardViolet>

                {/* Tips */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Savings Tips</h3>
                  <ul className="space-y-2.5">
                    {[
                      'Automate transfers on salary day',
                      'Keep 3-6 months in liquid savings',
                      'Separate goals into dedicated accounts',
                      'Review and adjust goals quarterly',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/65">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-ss-teal/20 text-ss-teal-light flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>

      <Modal isOpen={showGoalModal} onClose={() => setShowGoalModal(false)} title="Add Savings Goal">
        <div className="space-y-4">
          <Input label="Goal Name" placeholder="e.g. New Laptop" />
          <Input label="Target Amount (₹)" type="number" placeholder="50000" />
          <Input label="Target Date" type="date" />
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowGoalModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => setShowGoalModal(false)}>Create Goal</Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  )
}
