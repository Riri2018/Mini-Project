import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, DollarSign, Bell, LogOut, Edit3, Save, Target } from 'lucide-react';
import TopNav from '../../components/layout/TopNav';
import SectionHeader from '../../components/shared/SectionHeader';
import ProgressBar from '../../components/ui/ProgressBar';
import useUserStore from '../../store/userStore';
import useAuthStore from '../../store/authStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';

const goalLabels = {
  emergency_fund: '🛡️ Emergency Fund',
  travel: '✈️ Travel & Experiences',
  investment: '📈 Wealth Building',
  home: '🏠 Own a Home',
  education: '🎓 Further Education',
  car: '🚗 Buy a Vehicle',
};

const Profile = () => {
  const { profile, updateProfile } = useUserStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const initials = profile.name.split(' ').map(n => n[0]).join('');

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <TopNav title="Profile" subtitle="Manage your account and preferences" />
      <div className="p-6 space-y-6">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[22px] font-semibold shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(29,158,117,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(29,158,117,0.4)', color: '#5DCAA5' }}>
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] font-bold text-white/95" style={{ fontFamily: 'Syne, sans-serif' }}>{profile.name}</h2>
            <p className="text-[13px] text-white/50 mb-1">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-success">Active</span>
              <span className="text-[11px] text-white/35">Member since 2026</span>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <button onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white"
                style={{ background: 'rgba(29,158,117,0.85)', border: '0.5px solid rgba(93,202,165,0.5)' }}>
                <Save size={13} /> Save
              </button>
            ) : (
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] text-white/60 border border-white/[0.14]"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Edit3 size={13} /> Edit
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Personal details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-5">
              <SectionHeader title="Personal Info" subtitle="Your basic information" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', icon: User },
                  { label: 'Age', key: 'age', icon: User },
                  { label: 'City', key: 'city', icon: Building },
                  { label: 'Employer', key: 'employer', icon: Building },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-[11px] uppercase tracking-wider text-white/40 mb-1.5">{field.label}</label>
                    {editing ? (
                      <input className="glass-input" value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} />
                    ) : (
                      <p className="text-[14px] text-white/85 font-medium">{profile[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <SectionHeader title="Salary Settings" subtitle="Your compensation details" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/40 mb-1.5">Monthly Take-Home</label>
                  {editing ? (
                    <input className="glass-input" type="number" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: Number(e.target.value) }))} />
                  ) : (
                    <p className="text-[22px] font-semibold text-[#5DCAA5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {formatCurrency(profile.salary)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/40 mb-1.5">Pay Date</label>
                  <p className="text-[14px] text-white/85">{profile.payDate}st of every month</p>
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="glass-card p-5">
              <SectionHeader title="Financial Goals" subtitle="Your active goals"
                action={<button className="text-[12px] text-[#5DCAA5]"><Target size={13} className="inline mr-1" />Edit Goals</button>} />
              <div className="flex flex-wrap gap-2">
                {profile.goals.map((g, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                    style={{ background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.35)', color: '#5DCAA5' }}>
                    {goalLabels[g] || g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Health score */}
            <div className="glass-card-accent p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-2">Financial Health</p>
              <div className="text-[48px] font-bold text-[#5DCAA5] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{profile.healthScore}</div>
              <p className="text-[12px] text-white/45 mb-3">out of 100</p>
              <ProgressBar value={profile.healthScore} variant="teal" />
              <p className="text-[11px] text-[#5DCAA5] mt-2">Good — Keep improving!</p>
            </div>

            {/* Notifications */}
            <div className="glass-card p-4">
              <p className="text-[13px] font-semibold text-white/80 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Notifications</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Monthly salary alert', enabled: true },
                  { label: 'Budget overspend warning', enabled: true },
                  { label: 'AI insights digest', enabled: false },
                  { label: 'Tax deadline reminders', enabled: true },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[12px] text-white/60">{n.label}</span>
                    <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-all ${n.enabled ? 'bg-[#1D9E75]' : 'bg-white/10'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${n.enabled ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout */}
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={{ background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
