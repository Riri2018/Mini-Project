import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Step1_Profile from './Step1_Profile'
import Step2_Salary from './Step2_Salary'
import Step3_Goals from './Step3_Goals'
import Step4_Expenses from './Step4_Expenses'
import Step5_Complete from './Step5_Complete'

const STEPS = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Salary' },
  { id: 3, label: 'Goals' },
  { id: 4, label: 'Expenses' },
  { id: 5, label: 'Done' },
]

export default function OnboardingShell() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    name: '', age: '', city: '',
    salary: '', employer: '', payDate: '',
    goals: [],
    expenses: { rent: '', food: '', transport: '', utilities: '', other: '' },
  })

  const update = (patch) => setData(prev => ({ ...prev, ...patch }))
  const next = () => setStep(s => Math.min(s + 1, 5))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const stepProps = { data, update, onNext: next, onBack: prev }

  return (
    <div className="bg-mesh-page min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="SmartSalary" className="w-10 h-10 mx-auto mb-3" />
          <p className="text-[12px] text-white/40 font-medium uppercase tracking-widest">Setup wizard</p>
        </div>

        {/* Progress stepper */}
        <div className="flex items-center justify-center mb-10 gap-1">
          {STEPS.map(({ id, label }, i) => (
            <div key={id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-all duration-300 ${
                  step > id
                    ? 'bg-ss-teal text-white'
                    : step === id
                    ? 'bg-ss-teal/20 border border-ss-teal/60 text-ss-teal-light'
                    : 'bg-white/[0.07] border border-white/[0.12] text-white/30'
                }`}>
                  {step > id ? <CheckCircle2 size={14} /> : id}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block transition-colors ${
                  step === id ? 'text-ss-teal-light' : step > id ? 'text-white/50' : 'text-white/25'
                }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px mx-1 mb-4 transition-all duration-300 ${step > id ? 'bg-ss-teal/60' : 'bg-white/[0.08]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && <Step1_Profile {...stepProps} />}
            {step === 2 && <Step2_Salary {...stepProps} />}
            {step === 3 && <Step3_Goals {...stepProps} />}
            {step === 4 && <Step4_Expenses {...stepProps} />}
            {step === 5 && <Step5_Complete data={data} />}
          </motion.div>
        </AnimatePresence>

        {/* Step indicator */}
        <p className="text-center text-[11px] text-white/25 mt-6">
          Step {step} of {STEPS.length}
        </p>
      </div>
    </div>
  )
}
