import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, User, Sparkles, TrendingUp, Zap, CheckCircle, Circle, RotateCcw, AlertCircle } from 'lucide-react'
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
import { sendToAI } from '@/services/aiService'

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi Alex! I\'m your SmartSalary AI Advisor. I\'ve analysed your financial data for March 2026. Here\'s what I found:',
    time: '9:00 AM',
  },
  {
    id: 2,
    role: 'assistant',
    text: 'Your financial health score is **72/100**. You\'re doing well on savings (+12% this month), but your entertainment spending is 28% over budget. Want me to suggest a plan to fix that?',
    time: '9:00 AM',
  },
  {
    id: 3,
    role: 'user',
    text: 'Yes, how can I reduce entertainment spending?',
    time: '9:01 AM',
  },
  {
    id: 4,
    role: 'assistant',
    text: 'Great! Here\'s a 3-step plan:\n1. Cancel Netflix or share a plan (saves ₹499/mo)\n2. Set a ₹2,500 entertainment cap in your budget\n3. Use BookMyShow credits before buying new tickets\n\nThis could free up ~₹2,000/month that I can redirect to your Emergency Fund goal.',
    time: '9:01 AM',
  },
]

const quickReplies = [
  'How can I save more?',
  'Should I invest now?',
  'Which tax regime is better for me?',
  'How to improve my credit score?',
]

const healthScoreData = [
  { subject: 'Budget', A: 68, fullMark: 100 },
  { subject: 'Savings', A: 75, fullMark: 100 },
  { subject: 'Investments', A: 60, fullMark: 100 },
  { subject: 'Credit', A: 73, fullMark: 100 },
  { subject: 'Insurance', A: 10, fullMark: 100 },
  { subject: 'Tax', A: 55, fullMark: 100 },
]

const insightHistory = [
  { id: 1, date: 'Mar 20', title: 'Overspend Alert', body: 'Entertainment category exceeded ₹2,500 budget by ₹700.', tag: 'Budget', tagVariant: 'warning' },
  { id: 2, date: 'Mar 15', title: 'Savings Goal on Track', body: 'Emergency fund growing at ₹5,500/month — 24% complete.', tag: 'Savings', tagVariant: 'success' },
  { id: 3, date: 'Mar 1', title: 'Salary Received', body: '₹45,000 credited. Auto-split suggestion: ₹9,000 to savings.', tag: 'Income', tagVariant: 'info' },
  { id: 4, date: 'Feb 28', title: 'Tax Opportunity', body: 'You have ₹1,02,000 unutilized 80C limit — invest before March 31.', tag: 'Tax', tagVariant: 'danger' },
]

const actionItems = [
  { id: 1, text: 'Start ₹3,000/month SIP in Nifty 50 Index Fund', done: false, priority: 'High' },
  { id: 2, text: 'Invest ₹1,02,000 in ELSS before March 31 (80C)', done: false, priority: 'High' },
  { id: 3, text: 'Get a ₹5L health insurance policy', done: false, priority: 'High' },
  { id: 4, text: 'Set entertainment budget cap to ₹2,500', done: false, priority: 'Medium' },
  { id: 5, text: 'Enable auto-pay for all EMIs', done: true, priority: 'Done' },
  { id: 6, text: 'Set up auto-save on salary credit day', done: false, priority: 'Medium' },
]

const priorityColor = { High: 'danger', Medium: 'warning', Done: 'success' }

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

function parseText(text) {
  // Bold **text** parsing
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i} className="block">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-white/90 font-semibold">{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && ' '}
      </span>
    )
  })
}

