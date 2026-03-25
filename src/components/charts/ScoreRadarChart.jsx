import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export default function ScoreRadarChart({ data, size = 260 }) {
  // data: [{ subject: 'Payment History', A: 90, fullMark: 100 }]
  return (
    <div style={{ width: '100%', height: size }} className="flex justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#6C63FF"
            strokeWidth={2}
            fill="#6C63FF"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
