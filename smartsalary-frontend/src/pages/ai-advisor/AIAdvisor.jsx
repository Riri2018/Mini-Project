import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import AIInsightCard from '../../components/shared/AIInsightCard';
import useUserStore from '../../store/userStore';
import ProgressBar from '../../components/ui/ProgressBar';

const initialMessages = [
  {
    role: 'ai',
    text: "Hi Arjun! 👋 I'm your SmartSalary AI Advisor. I've analyzed your financial profile and I'm here to help you make smarter decisions with your ₹65,000 salary. What would you like to know?",
    time: '10:00 AM',
  },
];

const suggestions = [
  'How should I invest my savings?',
  'What are the best tax saving options for me?',
  'Help me build an emergency fund',
  'Should I start a SIP?',
  'How can I improve my CIBIL score?',
  'Compare New vs Old tax regime for me',
];

const aiResponses = {
  invest: "Based on your profile, I recommend a **Moderate Growth** portfolio: 40% NIFTY 50 Index (via SIP), 25% Mid-cap fund, 20% ELSS (tax saving), 10% Gold ETF, 5% Liquid fund. Start with ₹5,000/month SIP and increase by 10% each year. Expected returns: 14-16% p.a. over 5+ years.",
  tax: "For your ₹8L CTC, the **New Tax Regime** saves you more. Under New: Tax ≈ ₹39,000. Under Old: Tax ≈ ₹35,000 (after deductions). To maximize savings: invest ₹1.5L in ELSS (80C), pay ₹25K health insurance (80D), claim HRA if applicable. This can bring your tax to near zero!",
  emergency: "Your goal should be **3× monthly expenses = ₹1,95,000**. You currently have ₹94,500 (48% done). Save ₹22,000/month into a **Liquid Fund** (Parag Parikh Liquid Fund offers 7% returns). You'll reach your target in 5 months!",
  sip: "Yes! Start a SIP immediately. My recommendation: ₹3,000 in **NIFTY 50 Index** + ₹2,000 in **HDFC ELSS Tax Saver**. Total: ₹5,000/month. Over 5 years at 14% returns: **₹4.5 Lakh**. The ELSS also saves you ₹15,600 in taxes annually.",
  cibil: "To improve your score from 680 to 750+: 1) **Get a credit card** (SBI SimplySAVE recommended for freshers), 2) Keep utilization **below 30%**, 3) Never miss EMI/credit card payment, 4) Don't apply for too many loans. Expected improvement: +30-40 points in 6 months.",
  default: "That's a great question! Based on your financial profile — ₹65K salary, 33% savings rate, moderate risk appetite — I recommend focusing on your emergency fund first, then starting investments. Would you like specific advice on budgeting, investing, or tax planning?",
};

const getAIResponse = (msg) => {
  const lower = msg.toLowerCase();
  if (lower.includes('invest') || lower.includes('sip') && !lower.includes('start')) return aiResponses.invest;
  if (lower.includes('tax') || lower.includes('regime')) return aiResponses.tax;
  if (lower.includes('emergency') || lower.includes('fund')) return aiResponses.emergency;
  if (lower.includes('sip') || lower.includes('mutual')) return aiResponses.sip;
  if (lower.includes('cibil') || lower.includes('credit') || lower.includes('score')) return aiResponses.cibil;
  return aiResponses.default;
};

const AIAdvisor = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { profile } = useUserStore();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const response = getAIResponse(msg);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'ai', text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const healthMetrics = [
    { label: 'Savings Rate', value: 33, color: '#5DCAA5' },
    { label: 'Investment Rate', value: 8, color: '#9F96FF' },
    { label: 'Emergency Cover', value: 48, color: '#EF9F27' },
    { label: 'Budget Adherence', value: 78, color: '#02C39A' },
  ];

  return (
    <div>
      <TopNav title="AI Advisor" subtitle="Your personal AI-powered financial advisor" />
      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat interface */}
          <div className="lg:col-span-2 glass-card flex flex-col" style={{ height: '70vh', minHeight: '500px' }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white/90" style={{ fontFamily: 'Syne, sans-serif' }}>SmartSalary AI</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#02C39A] animate-pulse" />
                  <p className="text-[11px] text-white/40">Online · Powered by ML</p>
                </div>
              </div>
              <button
                onClick={() => setMessages(initialMessages)}
                className="ml-auto p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-medium mt-0.5`}
                    style={msg.role === 'ai'
                      ? { background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }
                      : { background: 'rgba(108,99,255,0.25)', border: '1px solid rgba(108,99,255,0.4)', color: '#9F96FF' }
                    }>
                    {msg.role === 'ai' ? <Bot size={12} className="text-white" /> : <User size={12} />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`p-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      style={{
                        background: msg.role === 'ai' ? 'rgba(255,255,255,0.06)' : 'rgba(108,99,255,0.2)',
                        border: msg.role === 'ai' ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid rgba(108,99,255,0.4)',
                        color: 'rgba(255,255,255,0.85)',
                      }}>
                      {msg.text}
                    </div>
                    <p className="text-[10px] text-white/25 mt-1 px-1">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map(j => (
                        <motion.div key={j} className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {suggestions.slice(0, 3).map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-[11px] text-white/60 border border-white/[0.12] hover:border-[rgba(29,158,117,0.4)] hover:text-[#5DCAA5] transition-all whitespace-nowrap"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-2">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about your finances..."
                  className="flex-1 glass-input"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: input.trim() ? 'rgba(29,158,117,0.9)' : 'rgba(255,255,255,0.06)',
                    border: `0.5px solid ${input.trim() ? 'rgba(93,202,165,0.5)' : 'rgba(255,255,255,0.12)'}`,
                  }}
                >
                  <Send size={15} className={input.trim() ? 'text-white' : 'text-white/30'} />
                </button>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Health score card */}
            <div className="glass-card-accent p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={15} className="text-[#5DCAA5]" />
                <h3 className="text-[14px] font-semibold text-white/90" style={{ fontFamily: 'Syne, sans-serif' }}>Financial Health Score</h3>
              </div>
              <div className="text-center mb-4">
                <p className="text-[48px] font-bold text-[#5DCAA5]" style={{ fontFamily: 'Outfit, sans-serif' }}>72</p>
                <p className="text-[12px] text-white/45">out of 100</p>
              </div>
              <div className="space-y-3">
                {healthMetrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-white/55">{m.label}</span>
                      <span className="text-[11px]" style={{ color: m.color }}>{m.value}%</span>
                    </div>
                    <ProgressBar value={m.value} variant={m.color === '#5DCAA5' || m.color === '#02C39A' ? 'teal' : m.color === '#9F96FF' ? 'violet' : 'amber'} />
                  </div>
                ))}
              </div>
            </div>

            {/* Action items */}
            <div className="glass-card p-5">
              <SectionHeader title="Priority Actions" subtitle="Do these this month" />
              <div className="space-y-3">
                <AIInsightCard title="Max out 80C investments" description="₹70K more needed to save ₹21K in taxes." action="Invest" priority="high" delay={0.1} />
                <AIInsightCard title="Start ₹5K SIP" description="NIFTY 50 + ELSS combo recommended." action="Start" priority="medium" delay={0.15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
