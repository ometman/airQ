import React from 'react';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Prediction {
  timestamp: number;
  aqi: number;
  confidence: number;
  factors: string[];
}

interface PredictionViewProps {
  predictions: Prediction[];
  alerts: {
    level: 'low' | 'medium' | 'high';
    message: string;
    timestamp: number;
  }[];
}

export function PredictionView({ predictions, alerts }: PredictionViewProps) {
  return (
    <div className="space-y-8">
      {/* Prediction Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Air Quality Forecast</h2>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer>
            <LineChart data={predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => format(timestamp, 'HH:mm')}
                type="number"
                domain={['auto', 'auto']}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => format(label, 'PPP p')}
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="#3B82F6"
                name="Predicted AQI"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#10B981"
                name="Confidence %"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Warnings */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold">Alerts & Warnings</h2>
        </div>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg flex items-start space-x-3
                ${alert.level === 'high' ? 'bg-red-50 text-red-800' :
                  alert.level === 'medium' ? 'bg-yellow-50 text-yellow-800' :
                  'bg-green-50 text-green-800'}
              `}
            >
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <div className="font-medium">{alert.message}</div>
                <div className="text-sm opacity-75 mt-1">
                  <Clock className="h-4 w-4 inline-block mr-1" />
                  {format(alert.timestamp, 'PPP p')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Contributing Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predictions[0]?.factors.map((factor, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">{factor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}