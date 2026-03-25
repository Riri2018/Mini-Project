import { User, MapPin, Calendar } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Step1_Profile({ data, update, onNext }) {
  const handleNext = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <GlassCard className="p-8">
      <h2 className="font-display text-[22px] font-semibold text-white/95 mb-1">Tell us about yourself</h2>
      <p className="text-[13px] text-white/50 mb-6">We'll personalise everything based on your profile</p>

      <form onSubmit={handleNext} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Alex Fresher"
          icon={<User size={16} />}
          value={data.name}
          onChange={e => update({ name: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            placeholder="23"
            icon={<Calendar size={16} />}
            value={data.age}
            onChange={e => update({ age: e.target.value })}
            required
            min="18"
            max="35"
          />
          <Input
            label="City"
            type="text"
            placeholder="Mumbai"
            icon={<MapPin size={16} />}
            value={data.city}
            onChange={e => update({ city: e.target.value })}
            required
          />
        </div>

        <div className="pt-3">
          <Button type="submit" fullWidth size="lg">
            Continue →
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}
