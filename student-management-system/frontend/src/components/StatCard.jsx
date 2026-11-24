import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue', subtitle }) {
  const colorMap = {
    blue: {
      gradient: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50',
      text: 'text-blue-600',
      badgeBg: 'bg-blue-100/60',
      badgeText: 'text-blue-700',
    },
    purple: {
      gradient: 'from-indigo-500 to-purple-600',
      lightBg: 'bg-purple-50',
      text: 'text-purple-600',
      badgeBg: 'bg-purple-100/60',
      badgeText: 'text-purple-700',
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-50',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-100/60',
      badgeText: 'text-emerald-700',
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-100/60',
      badgeText: 'text-amber-700',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${scheme.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-500/10`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500">{subtitle}</span>
        {trend && (
          <span className={`font-semibold px-2 py-0.5 rounded-full ${scheme.badgeBg} ${scheme.badgeText}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
