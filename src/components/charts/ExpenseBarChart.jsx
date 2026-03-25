import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ExpenseBarChart({ data, height = 200 }) {
  // data: [{ day: 'Mon', amount: 1200 }]
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            dy={8}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={{
              backgroundColor: 'rgba(15, 18, 30, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(val) => [`₹${val.toLocaleString()}`, 'Amount']}
          />
          <Bar 
            dataKey="amount" 
            fill="#E24B4A" 
            radius={[4, 4, 0, 0]}
            fillOpacity={0.8}
            activeBar={{ fillOpacity: 1 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