export default function AIAdvisor() {
  const { profile, financialHealth } = useUserStore()
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const [actions, setActions] = useState(actionItems)
  const bottomRef = useRef(null)
  // Keep a parallel array of {role, content} for the API call
  const chatHistoryRef = useRef([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function sendMessage(text) {
    if (!text.trim() || isTyping) return
    setError(null)

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Build API history (only user/assistant turns, no system)
    chatHistoryRef.current = [...chatHistoryRef.current, { role: 'user', content: text }]

    try {
      const reply = await sendToAI(chatHistoryRef.current, profile)
      chatHistoryRef.current = [...chatHistoryRef.current, { role: 'assistant', content: reply }]
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      setError('Failed to reach AI. Please try again.')
      chatHistoryRef.current = chatHistoryRef.current.slice(0, -1) // remove last user msg on error
    } finally {
      setIsTyping(false)
    }
  }

  function toggleAction(id) {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)))
  }

  return (
    <AppShell>
      <TopNav title="AI Advisor" />
      <PageTransition>
        <div className="p-6 space-y-6 max-w-[1280px]">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

            {/* Health score banner */}
            <motion.div variants={item}>
              <GlassCardAccent>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-ss-teal/20">
                      <Bot size={22} className="text-ss-teal-light" />
                    </div>
                    <div>
                      <p className="text-[13px] text-white/50 mb-0.5">AI Financial Advisor</p>
                      <h2 className="font-display font-semibold text-[18px] text-white/95">
                        Good morning, {profile.name.split(' ')[0]}!
                      </h2>
                      <p className="text-[13px] text-white/55 mt-0.5">
                        Your financial health score is{' '}
                        <span className="text-ss-teal-light font-semibold">{financialHealth.score}/100</span>
                        . 3 action items need attention.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-white/40 uppercase tracking-wider">Overall Score</span>
                    <span className="font-number font-bold text-[44px] text-ss-teal-light leading-none">
                      {financialHealth.score}
                    </span>
                    <div className="w-28">
                      <ProgressBar value={financialHealth.score} max={100} color="teal" />
                    </div>
                  </div>
                </div>
              </GlassCardAccent>
            </motion.div>

            <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">
              {/* Chat interface */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <GlassCard className="flex flex-col p-0 overflow-hidden">
                  {/* Chat header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-ss-teal/20 flex items-center justify-center">
                          <Bot size={16} className="text-ss-teal-light" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-ss-mint rounded-full border border-[#0f121e]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-white/90">SmartSalary AI</p>
                        <p className="text-[11px] text-ss-mint">Online</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setMessages(initialMessages); chatHistoryRef.current = []; setError(null) }}
                      className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              msg.role === 'assistant' ? 'bg-ss-teal/20' : 'bg-ss-violet/20'
                            }`}
                          >
                            {msg.role === 'assistant'
                              ? <Bot size={14} className="text-ss-teal-light" />
                              : <User size={14} className="text-ss-violet-light" />
                            }
                          </div>
                          <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                            <div
                              className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                                msg.role === 'assistant'
                                  ? 'bg-white/[0.07] border border-white/[0.08] text-white/80 rounded-tl-sm'
                                  : 'bg-ss-violet/20 border border-ss-violet/25 text-white/85 rounded-tr-sm'
                              }`}
                            >
                              {parseText(msg.text)}
                            </div>
                            <span className="text-[10px] text-white/25 px-1">{msg.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isTyping && (
                      <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-ss-teal/20 flex items-center justify-center flex-shrink-0">
                          <Bot size={14} className="text-ss-teal-light" />
                        </div>
                        <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-white/[0.07] border border-white/[0.08] flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-white/40"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[12px]">
                        <AlertCircle size={13} className="flex-shrink-0" />
                        {error}
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick replies */}
                  <div className="px-4 py-2 border-t border-white/[0.05] flex gap-2 overflow-x-auto">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full border border-white/[0.10] bg-white/[0.04] text-[12px] text-white/60 hover:text-white hover:border-ss-teal/40 hover:bg-ss-teal/5 transition-all"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-white/[0.06]">
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about your finances…"
                        className="flex-1 bg-white/[0.05] border border-white/[0.10] rounded-xl px-3.5 py-2.5 text-[13px] text-white/85 placeholder:text-white/30 outline-none focus:border-ss-teal/50 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="p-2.5 rounded-xl bg-ss-teal/20 border border-ss-teal/30 text-ss-teal-light hover:bg-ss-teal/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                </GlassCard>

                {/* Insight history */}
                <div>
                  <h3 className="font-display font-medium text-[15px] text-white/90 mb-3 flex items-center gap-2">
                    <Zap size={15} className="text-ss-amber" /> Recent Insights
                  </h3>
                  <div className="space-y-2.5">
                    {insightHistory.map((ins) => (
                      <GlassCard key={ins.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={ins.tagVariant}>{ins.tag}</Badge>
                              <span className="text-[11px] text-white/35">{ins.date}</span>
                            </div>
                            <p className="text-[13px] font-medium text-white/85 mb-0.5">{ins.title}</p>
                            <p className="text-[12px] text-white/55">{ins.body}</p>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: health radar + action items */}
              <div className="space-y-4">
                <GlassCardViolet>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-ss-violet-light" /> Financial Health
                  </h3>
                  <ScoreRadarChart data={healthScoreData} size={230} />
                  <div className="mt-2 space-y-1.5">
                    {healthScoreData.map((d) => (
                      <div key={d.subject} className="flex items-center gap-2">
                        <span className="text-[12px] text-white/60 flex-1">{d.subject}</span>
                        <div className="flex-1">
                          <ProgressBar value={d.A} max={100} color={d.A >= 70 ? 'teal' : d.A >= 50 ? 'amber' : 'danger'} showLabel={false} />
                        </div>
                        <span className="text-[11px] font-number text-white/45 w-8 text-right">{d.A}</span>
                      </div>
                    ))}
                  </div>
                </GlassCardViolet>

                <GlassCard>
                  <h3 className="font-display font-medium text-[14px] text-white/90 mb-3 flex items-center gap-2">
                    <TrendingUp size={14} className="text-ss-teal-light" /> Action Items
                  </h3>
                  <div className="space-y-2.5">
                    {actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => toggleAction(action.id)}
                        className="flex items-start gap-2.5 w-full text-left group"
                      >
                        {action.done
                          ? <CheckCircle size={15} className="text-ss-teal-light flex-shrink-0 mt-0.5" />
                          : <Circle size={15} className="text-white/25 flex-shrink-0 mt-0.5 group-hover:text-white/50 transition-colors" />
                        }
                        <div className="flex-1">
                          <p className={`text-[13px] ${action.done ? 'text-white/35 line-through' : 'text-white/75'}`}>
                            {action.text}
                          </p>
                        </div>
                        <Badge variant={priorityColor[action.priority]}>{action.priority}</Badge>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.07]">
                    <div className="flex justify-between text-[12px] mb-2">
                      <span className="text-white/50">Completed</span>
                      <span className="text-white/70 font-medium">
                        {actions.filter((a) => a.done).length}/{actions.length}
                      </span>
                    </div>
                    <ProgressBar
                      value={actions.filter((a) => a.done).length}
                      max={actions.length}
                      color="teal"
                      showLabel={false}
                    />
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
