import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import useAuthStore from '@/store/authStore'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading, error } = useAuthStore()
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill in all fields')
      return
    }

    const { success } = await register(formData.name, formData.email, formData.password)
    if (success) {
      navigate('/onboarding')
    }
  }

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Link to="/">
            <img src="/logo.svg" alt="SmartSalary" className="w-12 h-12 mb-4" />
          </Link>
          <h1 className="font-display text-[26px] font-semibold text-white/95">
            Create your account
          </h1>
          <p className="text-white/50 text-[14px] mt-1">
            Start your financial journey with SmartSalary
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {(error || formError) && (
                <div className="bg-ss-danger/10 border border-ss-danger/30 rounded-lg p-3 flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-ss-danger flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-ss-danger">
                    {error || formError}
                  </p>
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                placeholder="Alex Fresher"
                icon={<User size={16} />}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                helper="Must be at least 8 characters"
                required
              />

              <div className="pt-2">
                <Button type="submit" fullWidth loading={isLoading}>
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <p className="text-[13px] text-white/50">
                Already have an account?{' '}
                <Link to="/login" className="text-ss-teal-light font-medium hover:text-white transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
        
      </div>
    </div>
  )
}
