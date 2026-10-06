import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  highlightColor?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlightColor = 'blue',
  onClick,
}) => {
  const colorMap = {
    blue: 'border-l-blue-600 text-blue-600 bg-blue-50/50',
    emerald: 'border-l-emerald-600 text-emerald-600 bg-emerald-50/50',
    amber: 'border-l-amber-500 text-amber-600 bg-amber-50/50',
    rose: 'border-l-rose-600 text-rose-600 bg-rose-50/50',
    slate: 'border-l-slate-700 text-slate-700 bg-slate-50/50',
    indigo: 'border-l-indigo-600 text-indigo-600 bg-indigo-50/50',
  }[highlightColor];

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 border-l-4 rounded-lg p-4 sm:p-5 shadow-xs transition-all duration-150 ${colorMap.split(' ')[0]} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-slate-300' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        {icon && (
          <div className={`p-2 rounded-md ${colorMap.split(' ')[2]} ${colorMap.split(' ')[1]}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};
