import React from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
  Bell, 
  RefreshCw, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  onOpenAddModal, 
  onRefresh, 
  isRefreshing, 
  onSearchFocus,
  setIsMobileOpen 
}) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100/80 text-slate-600 border border-slate-200/50">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          <span>Academic Year 2026 - 2027</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-slate-500">{today}</span>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh Data"
          className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4.5 h-4.5 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
        </button>

        {/* Add Student Primary Action */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>

        {/* User Pill */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs ring-2 ring-indigo-500/20">
            AU
          </div>
          <span className="text-xs font-medium text-slate-700">Admin Portal</span>
        </div>
      </div>
    </header>
  );
}
