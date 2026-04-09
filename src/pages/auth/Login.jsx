import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import useAuthStore from '@/store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields')
      return
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters')
      return
    }

    const { success, needsOnboarding } = await login(formData.email, formData.password)
    
    if (success) {
      if (needsOnboarding) navigate('/onboarding')
      else navigate('/dashboard')
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
            Welcome back
          </h1>
          <p className="text-white/50 text-[14px] mt-1">
            Sign in to access your financial dashboard
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
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={16} />}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="text-[12px] text-ss-teal-light hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" fullWidth loading={isLoading}>
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <p className="text-[13px] text-white/50">
                Don't have an account?{' '}
                <Link to="/register" className="text-ss-teal-light font-medium hover:text-white transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </GlassCard>
        </motion.div>
        
      </div>
    </div>
  )
}
