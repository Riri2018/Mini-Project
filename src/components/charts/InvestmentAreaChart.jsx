import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function InvestmentAreaChart({ data, height = 280 }) {
  // data: [{ year: '2025', invested: 100000, value: 110000 }]
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(255,255,255,0.2)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="rgba(255,255,255,0.2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            tickFormatter={(val) => `₹${val/100000}L`}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
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
          <Area 
            type="monotone" 
            dataKey="invested" 
            stroke="rgba(255,255,255,0.4)" 
            fillOpacity={1} 
            fill="url(#colorInvested)" 
            name="Amount Invested"
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6C63FF" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            name="Projected Value"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
