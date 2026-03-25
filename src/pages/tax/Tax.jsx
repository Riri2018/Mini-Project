import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, FileText, Lightbulb, CheckCircle } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import TaxBreakdownPie from '@/components/charts/TaxBreakdownPie'
import useUserStore from '@/store/userStore'

// Tax slab calc (Old Regime, FY 2025-26)
function calcOldRegimeTax(income) {
  const taxable = Math.max(0, income - 250000)
  let tax = 0
  if (taxable > 750000) tax += (taxable - 750000) * 0.3
  if (taxable > 500000) tax += Math.min(taxable - 500000, 250000) * 0.2
  if (taxable > 0) tax += Math.min(taxable, 500000) * 0.05
  return Math.round(tax)
}

// New Regime (FY 2025-26): rebate u/s 87A up to 7L
function calcNewRegimeTax(income) {
  const taxable = Math.max(0, income - 300000)
  let tax = 0
  if (taxable > 900000) tax += (taxable - 900000) * 0.3
  if (taxable > 600000) tax += Math.min(taxable - 600000, 300000) * 0.2
  if (taxable > 300000) tax += Math.min(taxable - 300000, 300000) * 0.15
  if (taxable > 0) tax += Math.min(taxable, 300000) * 0.05
  if (income <= 700000) tax = 0 // 87A rebate
  return Math.round(tax)
}

const deductions = [
  { id: 1, name: 'Section 80C', desc: 'PF, ELSS, PPF, LIC', limit: 150000, used: 48000 },
  { id: 2, name: 'Section 80D', desc: 'Health Insurance Premium', limit: 25000, used: 0 },
  { id: 3, name: 'HRA Exemption', desc: 'House Rent Allowance', limit: 144000, used: 144000 },
  { id: 4, name: 'Standard Deduction', desc: 'Flat deduction for salaried', limit: 50000, used: 50000 },
]

