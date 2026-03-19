import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Plus, AlertTriangle, TrendingDown } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import ProgressBar from '../../components/ui/ProgressBar';
import { formatCurrency } from '../../utils/formatCurrency';

const categories = [
  { name: 'Rent & PG', icon: '🏠', budget: 18000, spent: 18000, color: '#1D9E75', variant: 'teal' },
  { name: 'Food & Dining', icon: '🍔', budget: 8000, spent: 9200, color: '#E24B4A', variant: 'danger' },
  { name: 'Transport', icon: '🚗', budget: 4000, spent: 2800, color: '#5DCAA5', variant: 'teal' },
  { name: 'Entertainment', icon: '🎮', budget: 3000, spent: 1800, color: '#9F96FF', variant: 'violet' },
  { name: 'Health', icon: '💊', budget: 2000, spent: 600, color: '#02C39A', variant: 'mint' },
  { name: 'Shopping', icon: '🛍️', budget: 4500, spent: 5100, color: '#EF9F27', variant: 'amber' },
];

const monthlyData = [
  { month: 'Oct', income: 65000, expense: 42000 },
  { month: 'Nov', expense: 44000, income: 65000 },
  { month: 'Dec', expense: 48000, income: 65000 },
  { month: 'Jan', expense: 40000, income: 65000 },
  { month: 'Feb', expense: 41000, income: 65000 },
  { month: 'Mar', expense: 43000, income: 65000 },
];

const Budget = () => {
  const [showModal, setShowModal] = useState(false);
  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
  const overBudget = categories.filter(c => c.spent > c.budget);

  return (
    <div>
      <TopNav title="Budget Tracker" subtitle="March 2026 — Track every rupee" />
      <div className="p-6 space-y-6">
        {/* Overview */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Budget', value: totalBudget, color: '#5DCAA5' },
            { label: 'Total Spent', value: totalSpent, color: totalSpent > totalBudget ? '#E24B4A' : '#02C39A' },
            { label: 'Remaining', value: totalBudget - totalSpent, color: totalBudget - totalSpent < 0 ? '#E24B4A' : '#5DCAA5' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{item.label}</p>
              <p className="text-[28px] font-semibold" style={{ color: item.color, fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(Math.abs(item.value), true)}
              </p>
              {item.value < 0 && <p className="text-[11px] text-[#E24B4A] mt-1">Over budget!</p>}
            </motion.div>
          ))}
        </div>

        {/* Overspend alert */}
        {overBudget.length > 0 && (
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.3)' }}>
            <AlertTriangle size={16} className="text-[#E24B4A] mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-[#E24B4A] mb-1">Overspend Alert</p>
              <p className="text-[12px] text-white/60">
                You've exceeded budget in: {overBudget.map(c => c.name).join(', ')}. Consider adjusting your spending.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Category cards */}
          <div className="lg:col-span-2 glass-card p-5">
            <SectionHeader title="Category Breakdown" subtitle="Budget vs Actual spend"
              action={
                <button onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white"
                  style={{ background: 'rgba(29,158,117,0.85)', border: '0.5px solid rgba(93,202,165,0.5)' }}>
                  <Plus size={12} /> Add Expense
                </button>
              }
            />
            <div className="space-y-5">
              {categories.map((cat, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-[13px] font-medium text-white/85">{cat.name}</span>
                      {cat.spent > cat.budget && (
                        <span className="badge-danger text-[9px] py-0.5 px-1.5">Over</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[12px] font-medium" style={{ color: cat.spent > cat.budget ? '#E24B4A' : '#5DCAA5', fontFamily: 'Outfit, sans-serif' }}>
                        {formatCurrency(cat.spent, true)}
                      </span>
                      <span className="text-[11px] text-white/35"> / {formatCurrency(cat.budget, true)}</span>
                    </div>
                  </div>
                  <ProgressBar value={Math.min((cat.spent / cat.budget) * 100, 100)} variant={cat.spent > cat.budget ? 'danger' : cat.variant} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="glass-card p-5">
            <SectionHeader title="Income vs Expense" subtitle="6-month comparison" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                <Tooltip formatter={v => formatCurrency(v)} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
                <Bar dataKey="income" fill="#1D9E75" radius={[3, 3, 0, 0]} />
                <Bar dataKey="expense" fill="#6C63FF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#1D9E75' }} />
                <span className="text-[11px] text-white/45">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#6C63FF' }} />
                <span className="text-[11px] text-white/45">Expense</span>
              </div>
            </div>

            {/* 50/30/20 Rule */}
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(29,158,117,0.1)', border: '0.5px solid rgba(29,158,117,0.25)' }}>
              <p className="text-[11px] text-white/50 mb-3 font-medium">50/30/20 Rule</p>
              {[
                { label: 'Needs 50%', target: 32500, color: 'teal', variant: 'teal' },
                { label: 'Wants 30%', target: 19500, color: '#9F96FF', variant: 'violet' },
                { label: 'Savings 20%', target: 13000, color: '#02C39A', variant: 'mint' },
              ].map((r, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-white/45">{r.label}</span>
                    <span className="text-[10px] text-white/55">{formatCurrency(r.target, true)}</span>
                  </div>
                  <ProgressBar value={60 + i * 12} variant={r.variant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-[18px] font-semibold text-white/95 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Add Expense</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Description</label>
                <input className="glass-input" placeholder="Swiggy Order" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Amount (₹)</label>
                  <input className="glass-input" placeholder="350" type="number" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-1.5">Category</label>
                  <select className="glass-input" style={{ appearance: 'none' }}>
                    {categories.map(c => <option key={c.name} style={{ background: '#0a0e1a' }}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-[13px] text-white/60 border border-white/[0.14]"
                style={{ background: 'rgba(255,255,255,0.05)' }}>Cancel</button>
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-[13px] text-white font-medium"
                style={{ background: 'rgba(29,158,117,0.9)', border: '0.5px solid rgba(93,202,165,0.5)' }}>
                Add Expense
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Budget;
