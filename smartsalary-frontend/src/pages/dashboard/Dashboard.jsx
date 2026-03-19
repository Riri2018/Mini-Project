import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
  Wallet, TrendingUp, PiggyBank, Shield, Bot, ArrowRight,
  Zap, Star, Target, CreditCard, Receipt
} from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import StatTile from '../../components/shared/StatTile';
import AIInsightCard from '../../components/shared/AIInsightCard';
import SectionHeader from '../../components/shared/SectionHeader';
import ProgressBar from '../../components/ui/ProgressBar';
import useUserStore from '../../store/userStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

const savingsData = [
  { month: 'Sep', amount: 8000 }, { month: 'Oct', amount: 11000 },
  { month: 'Nov', amount: 9500 }, { month: 'Dec', amount: 14000 },
  { month: 'Jan', amount: 12000 }, { month: 'Feb', amount: 18000 },
  { month: 'Mar', amount: 22000 },
];

const expenseData = [
  { name: 'Housing', value: 18000, color: '#1D9E75' },
  { name: 'Food', value: 8000, color: '#6C63FF' },
  { name: 'Transport', value: 4000, color: '#EF9F27' },
  { name: 'Entertainment', value: 3000, color: '#02C39A' },
  { name: 'Others', value: 5000, color: '#5DCAA5' },
];

const recentActivity = [
  { name: 'Swiggy Order', category: 'Food', amount: -380, time: '2h ago', icon: '🍔' },
  { name: 'Salary Credited', category: 'Income', amount: 65000, time: '2 days ago', icon: '💰' },
  { name: 'HDFC EMI', category: 'EMI', amount: -3200, time: '3 days ago', icon: '🏦' },
  { name: 'Amazon Shopping', category: 'Shopping', amount: -1200, time: '4 days ago', icon: '🛍️' },
  { name: 'Metro Card Recharge', category: 'Transport', amount: -500, time: '5 days ago', icon: '🚇' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p className="text-white/50 text-[11px] mb-1">{label}</p>
        <p className="text-[#5DCAA5] font-semibold text-[13px]">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { profile } = useUserStore();
  const netIncome = profile.salary - 18000 - 3200 - 4000 - 8000;
  const savingsRate = Math.round((netIncome / profile.salary) * 100);

  const stats = [
    { label: 'Take-Home Salary', value: profile.salary, prefix: '₹', color: 'teal', icon: Wallet, change: 0 },
    { label: 'Monthly Savings', value: 22000, prefix: '₹', color: 'mint', icon: PiggyBank, change: 22 },
    { label: 'Portfolio Value', value: 48500, prefix: '₹', color: 'violet', icon: TrendingUp, change: 8.4 },
    { label: 'Health Score', value: 72, suffix: '/100', color: 'amber', icon: Star, change: 4 },
  ];

  const budgetCategories = [
    { name: 'Needs (50%)', budget: 32500, spent: 26000, color: 'teal' },
    { name: 'Wants (30%)', budget: 19500, spent: 14000, color: 'violet' },
    { name: 'Savings (20%)', budget: 13000, spent: 22000, color: 'mint' },
  ];

  return (
    <div>
      <TopNav
        title={`Good morning, ${profile.name.split(' ')[0]} 👋`}
        subtitle="Here's your financial overview for March 2026"
      />

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatTile key={i} {...s} delay={i * 0.06} />
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Savings chart — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5 lg:col-span-2"
          >
            <SectionHeader
              title="Savings Trend"
              subtitle="Monthly savings growth"
              action={
                <Link to="/savings" className="text-[11px] text-[#5DCAA5] flex items-center gap-1 hover:opacity-80">
                  View all <ArrowRight size={11} />
                </Link>
              }
            />
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${v / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#1D9E75" strokeWidth={2}
                  fill="url(#savingsGrad)" dot={{ fill: '#5DCAA5', r: 3 }} activeDot={{ r: 5, fill: '#5DCAA5' }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense donut */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-5"
          >
            <SectionHeader title="Expense Split" subtitle="This month" />
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                  {expenseData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: 'rgba(14,18,32,0.92)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {expenseData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[11px] text-white/55">{item.name}</span>
                  </div>
                  <span className="text-[11px] text-white/70 font-medium">{formatCurrency(item.value, true)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second row */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Budget overview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-5"
          >
            <SectionHeader
              title="50/30/20 Budget"
              subtitle="Rule-based allocation"
              action={
                <Link to="/budget" className="text-[11px] text-[#5DCAA5] flex items-center gap-1 hover:opacity-80">
                  Details <ArrowRight size={11} />
                </Link>
              }
            />
            <div className="space-y-4">
              {budgetCategories.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] text-white/70">{cat.name}</span>
                    <span className="text-[11px] text-white/45">
                      {formatCurrency(cat.spent, true)} / {formatCurrency(cat.budget, true)}
                    </span>
                  </div>
                  <ProgressBar value={(cat.spent / cat.budget) * 100} variant={cat.color} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass-card p-5"
          >
            <SectionHeader
              title="AI Insights"
              subtitle="Personalized recommendations"
              action={
                <Link to="/ai-advisor" className="text-[11px] text-[#9F96FF] flex items-center gap-1 hover:opacity-80">
                  AI Chat <ArrowRight size={11} />
                </Link>
              }
            />
            <div className="space-y-3">
              <AIInsightCard
                title="Start a ₹5,000/month SIP in NIFTY 50"
                description="Your savings rate of 33% supports this investment. Projected 12% annual return."
                action="Start SIP"
                priority="medium"
                delay={0.5}
              />
              <AIInsightCard
                title="You can save ₹18K in taxes this year"
                description="Invest ₹1.5L in 80C instruments: ELSS, PPF, or EPF to maximize deductions."
                action="Explore"
                priority="high"
                delay={0.55}
              />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-5"
          >
            <SectionHeader title="Recent Activity" subtitle="Latest transactions" />
            <div className="space-y-2.5">
              {recentActivity.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-3 py-1.5"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
                    {tx.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white/85 truncate">{tx.name}</p>
                    <p className="text-[10px] text-white/35">{tx.category} · {tx.time}</p>
                  </div>
                  <span className={`text-[12px] font-semibold ${tx.amount > 0 ? 'text-[#02C39A]' : 'text-white/70'}`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount), true)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <SectionHeader title="Quick Access" subtitle="Navigate to key sections" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { to: '/budget', icon: Wallet, label: 'Budget', color: '#5DCAA5', bg: 'rgba(29,158,117,0.12)' },
              { to: '/savings', icon: PiggyBank, label: 'Savings', color: '#02C39A', bg: 'rgba(2,195,154,0.1)' },
              { to: '/investments', icon: TrendingUp, label: 'Invest', color: '#9F96FF', bg: 'rgba(108,99,255,0.12)' },
              { to: '/tax', icon: Receipt, label: 'Tax', color: '#EF9F27', bg: 'rgba(239,159,39,0.12)' },
              { to: '/credit', icon: CreditCard, label: 'Credit', color: '#5DCAA5', bg: 'rgba(29,158,117,0.1)' },
              { to: '/ai-advisor', icon: Bot, label: 'AI Chat', color: '#9F96FF', bg: 'rgba(108,99,255,0.15)' },
            ].map((item, i) => (
              <Link key={i} to={item.to}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="p-4 rounded-2xl text-center cursor-pointer transition-all"
                  style={{ background: item.bg, border: `0.5px solid ${item.color}33` }}
                >
                  <item.icon size={20} className="mx-auto mb-2" style={{ color: item.color }} />
                  <p className="text-[11px] font-medium text-white/70">{item.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
