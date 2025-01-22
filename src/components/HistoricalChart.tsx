import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { HistoricalData } from '../types';

interface HistoricalChartProps {
  data: HistoricalData[];
  timeRange: string;
}

export function HistoricalChart({ data, timeRange }: HistoricalChartProps) {
  const formatXAxis = (timestamp: number) => {
    switch (timeRange) {
      case '24h':
        return format(timestamp, 'HH:mm');
      case '7d':
        return format(timestamp, 'MMM d');
      case '30d':
        return format(timestamp, 'MMM d');
      default:
        return format(timestamp, 'HH:mm');
    }
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            type="number"
            domain={['auto', 'auto']}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => format(label, 'PPP p')}
            contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
          />
          <Legend />
          <Line type="monotone" dataKey="aqi" stroke="#3B82F6" name="AQI" />
          <Line type="monotone" dataKey="pm25" stroke="#10B981" name="PM2.5" />
          <Line type="monotone" dataKey="pm10" stroke="#F59E0B" name="PM10" />
          <Line type="monotone" dataKey="o3" stroke="#6366F1" name="O₃" />
          <Line type="monotone" dataKey="no2" stroke="#EC4899" name="NO₂" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}