import React from 'react';
import { Activity, BarChart2, TrendingUp } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'monitoring', label: 'Real-time Monitoring', icon: Activity },
  { id: 'analysis', label: 'Data Analysis', icon: BarChart2 },
  { id: 'prediction', label: 'Predictive Modeling', icon: TrendingUp },
];

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon
                className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}