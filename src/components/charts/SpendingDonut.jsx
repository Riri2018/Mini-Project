import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function SpendingDonut({ data, size = 200 }) {
  // data format: [{ name: 'Rent', value: 15000, color: '#1D9E75' }]
  return (
    <div style={{ width: '100%', height: size }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={2}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 18, 30, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(val) => `₹${val.toLocaleString()}`}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[11px] text-white/50 uppercase tracking-wider">Total</span>
        <span className="font-number font-medium text-[20px] text-white/90">
          ₹{data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
        </span>
      </div>
    </div>
  )
}
