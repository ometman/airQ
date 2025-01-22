import React, { useState } from 'react';
import { BarChart2, MapPin, AlertCircle } from 'lucide-react';
import { HistoricalChart } from './HistoricalChart';
import type { HistoricalData, PollutionHotspot } from '../types';

interface AnalysisViewProps {
  historicalData: HistoricalData[];
  hotspots: PollutionHotspot[];
}

export function AnalysisView({ historicalData, hotspots }: AnalysisViewProps) {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-8">
      {/* Correlation Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <BarChart2 className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Pollution Patterns Analysis</h2>
        </div>
        <div className="mb-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-md py-2 px-3 text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <HistoricalChart data={historicalData} timeRange={timeRange} />
      </div>

      {/* Pollution Hotspots */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <MapPin className="h-6 w-6 text-red-500 mr-2" />
          <h2 className="text-xl font-semibold">Pollution Hotspots</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{hotspot.location}</h3>
                <span className={`
                  px-2 py-1 rounded-full text-sm
                  ${hotspot.severity === 'high' ? 'bg-red-100 text-red-800' :
                    hotspot.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}
                `}>
                  {hotspot.severity.charAt(0).toUpperCase() + hotspot.severity.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <div>Lat: {hotspot.coordinates.lat}</div>
                <div>Lng: {hotspot.coordinates.lng}</div>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Contributing Factors:</h4>
                <ul className="text-sm text-gray-600">
                  {hotspot.factors.map((factor, index) => (
                    <li key={index} className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-gray-400 mr-1" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}