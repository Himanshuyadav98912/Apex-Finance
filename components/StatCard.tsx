
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => {
  return (
    <div className="p-5 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <div className="flex items-baseline justify-between mt-1">
        <p className="text-2xl font-bold text-white">{value}</p>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
