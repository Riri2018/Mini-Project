import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // mock API delay
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to login
        </Link>
        
        <GlassCard className="p-8">
          <h2 className="font-display text-[22px] font-semibold text-white/95 mb-2">
            Reset Password
          </h2>
          
          {success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
              <div className="w-16 h-16 bg-ss-mint/20 text-ss-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-[15px] font-medium text-white/90 mb-2">Check your inbox</p>
              <p className="text-[13px] text-white/50 mb-6">
                We've sent password reset instructions to {email}
              </p>
              <Button onClick={() => window.location.href='/login'} fullWidth>
                Return to Login
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-[14px] text-white/60 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <div className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail size={16} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" fullWidth loading={loading}>
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
