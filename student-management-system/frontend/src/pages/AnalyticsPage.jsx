import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  GraduationCap, 
  Layers, 
  Users, 
  UserCheck, 
  UserX, 
  Award,
  BookOpen
} from 'lucide-react';

export default function AnalyticsPage({ stats }) {
  const total = stats?.totalStudents || 0;
  const active = stats?.activeStudents || 0;
  const inactive = stats?.inactiveStudents || 0;
  const graduated = stats?.graduatedStudents || 0;
  const deptMap = stats?.departmentDistribution || {};
  const semMap = stats?.semesterDistribution || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Academic Analytics & Insights</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Distribution metrics, cohort demographics, and departmental enrollment statistics.
        </p>
      </div>

      {/* Cohort Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Enrollment</p>
            <h3 className="text-2xl font-bold text-slate-800">{active}</h3>
            <p className="text-[11px] text-emerald-600 font-medium">
              {total > 0 ? Math.round((active / total) * 100) : 0}% of all registered students
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inactive / On Leave</p>
            <h3 className="text-2xl font-bold text-slate-800">{inactive}</h3>
            <p className="text-[11px] text-amber-600 font-medium">Pending reinstatement</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alumni / Graduated</p>
            <h3 className="text-2xl font-bold text-slate-800">{graduated}</h3>
            <p className="text-[11px] text-purple-600 font-medium">Degree completed</p>
          </div>
        </div>
      </div>

      {/* Grid: Department Bars & Semester Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Visual Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Enrollment by Department</h3>
              <p className="text-[11px] text-slate-400">Headcount distribution across academic programs</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {Object.entries(deptMap).map(([dept, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={dept} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{dept}</span>
                    <span className="font-bold text-slate-900">{count} students ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Semester Cohort Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Students Across Semesters</h3>
              <p className="text-[11px] text-slate-400">Progression from Semester 1 through 8</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const count = semMap[sem] || 0;
              return (
                <div 
                  key={sem} 
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    count > 0 
                      ? 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-200/80 shadow-xs' 
                      : 'bg-slate-50/40 border-slate-100 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] uppercase font-bold text-slate-400">Semester</p>
                  <h4 className="text-lg font-bold text-slate-800">{sem}</h4>
                  <p className="text-xs font-semibold text-indigo-600 mt-1">
                    {count} {count === 1 ? 'student' : 'students'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-700">Database Normalization Info:</span>
            <p>
              Student records are stored with full relational constraints in MySQL, indexed by enrollment number, department, semester, and status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