const taxTips = [
  'Invest ₹1,02,000 more in 80C (ELSS/PPF) to max out the ₹1.5L limit.',
  'Buy health insurance to claim ₹25,000 under 80D.',
  'New regime saves ₹7,700 for your income level this FY.',
  'File ITR-1 (Sahaj) — you qualify as a salaried employee.',
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Tax() {
  const { profile } = useUserStore()
  const annual = profile.salary * 12

  const [customSalary, setCustomSalary] = useState(annual)
  const [extra80c, setExtra80c] = useState(0)

  const deductibleIncome = customSalary - 50000 - Math.min(150000, 48000 + extra80c) - 144000
  const oldTax = calcOldRegimeTax(deductibleIncome)
  const newTax = calcNewRegimeTax(customSalary)
  const betterRegime = newTax <= oldTax ? 'New' : 'Old'
  const savings = Math.abs(oldTax - newTax)

  const pieData = [
    { name: 'Standard Deduction', value: 50000, color: '#1D9E75' },
    { name: '80C Used', value: 48000, color: '#6C63FF' },
    { name: 'HRA Exempt', value: 144000, color: '#EF9F27' },
    { name: 'Taxable Income', value: Math.max(0, deductibleIncome), color: '#E24B4A' },
  ].filter((d) => d.value > 0)

  return (
    <AppShell>
      <TopNav title="Tax Planning" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Summary */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Annual Salary', value: `₹${customSalary.toLocaleString()}`, sub: 'FY 2025–26', color: 'text-white/90' },
                { label: 'Old Regime Tax', value: `₹${oldTax.toLocaleString()}`, sub: 'After deductions', color: 'text-ss-danger' },
                { label: 'New Regime Tax', value: `₹${newTax.toLocaleString()}`, sub: betterRegime === 'New' ? 'Better for you ✓' : 'Higher tax', color: betterRegime === 'New' ? 'text-ss-mint' : 'text-white/60' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            {/* Regime recommendation */}
            <motion.div variants={item}>
              <GlassCardAccent>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-ss-teal-light flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-white/90">
                      Recommended: <span className="text-ss-teal-light">{betterRegime} Tax Regime</span>
                    </p>
                    <p className="text-[13px] text-white/60 mt-0.5">
                      You save <span className="text-ss-mint font-medium">₹{savings.toLocaleString()}</span> by choosing the {betterRegime} regime.
                    </p>
                  </div>
                </div>
              </GlassCardAccent>
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left — calculator + deductions */}
              <div className="lg:col-span-2 space-y-5">

                {/* Interactive calculator */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-5">
                    <Calculator size={16} className="text-ss-teal-light" />
                    <h3 className="font-display font-medium text-[15px] text-white/90">Tax Calculator</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[12px] text-white/55">Annual Salary (₹)</label>
                      <input
                        type="range" min={200000} max={2000000} step={10000}
                        value={customSalary}
                        onChange={(e) => setCustomSalary(Number(e.target.value))}
                        className="w-full accent-ss-teal"
                      />
                      <div className="flex justify-between text-[12px] text-white/50">
                        <span>₹2L</span>
                        <span className="text-ss-teal-light font-medium">₹{customSalary.toLocaleString()}</span>
                        <span>₹20L</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] text-white/55">Additional 80C Investment (₹) — already used ₹48,000</label>
                      <input
                        type="range" min={0} max={102000} step={1000}
                        value={extra80c}
                        onChange={(e) => setExtra80c(Number(e.target.value))}
                        className="w-full accent-ss-violet"
                      />
                      <div className="flex justify-between text-[12px] text-white/50">
                        <span>₹0</span>
                        <span className="text-ss-violet-light font-medium">₹{extra80c.toLocaleString()}</span>
                        <span>₹1.02L</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {[
                        { label: 'Old Regime', value: `₹${oldTax.toLocaleString()}`, highlight: betterRegime === 'Old' },
                        { label: 'New Regime', value: `₹${newTax.toLocaleString()}`, highlight: betterRegime === 'New' },
                      ].map((r) => (
                        <div
                          key={r.label}
                          className={`p-3 rounded-xl text-center border ${r.highlight ? 'border-ss-teal/40 bg-ss-teal/10' : 'border-white/[0.07] bg-white/[0.03]'}`}
                        >
                          <p className="text-[12px] text-white/50 mb-1">{r.label}</p>
                          <p className={`font-number font-semibold text-[20px] ${r.highlight ? 'text-ss-teal-light' : 'text-white/60'}`}>{r.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* Deductions */}
                <div>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3">Deduction Tracker</h3>
                  <div className="space-y-3">
                    {deductions.map((d) => {
                      const pct = Math.round(d.used / d.limit * 100)
                      return (
                        <GlassCard key={d.id} className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[14px] font-medium text-white/90">{d.name}</p>
                              <p className="text-[12px] text-white/45">{d.desc}</p>
                            </div>
                            <Badge variant={pct === 100 ? 'success' : pct > 0 ? 'warning' : 'danger'}>
                              {pct}%
                            </Badge>
                          </div>
                          <ProgressBar value={d.used} max={d.limit} color={pct === 100 ? 'teal' : 'violet'} showLabel={false} />
                          <div className="flex justify-between text-[12px]">
                            <span className="text-white/50">₹{d.used.toLocaleString()} used</span>
                            <span className="text-white/35">Limit: ₹{d.limit.toLocaleString()}</span>
                          </div>
                        </GlassCard>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                {/* Pie */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Income Breakdown</h3>
                  <TaxBreakdownPie data={pieData} size={200} />
                  <div className="mt-3 space-y-1.5">
                    {pieData.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-[12px] text-white/60 flex-1">{d.name}</span>
                        <span className="text-[11px] font-number text-white/50">₹{d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* ITR Guide */}
                <GlassCardViolet>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={15} className="text-ss-violet-light" />
                    <h3 className="font-display font-medium text-[14px] text-white/90">ITR Form Guide</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.06] border border-ss-violet/20 mb-3">
                    <p className="text-[13px] font-medium text-ss-violet-light">You should file: ITR-1 (Sahaj)</p>
                    <p className="text-[12px] text-white/55 mt-1">For salaried individuals with income up to ₹50L from one employer.</p>
                  </div>
                  <p className="text-[12px] text-white/50">Due date: <span className="text-white/75">31 July 2026</span></p>
                </GlassCardViolet>

                {/* Tips */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3 flex items-center gap-2">
                    <Lightbulb size={14} className="text-ss-amber" /> AI Tax Tips
                  </h3>
                  <ul className="space-y-2.5">
                    {taxTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-white/65">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-ss-amber/20 text-ss-amber flex items-center justify-center text-[10px] font-bold flex-shrink-0">
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
    </AppShell>
  )
}
