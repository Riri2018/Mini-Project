import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, ChevronLeft, ChevronRight, AlertTriangle,
  Utensils, Home, Car, Tv, Zap, ShoppingBag, MoreHorizontal
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import TopNav from '@/components/layout/TopNav'
import PageTransition from '@/components/layout/PageTransition'
import GlassCard from '@/components/ui/GlassCard'
import GlassCardAccent from '@/components/ui/GlassCardAccent'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import SpendingDonut from '@/components/charts/SpendingDonut'
import ExpenseBarChart from '@/components/charts/ExpenseBarChart'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const categoryIcons = {
  Housing: Home,
  Food: Utensils,
  Transport: Car,
  Entertainment: Tv,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Other: MoreHorizontal,
}

const categoryColors = {
  Housing: '#1D9E75',
  Food: '#6C63FF',
  Transport: '#EF9F27',
  Entertainment: '#E24B4A',
  Utilities: '#028090',
  Shopping: '#02C39A',
  Other: '#9F96FF',
}

const initialCategories = [
  { id: 1, name: 'Housing', budget: 13500, spent: 12000 },
  { id: 2, name: 'Food', budget: 6000, spent: 6800 },
  { id: 3, name: 'Transport', budget: 2500, spent: 2000 },
  { id: 4, name: 'Entertainment', budget: 2500, spent: 3200 },
  { id: 5, name: 'Utilities', budget: 2000, spent: 1500 },
  { id: 6, name: 'Shopping', budget: 3000, spent: 2800 },
]

const initialExpenses = [
  { id: 1, label: 'Rent', category: 'Housing', amount: 12000, date: 'Mar 1' },
  { id: 2, label: 'Zomato', category: 'Food', amount: 350, date: 'Mar 10' },
  { id: 3, label: 'Swiggy', category: 'Food', amount: 280, date: 'Mar 12' },
  { id: 4, label: 'Netflix', category: 'Entertainment', amount: 649, date: 'Mar 3' },
  { id: 5, label: 'Amazon Prime', category: 'Entertainment', amount: 299, date: 'Mar 5' },
  { id: 6, label: 'Uber', category: 'Transport', amount: 340, date: 'Mar 8' },
  { id: 7, label: 'BEST Bus Pass', category: 'Transport', amount: 540, date: 'Mar 4' },
  { id: 8, label: 'Electricity Bill', category: 'Utilities', amount: 800, date: 'Mar 7' },
  { id: 9, label: 'Amazon Order', category: 'Shopping', amount: 1299, date: 'Mar 11' },
]

