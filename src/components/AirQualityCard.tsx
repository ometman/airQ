import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AirQualityCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  unit?: string;
  color?: string;
}

export function AirQualityCard({
  title,
  value,
  icon: Icon,
  unit = '',
  color = 'text-blue-600'
}: AirQualityCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <Icon className={`${color} w-5 h-5`} />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="ml-1 text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}