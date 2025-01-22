import React from 'react';
import { Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';
import { AirQualityData } from '../types';
import { HealthRecommendations } from './HealthRecommendations';
import { AirQualityCard } from './AirQualityCard';

interface MonitoringViewProps {
  data: AirQualityData;
}

export function MonitoringView({ data }: MonitoringViewProps) {
  return (
    <div className="space-y-8">
      {/* AQI Status Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Air Quality Index</h2>
            <p className="text-blue-100">Current conditions are {data.status}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-1">{data.aqi}</div>
            <div className="text-blue-100">AQI</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AirQualityCard
          title="Temperature"
          value={data.temperature}
          icon={Thermometer}
          unit="°C"
          color="text-red-500"
        />
        <AirQualityCard
          title="Humidity"
          value={data.humidity}
          icon={Droplets}
          unit="%"
          color="text-blue-500"
        />
        <AirQualityCard
          title="Wind Speed"
          value={data.windSpeed}
          icon={Wind}
          unit="km/h"
          color="text-green-500"
        />
        <AirQualityCard
          title="Risk Level"
          value={data.aqi > 150 ? 'High' : data.aqi > 100 ? 'Medium' : 'Low'}
          icon={AlertTriangle}
          color="text-yellow-500"
        />
      </div>

      {/* Pollutants Grid */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Real-time Pollutant Levels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(data.pollutants).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 uppercase">{key}</div>
              <div className="text-xs text-gray-500 mt-2">
                {key === 'pm25' && 'Fine particles < 2.5µm'}
                {key === 'pm10' && 'Coarse particles < 10µm'}
                {key === 'o3' && 'Ground-level ozone'}
                {key === 'no2' && 'Nitrogen dioxide'}
                {key === 'so2' && 'Sulfur dioxide'}
                {key === 'co' && 'Carbon monoxide'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Recommendations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Health Recommendations</h2>
        <HealthRecommendations recommendations={data.healthRecommendations} />
      </div>
    </div>
  );
}