import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function SavingsLineChart({ data, height = 240 }) {
  // data format: [{ month: 'Jan', savings: 4000, target: 5000 }]
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#028090" />
              <stop offset="100%" stopColor="#1D9E75" />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            tickFormatter={(val) => `₹${val/1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 18, 30, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(val) => [`₹${val.toLocaleString()}`, '']}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="url(#colorTarget)" 
            strokeWidth={2} 
            strokeDasharray="4 4" 
            dot={false}
            name="Target"
          />
          <Line 
            type="monotone" 
            dataKey="savings" 
            stroke="url(#colorSavings)" 
            strokeWidth={3}
            dot={{ r: 3, fill: '#1D9E75', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#5DCAA5', stroke: '#0a0e1a', strokeWidth: 2 }}
            name="Actual Savings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
