import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Briefcase, MapPin, Bell, Target, Wallet,
  ChevronRight, Edit2, CheckCircle, Shield, Moon, Smartphone
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import GlassCardViolet from '@/components/ui/GlassCardViolet'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Toggle from '@/components/ui/Toggle'
import Modal from '@/components/ui/Modal'
import useUserStore from '@/store/userStore'
import useAuthStore from '@/store/authStore'

const goalOptions = [
  { id: 'emergency_fund', label: 'Emergency Fund', icon: Shield, color: '#1D9E75' },
  { id: 'investments', label: 'Investments', icon: Target, color: '#6C63FF' },
  { id: 'house', label: 'Buy a House', icon: MapPin, color: '#EF9F27' },
  { id: 'car', label: 'Buy a Car', icon: Briefcase, color: '#028090' },
  { id: 'education', label: 'Higher Education', icon: CheckCircle, color: '#E24B4A' },
  { id: 'travel', label: 'Travel', icon: Target, color: '#02C39A' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Profile() {
  const { profile, financialHealth, updateProfile } = useUserStore()
  const { user } = useAuthStore()

  const [editModal, setEditModal] = useState(null) // 'personal' | 'salary' | null
  const [form, setForm] = useState({
    name: profile.name,
    age: profile.age,
    city: profile.city,
    employer: profile.employer,
    salary: profile.salary,
    payDate: profile.payDate,
  })

  const [selectedGoals, setSelectedGoals] = useState(profile.goals)
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    salaryReminder: true,
    aiInsights: true,
    weeklyReport: false,
    goalMilestones: true,
  })

  function toggleGoal(id) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  function savePersonal() {
    updateProfile({ name: form.name, age: form.age, city: form.city, employer: form.employer })
    setEditModal(null)
  }

  function saveSalary() {
    updateProfile({ salary: form.salary, payDate: form.payDate })
    setEditModal(null)
  }

  const initials = profile.name.split(' ').map((n) => n[0]).join('').toUpperCase()

  return (
    <AppShell>
      <TopNav title="Profile" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Profile card */}
            <motion.div variants={item}>
              <GlassCardAccent>
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ss-teal to-ss-violet flex items-center justify-center">
                      <span className="font-display font-bold text-[28px] text-white">{initials}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-ss-mint flex items-center justify-center">
                      <CheckCircle size={13} className="text-[#0a0e1a]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display font-semibold text-[22px] text-white/95">{profile.name}</h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[13px] text-white/55">
                        <Briefcase size={13} /> {profile.employer}
                      </span>
                      <span className="flex items-center gap-1.5 text-[13px] text-white/55">
                        <MapPin size={13} /> {profile.city}
                      </span>
                      <span className="flex items-center gap-1.5 text-[13px] text-white/55">
                        <User size={13} /> Age {profile.age}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    icon={<Edit2 size={14} />}
                    onClick={() => setEditModal('personal')}
                  >
                    Edit
                  </Button>
                </div>

                {/* Financial health scores */}
                <div className="mt-5 grid grid-cols-5 gap-3">
                  {[
                    { label: 'Overall', value: financialHealth.score, max: 100, color: 'teal' },
                    { label: 'Budget', value: financialHealth.budgetScore, max: 100, color: 'teal' },
                    { label: 'Savings', value: financialHealth.savingsScore, max: 100, color: 'teal' },
                    { label: 'Invest', value: financialHealth.investmentScore, max: 100, color: 'violet' },
                    { label: 'Credit', value: Math.round(financialHealth.creditScore / 9), max: 100, color: 'teal' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <span className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</span>
                      <p className={`font-number font-bold text-[20px] mt-0.5 ${s.color === 'teal' ? 'text-ss-teal-light' : 'text-ss-violet-light'}`}>
                        {s.value}
                      </p>
                      <div className="mt-1">
                        <ProgressBar value={s.value} max={s.max} color={s.color} showLabel={false} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardAccent>
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-5">

                {/* Salary settings */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-medium text-[15px] text-white/90 flex items-center gap-2">
                      <Wallet size={15} className="text-ss-teal-light" /> Salary Details
                    </h3>
                    <Button variant="ghost" icon={<Edit2 size={13} />} onClick={() => setEditModal('salary')}>
                      Edit
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Monthly Salary', value: `₹${profile.salary.toLocaleString()}` },
                      { label: 'Annual Salary', value: `₹${(profile.salary * 12).toLocaleString()}` },
                      { label: 'Pay Date', value: `${profile.payDate}${profile.payDate === 1 ? 'st' : profile.payDate === 2 ? 'nd' : 'th'} of month` },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
                        <p className="text-[16px] font-number font-medium text-white/85">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-[13px] text-white/55 mb-2">Fixed Monthly Expenses</h4>
                    {Object.entries(profile.fixedExpenses).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between">
                        <span className="text-[13px] text-white/70 capitalize">{k}</span>
                        <span className="text-[13px] font-number text-white/60">₹{v.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
                      <span className="text-[13px] font-medium text-white/80">Total Fixed</span>
                      <span className="text-[13px] font-number font-medium text-ss-teal-light">
                        ₹{Object.values(profile.fixedExpenses).reduce((a, b) => a + b, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* Financial goals */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-4 flex items-center gap-2">
                    <Target size={15} className="text-ss-violet-light" /> Financial Goals
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {goalOptions.map((goal) => {
                      const GoalIcon = goal.icon
                      const isSelected = selectedGoals.includes(goal.id)
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${
                            isSelected
                              ? 'border-ss-teal/35 bg-ss-teal/8'
                              : 'border-white/[0.07] bg-white/[0.02] opacity-60 hover:opacity-80'
                          }`}
                          style={isSelected ? { background: `${goal.color}12`, borderColor: `${goal.color}40` } : {}}
                        >
                          <GoalIcon size={15} style={{ color: isSelected ? goal.color : 'rgba(255,255,255,0.4)' }} />
                          <span className={`text-[12px] font-medium ${isSelected ? 'text-white/85' : 'text-white/45'}`}>
                            {goal.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => updateProfile({ goals: selectedGoals })} variant="ghost">
                      Save Goals
                    </Button>
                  </div>
                </GlassCard>
              </div>

              {/* Right column */}
              <div className="space-y-4">

                {/* Notifications */}
                <GlassCardViolet>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-4 flex items-center gap-2">
                    <Bell size={14} className="text-ss-violet-light" /> Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'budgetAlerts', label: 'Budget Alerts', desc: 'When you near category limits' },
                      { key: 'salaryReminder', label: 'Salary Reminder', desc: 'On your pay date' },
                      { key: 'aiInsights', label: 'AI Insights', desc: 'Daily smart recommendations' },
                      { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary every Sunday' },
                      { key: 'goalMilestones', label: 'Goal Milestones', desc: 'When you hit 25%, 50%, 75%' },
                    ].map((n) => (
                      <div key={n.key} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[13px] text-white/80">{n.label}</p>
                          <p className="text-[11px] text-white/40">{n.desc}</p>
                        </div>
                        <Toggle
                          checked={notifications[n.key]}
                          onChange={(val) => setNotifications((prev) => ({ ...prev, [n.key]: val }))}
                        />
                      </div>
                    ))}
                  </div>
                </GlassCardViolet>

                {/* App settings */}
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">App Settings</h3>
                  <div className="space-y-1">
                    {[
                      { icon: Moon, label: 'Dark Mode', sub: 'Always on', hasArrow: false },
                      { icon: Shield, label: 'Privacy & Security', sub: 'Biometric lock', hasArrow: true },
                      { icon: Smartphone, label: 'App Version', sub: 'v1.0.0', hasArrow: false },
                    ].map((s) => {
                      const Icon = s.icon
                      return (
                        <div key={s.label} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                          <div className="p-1.5 rounded-lg bg-white/[0.06]">
                            <Icon size={14} className="text-white/60" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] text-white/80">{s.label}</p>
                            <p className="text-[11px] text-white/40">{s.sub}</p>
                          </div>
                          {s.hasArrow && <ChevronRight size={14} className="text-white/25" />}
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>

                {/* Account */}
                <GlassCardAccent>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Account</h3>
                  <div className="space-y-1.5">
                    <p className="text-[12px] text-white/50">Email</p>
                    <p className="text-[13px] text-white/80">{user?.email || 'alex@techcorp.in'}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.08]">
                    <Badge variant="success">Free Plan</Badge>
                    <p className="text-[12px] text-white/45 mt-2">Member since March 2026</p>
                  </div>
                </GlassCardAccent>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>

      {/* Edit Personal Modal */}
      <Modal isOpen={editModal === 'personal'} onClose={() => setEditModal(null)} title="Edit Personal Info">
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          />
          <Input
            label="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <Input
            label="Employer"
            value={form.employer}
            onChange={(e) => setForm({ ...form, employer: e.target.value })}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setEditModal(null)}>Cancel</Button>
            <Button className="flex-1" onClick={savePersonal}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Salary Modal */}
      <Modal isOpen={editModal === 'salary'} onClose={() => setEditModal(null)} title="Edit Salary Details">
        <div className="space-y-4">
          <Input
            label="Monthly Salary (₹)"
            type="number"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
          />
          <Input
            label="Salary Pay Date (day of month)"
            type="number"
            value={form.payDate}
            onChange={(e) => setForm({ ...form, payDate: Number(e.target.value) })}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setEditModal(null)}>Cancel</Button>
            <Button className="flex-1" onClick={saveSalary}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  )
}
