import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart, Shield, Car, ChevronDown, ChevronUp,
  CheckCircle, AlertTriangle, HelpCircle, Calculator
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import useUserStore from '@/store/userStore'

const insuranceTypes = [
  {
    id: 'health',
    icon: Heart,
    title: 'Health Insurance',
    color: '#E24B4A',
    status: 'Not Covered',
    statusVariant: 'danger',
    why: 'Covers hospitalization, surgery, and critical illness expenses. Recommended for every earning individual.',
    recommended: '₹5–10 Lakhs sum insured',
    premium: '₹6,000–₹12,000/year',
    benefits: ['Cashless hospitalization', 'Pre/post hospitalization cover', 'No-claim bonus', 'Day care procedures'],
  },
  {
    id: 'term',
    icon: Shield,
    title: 'Term Life Insurance',
    color: '#1D9E75',
    status: 'Not Covered',
    statusVariant: 'danger',
    why: 'Pure life cover at low premiums. Provides financial security for your dependants.',
    recommended: '10–15x annual income',
    premium: '₹8,000–₹15,000/year for ₹1 Cr cover',
    benefits: ['Pure protection plan', 'Death benefit payout', 'Riders available (accidental, critical illness)', 'Tax benefit under 80C'],
  },
  {
    id: 'vehicle',
    icon: Car,
    title: 'Vehicle Insurance',
    color: '#EF9F27',
    status: 'N/A',
    statusVariant: 'info',
    why: 'Mandatory by law if you own a vehicle. Comprehensive cover protects against theft and damages.',
    recommended: 'Comprehensive (own damage + third party)',
    premium: '₹3,000–₹8,000/year for a bike',
    benefits: ['Third party liability (mandatory)', 'Own damage cover', 'Zero depreciation add-on', 'Roadside assistance'],
  },
]

