import React from 'react';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  GraduationCap, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Sparkles,
  BarChart,
  UserPlus,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import StatCard from '../components/StatCard';

export default function DashboardPage({ 
  stats, 
  isLoading, 
  onViewAllStudents, 
  onOpenAddModal, 
  onViewStudent, 
  onExportCsv 
}) {
  const total = stats?.totalStudents || 0;
  const active = stats?.activeStudents || 0;
  const inactive = stats?.inactiveStudents || 0;
  const graduated = stats?.graduatedStudents || 0;
  const courses = stats?.totalCourses || 10;
  const departments = stats?.totalDepartments || 7;
  const recentStudents = stats?.recentStudents || [];
  const deptMap = stats?.departmentDistribution || {};
  const semMap = stats?.semesterDistribution || {};

  const activePct = total > 0 ? Math.round((active / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        {/* Decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-40 -top-10 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Academic Session 2026-2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Student Management Dashboard
            </h1>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Real-time administrative overview of campus enrollment, student statuses, course distributions, and recent registrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-slate-50 text-xs sm:text-sm font-bold shadow-lg shadow-black/10 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-indigo-600" />
              <span>Add Student</span>
            </button>
            <button
              onClick={onExportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={isLoading ? '...' : total.toLocaleString()}
          icon={Users}
          color="blue"
          trend="+100% stored in MySQL"
          subtitle="Enrolled Records"
        />

        <StatCard
          title="Active Students"
          value={isLoading ? '...' : active.toLocaleString()}
          icon={UserCheck}
          color="emerald"
          trend={`${activePct}% active rate`}
          subtitle="Current Campus Attendance"
        />

        <StatCard
          title="Total Courses"
          value={isLoading ? '...' : courses.toLocaleString()}
          icon={BookOpen}
          color="purple"
          trend="Accredited"
          subtitle="Curriculum Offerings"
        />

        <StatCard
          title="Departments"
          value={isLoading ? '...' : departments.toLocaleString()}
          icon={GraduationCap}
          color="amber"
          trend="Faculties"
          subtitle="Academic Wings"
        />
      </div>

      {/* Grid: Recent Registrations & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Recent Student Registrations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Recent Student Registrations</h3>
                  <p className="text-[11px] text-slate-400">Latest enrolled records from the database</p>
                </div>
              </div>

              <button
                onClick={onViewAllStudents}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recent Students List */}
            <div className="mt-4 divide-y divide-slate-100">
              {recentStudents.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No recent registrations available.
                </div>
              ) : (
                recentStudents.map((st) => {
                  const initials = (st.fullName || '')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={st.id}
                      onClick={() => onViewStudent(st)}
                      className="py-3 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {initials}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {st.fullName}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {st.enrollmentNumber} • {st.department}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Sem {st.semester}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {st.createdAt ? new Date(st.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing latest {recentStudents.length} entries</span>
            <button
              onClick={onViewAllStudents}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Open Full Directory →
            </button>
          </div>
        </div>

        {/* Right (1 col): Department Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Department Distribution</h3>
                <p className="text-[11px] text-slate-400">Students enrolled per department</p>
              </div>
            </div>

            <div className="mt-4 space-y-3.5">
              {Object.keys(deptMap).length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No department statistics yet.
                </div>
              ) : (
                Object.entries(deptMap).map(([dept, count]) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 truncate max-w-[180px]" title={dept}>
                          {dept}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {count} <span className="text-[10px] text-slate-400 font-normal">({pct}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Status Overview:</span>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-emerald-600">● {active} Active</span>
                <span className="text-amber-600">● {inactive} Inactive</span>
                <span className="text-purple-600">● {graduated} Grad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
