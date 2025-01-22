import React from 'react';
import { Heart, Users, Sun } from 'lucide-react';

interface HealthRecommendationsProps {
  recommendations: {
    general: string;
    sensitive: string;
    outdoor: string;
  };
}

export function HealthRecommendations({ recommendations }: HealthRecommendationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="font-semibold">General Health</h3>
        </div>
        <p className="text-gray-600">{recommendations.general}</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-purple-500 mr-2" />
          <h3 className="font-semibold">Sensitive Groups</h3>
        </div>
        <p className="text-gray-600">{recommendations.sensitive}</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Sun className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Outdoor Activities</h3>
        </div>
        <p className="text-gray-600">{recommendations.outdoor}</p>
      </div>
    </div>
  );
}