const faqs = [
  {
    q: 'What is the difference between term and whole life insurance?',
    a: 'Term insurance covers you for a fixed period (e.g., till age 60) and pays out only on death. Whole life is more expensive and includes a savings component. For young earners, term insurance is always recommended.',
  },
  {
    q: 'Is health insurance through my employer enough?',
    a: 'Employer health cover usually ends when you leave the job and may not cover family members. Always have a personal health policy as a base.',
  },
  {
    q: 'What is a deductible in health insurance?',
    a: 'A deductible is the amount you pay out-of-pocket before the insurance kicks in. A higher deductible means lower premiums.',
  },
  {
    q: 'Can I claim tax benefit on insurance premiums?',
    a: 'Yes. Health insurance premiums qualify for deduction under Section 80D (up to ₹25,000). Term life premiums qualify under Section 80C (up to ₹1.5L).',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Insurance() {
  const { profile } = useUserStore()
  const [expanded, setExpanded] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [age, setAge] = useState(profile.age)
  const [coverAmount, setCoverAmount] = useState(500000)

  const annual = profile.salary * 12
  const recommendedTerm = annual * 12
  const estimatedHealthPremium = Math.round(coverAmount * 0.012)
  const estimatedTermPremium = Math.round(recommendedTerm * 0.00085)

  return (
    <AppShell>
      <TopNav title="Insurance" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Nudge banner */}
            <motion.div variants={item}>
              <GlassCardAccent>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-ss-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-white/90 mb-1">You have no active insurance</p>
                    <p className="text-[13px] text-white/60">
                      A single hospitalization can wipe out months of savings. Starting a health insurance policy today
                      at age {profile.age} costs as low as <span className="text-ss-teal-light font-medium">₹500/month</span>.
                    </p>
                  </div>
                </div>
              </GlassCardAccent>
            </motion.div>

            {/* Summary tiles */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Policies Active', value: '0', sub: 'Not adequately covered', color: 'text-ss-danger' },
                { label: 'Recommended Cover', value: '₹15L+', sub: 'Health + Term combined', color: 'text-ss-amber' },
                { label: 'Est. Annual Premium', value: '₹14,000', sub: 'For basic coverage', color: 'text-white/90' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left: insurance type cards */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-display font-medium text-[15px] text-white/90">Insurance Types</h3>
                {insuranceTypes.map((ins) => {
                  const Icon = ins.icon
                  const isOpen = expanded === ins.id
                  return (
                    <GlassCard key={ins.id}>
                      <button
                        className="flex items-center justify-between w-full"
                        onClick={() => setExpanded(isOpen ? null : ins.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl" style={{ background: `${ins.color}22` }}>
                            <Icon size={18} style={{ color: ins.color }} />
                          </div>
                          <div className="text-left">
                            <p className="text-[14px] font-medium text-white/90">{ins.title}</p>
                            <p className="text-[12px] text-white/45">{ins.recommended}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={ins.statusVariant}>{ins.status}</Badge>
                          {isOpen ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
                        </div>
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-3"
                        >
                          <p className="text-[13px] text-white/65">{ins.why}</p>
                          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] space-y-2">
                            <div className="flex justify-between text-[12px]">
                              <span className="text-white/50">Recommended Cover</span>
                              <span className="text-white/80">{ins.recommended}</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-white/50">Typical Premium</span>
                              <span style={{ color: ins.color }}>{ins.premium}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-[12px] text-white/50 mb-2">Key Benefits</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {ins.benefits.map((b, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <CheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: ins.color }} />
                                  <span className="text-[12px] text-white/65">{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </GlassCard>
                  )
                })}

                {/* FAQ section */}
                <div>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3 flex items-center gap-2">
                    <HelpCircle size={15} className="text-ss-violet-light" /> Common Questions
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <GlassCard key={i} className="p-0 overflow-hidden">
                        <button
                          className="flex items-start justify-between gap-3 p-4 w-full text-left"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <p className="text-[13px] text-white/80">{faq.q}</p>
                          {openFaq === i
                            ? <ChevronUp size={15} className="text-white/40 flex-shrink-0 mt-0.5" />
                            : <ChevronDown size={15} className="text-white/40 flex-shrink-0 mt-0.5" />
                          }
                        </button>
                        {openFaq === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-4 pb-4"
                          >
                            <p className="text-[13px] text-white/55">{faq.a}</p>
                          </motion.div>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: premium estimator + coverage check */}
              <div className="space-y-4">
                <GlassCardViolet>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator size={16} className="text-ss-violet-light" />
                    <h3 className="font-display font-medium text-[15px] text-white/90">Premium Estimator</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[12px] text-white/55">Your Age: {age} years</label>
                      <input
                        type="range" min={18} max={50} step={1}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full accent-ss-violet"
                      />
                      <div className="flex justify-between text-[11px] text-white/35">
                        <span>18</span><span>50</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] text-white/55">Health Cover: ₹{(coverAmount / 100000).toFixed(1)}L</label>
                      <input
                        type="range" min={300000} max={2000000} step={100000}
                        value={coverAmount}
                        onChange={(e) => setCoverAmount(Number(e.target.value))}
                        className="w-full accent-ss-violet"
                      />
                      <div className="flex justify-between text-[11px] text-white/35">
                        <span>₹3L</span><span>₹20L</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.05] border border-ss-violet/20 space-y-2 mt-2">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-white/55">Health Insurance</span>
                        <span className="text-ss-violet-light font-number">~₹{estimatedHealthPremium.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-white/55">Term Life (₹{(recommendedTerm / 100000).toFixed(0)}L)</span>
                        <span className="text-ss-violet-light font-number">~₹{estimatedTermPremium.toLocaleString()}/yr</span>
                      </div>
                      <div className="border-t border-white/[0.08] pt-2 flex justify-between text-[12px]">
                        <span className="text-white/70 font-medium">Total Est. Premium</span>
                        <span className="text-ss-mint font-number font-medium">
                          ~₹{(estimatedHealthPremium + estimatedTermPremium).toLocaleString()}/yr
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/35">*Estimates only. Actual premiums vary by insurer, health, and add-ons.</p>
                  </div>
                </GlassCardViolet>

                {/* Coverage checklist */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Coverage Adequacy</h3>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Health Insurance', covered: false },
                      { label: 'Term Life Insurance', covered: false },
                      { label: 'Emergency Fund (3 months)', covered: false },
                      { label: 'Accidental Disability Cover', covered: false },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center justify-between">
                        <span className="text-[13px] text-white/70">{c.label}</span>
                        {c.covered
                          ? <CheckCircle size={15} className="text-ss-teal-light" />
                          : <AlertTriangle size={15} className="text-ss-danger" />
                        }
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.07]">
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-white/55">Coverage Score</span>
                      <span className="text-ss-danger font-medium">0/4</span>
                    </div>
                    <ProgressBar value={0} max={4} color="danger" showLabel={false} />
                  </div>
                </GlassCard>

                {/* Priority action */}
                <GlassCardAccent>
                  <p className="text-[12px] text-white/50 mb-2">Your priority action</p>
                  <p className="text-[14px] font-medium text-white/90 mb-2">Get Health Insurance First</p>
                  <p className="text-[13px] text-white/60">
                    At age {profile.age}, a ₹5L health policy costs ~₹{Math.round(500000 * 0.012 * (1 + (profile.age - 23) * 0.04)).toLocaleString()}/year.
                    That's less than ₹{Math.round(500000 * 0.012 * (1 + (profile.age - 23) * 0.04) / 12).toLocaleString()}/month for complete peace of mind.
                  </p>
                </GlassCardAccent>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