const forecastData = [
  { month: 'Oct', actual: 22000, forecast: 23500 },
  { month: 'Nov', actual: 24500, forecast: 23000 },
  { month: 'Dec', actual: 28000, forecast: 25000 },
  { month: 'Jan', actual: 22500, forecast: 23000 },
  { month: 'Feb', actual: 25000, forecast: 24000 },
  { month: 'Mar', actual: null, forecast: 26500 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Budget() {
  const [monthIndex, setMonthIndex] = useState(2) // March
  const [categories, setCategories] = useState(initialCategories)
  const [expenses] = useState(initialExpenses)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newExpense, setNewExpense] = useState({ label: '', amount: '', category: 'Food' })

  const totalBudget = categories.reduce((s, c) => s + c.budget, 0)
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0)
  const remaining = totalBudget - totalSpent
  const overBudget = categories.filter((c) => c.spent > c.budget)

  const donutData = categories.map((c) => ({
    name: c.name,
    value: c.spent,
    color: categoryColors[c.name] || '#9F96FF',
  }))

  return (
    <AppShell>
      <TopNav title="Budget Tracker" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Header: month selector + add */}
            <motion.div variants={item} className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <h2 className="font-display font-semibold text-[20px] text-white/95 min-w-[120px] text-center">
                  {months[monthIndex]} 2026
                </h2>
                <button
                  onClick={() => setMonthIndex((i) => Math.min(11, i + 1))}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <Button onClick={() => setShowAddModal(true)} icon={<Plus size={16} />}>
                Add Expense
              </Button>
            </motion.div>

            {/* Overspend alert */}
            {overBudget.length > 0 && (
              <motion.div variants={item}>
                <GlassCard className="border border-ss-danger/30 bg-ss-danger/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-ss-danger flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-white/90 mb-1">Over-budget alert</p>
                      <p className="text-[13px] text-white/60">
                        You've exceeded budget in{' '}
                        <span className="text-ss-danger font-medium">
                          {overBudget.map((c) => c.name).join(', ')}
                        </span>
                        . ML forecast suggests you may overspend by ₹{(overBudget.reduce((s,c) => s + c.spent - c.budget, 0)).toLocaleString()} this month.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Summary tiles */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Budget', value: `₹${totalBudget.toLocaleString()}`, sub: 'This month', color: 'text-white/90' },
                { label: 'Spent', value: `₹${totalSpent.toLocaleString()}`, sub: `${Math.round(totalSpent / totalBudget * 100)}% of budget`, color: totalSpent > totalBudget ? 'text-ss-danger' : 'text-ss-teal-light' },
                { label: 'Remaining', value: `₹${Math.abs(remaining).toLocaleString()}`, sub: remaining < 0 ? 'Over budget!' : 'Left to spend', color: remaining < 0 ? 'text-ss-danger' : 'text-ss-mint' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <p className="text-[12px] text-white/45 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-number font-medium text-[26px] leading-none mb-1 ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-white/40">{s.sub}</p>
                </GlassCard>
              ))}
            </motion.div>

            {/* Main content */}
            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-display font-medium text-[15px] text-white/90">Category Breakdown</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat.name] || MoreHorizontal
                    const pct = Math.round(cat.spent / cat.budget * 100)
                    const isOver = cat.spent > cat.budget
                    return (
                      <GlassCard key={cat.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="p-2 rounded-xl"
                              style={{ background: `${categoryColors[cat.name]}22` }}
                            >
                              <Icon size={16} style={{ color: categoryColors[cat.name] }} />
                            </div>
                            <span className="text-[14px] font-medium text-white/90">{cat.name}</span>
                          </div>
                          <Badge variant={isOver ? 'danger' : pct > 80 ? 'warning' : 'success'}>
                            {pct}%
                          </Badge>
                        </div>
                        <ProgressBar value={cat.spent} max={cat.budget} color={isOver ? 'danger' : 'teal'} />
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/50">₹{cat.spent.toLocaleString()} spent</span>
                          <span className="text-white/35">of ₹{cat.budget.toLocaleString()}</span>
                        </div>
                      </GlassCard>
                    )
                  })}
                </div>

                {/* Forecast chart */}
                <GlassCard className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-medium text-[15px] text-white/90">Spend Forecast</h3>
                    <Badge variant="info">ML Prediction</Badge>
                  </div>
                  <ExpenseBarChart data={forecastData} height={180} />
                </GlassCard>
              </div>

              {/* Donut + expense list */}
              <div className="space-y-4">
                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">Spend Distribution</h3>
                  <SpendingDonut data={donutData} size={200} />
                  <div className="mt-3 space-y-1.5">
                    {categories.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: categoryColors[c.name] }} />
                        <span className="text-[12px] text-white/60 flex-1">{c.name}</span>
                        <span className="text-[11px] font-number text-white/50">₹{c.spent.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-0 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <h3 className="font-display font-medium text-[14px] text-white/90">Recent Expenses</h3>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {expenses.map((e, i) => (
                      <div
                        key={e.id}
                        className={`flex items-center justify-between px-4 py-2.5 ${i < expenses.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                      >
                        <div>
                          <p className="text-[13px] text-white/85">{e.label}</p>
                          <p className="text-[11px] text-white/40">{e.category} · {e.date}</p>
                        </div>
                        <span className="text-[13px] font-number text-white/70">₹{e.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* 50/30/20 Rule */}
                <GlassCardAccent>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3">50/30/20 Rule</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Needs (50%)', target: 22500, actual: 17000, color: 'teal' },
                      { label: 'Wants (30%)', target: 13500, actual: 12000, color: 'violet' },
                      { label: 'Savings (20%)', target: 9000, actual: 5500, color: 'amber' },
                    ].map((r) => (
                      <div key={r.label} className="space-y-1">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-white/70">{r.label}</span>
                          <span className="text-white/50">₹{r.actual.toLocaleString()} / ₹{r.target.toLocaleString()}</span>
                        </div>
                        <ProgressBar value={r.actual} max={r.target} color={r.color} showLabel={false} />
                      </div>
                    ))}
                  </div>
                </GlassCardAccent>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Expense"
      >
        <div className="space-y-4">
          <Input
            label="Description"
            placeholder="e.g. Swiggy order"
            value={newExpense.label}
            onChange={(e) => setNewExpense({ ...newExpense, label: e.target.value })}
          />
          <Input
            label="Amount (₹)"
            type="number"
            placeholder="0"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
          <Select
            label="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            options={Object.keys(categoryColors).map((k) => ({ value: k, label: k }))}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => setShowAddModal(false)}>
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  )
}
