import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function TaxBreakdownPie({ data, size = 220 }) {
  // data: [{ name: 'Basic Exemption', value: 300000, color: '#1D9E75' }]
  return (
    <div style={{ width: '100%', height: size }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="85%"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
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
    </div>
  )
}
