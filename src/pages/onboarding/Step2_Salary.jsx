import { Building2, IndianRupee, Calendar } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Step2_Salary({ data, update, onNext, onBack }) {
  const handleNext = (e) => {
    e.preventDefault()
    onNext()
  }

  const inHand = data.salary
    ? Math.round(Number(data.salary) * 0.85).toLocaleString('en-IN')
    : null

  return (
    <GlassCard className="p-8">
      <h2 className="font-display text-[22px] font-semibold text-white/95 mb-1">Your salary details</h2>
      <p className="text-[13px] text-white/50 mb-6">We use this to create your personalised budget</p>

      <form onSubmit={handleNext} className="space-y-5">
        <Input
          label="Monthly Gross Salary (₹)"
          type="number"
          placeholder="45000"
          icon={<IndianRupee size={16} />}
          value={data.salary}
          onChange={e => update({ salary: e.target.value })}
          required
          min="10000"
        />

        {inHand && (
          <div className="glass-card-accent rounded-[12px] p-3">
            <p className="text-[12px] text-white/60">Estimated in-hand salary</p>
            <p className="font-number text-[22px] font-medium text-ss-teal-light">₹{inHand}</p>
            <p className="text-[11px] text-white/40 mt-0.5">After ~15% deductions (PF, TDS, PT)</p>
          </div>
        )}

        <Input
          label="Employer / Company"
          type="text"
          placeholder="TechCorp India"
          icon={<Building2 size={16} />}
          value={data.employer}
          onChange={e => update({ employer: e.target.value })}
        />

        <Input
          label="Salary Credit Date"
          type="number"
          placeholder="1"
          icon={<Calendar size={16} />}
          helper="Which date of the month do you get paid? (1–31)"
          value={data.payDate}
          onChange={e => update({ payDate: e.target.value })}
          min="1"
          max="31"
        />

        <div className="flex gap-3 pt-3">
          <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
            ← Back
          </Button>
          <Button type="submit" className="flex-2 flex-1">
            Continue →
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}
