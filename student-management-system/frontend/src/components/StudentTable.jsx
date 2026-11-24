import React from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  UserPlus, 
  GraduationCap,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import Pagination from './Pagination';

export default function StudentTable({
  students = [],
  isLoading,
  search,
  setSearch,
  department,
  setDepartment,
  semester,
  setSemester,
  status,
  setStatus,
  departments = [],
  pagination,
  onPageChange,
  onPageSizeChange,
  onResetFilters,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal,
  onExportCsv,
}) {
  const getStatusBadge = (s) => {
    switch (s) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Inactive':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Graduated':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const defaultDepts = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Business Administration'
  ];
  const deptList = departments.length > 0 ? departments : defaultDepts;

  const hasActiveFilters = Boolean(search || department !== 'ALL' || semester !== 'ALL' || status !== 'ALL');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header & Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Student Directory</h2>
            <p className="text-xs text-slate-500">
              Manage, search, and view all registered students in the system.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              title="Export visible or filtered students to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or enrollment number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden"
            >
              <option value="ALL">All Departments</option>
              {deptList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden"
            >
              <option value="ALL">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* Status & Reset Button */}
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modern Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Student Info</th>
              <th className="py-3 px-4">Enrollment No.</th>
              <th className="py-3 px-4">Department & Sem</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              // Loading Skeleton Rows
              [...Array(5)].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-200"></div>
                      <div className="space-y-1.5">
                        <div className="w-28 h-3.5 bg-slate-200 rounded"></div>
                        <div className="w-16 h-2.5 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><div className="w-24 h-4 bg-slate-200 rounded"></div></td>
                  <td className="py-4 px-4"><div className="w-32 h-4 bg-slate-200 rounded"></div></td>
                  <td className="py-4 px-4"><div className="w-28 h-4 bg-slate-200 rounded"></div></td>
                  <td className="py-4 px-4"><div className="w-16 h-5 bg-slate-200 rounded-full"></div></td>
                  <td className="py-4 px-6 text-right"><div className="w-20 h-6 bg-slate-200 rounded ml-auto"></div></td>
                </tr>
              ))
            ) : students.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={6} className="py-12 px-6 text-center">
                  <div className="max-w-sm mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">No Students Found</h3>
                    <p className="text-xs text-slate-500">
                      {hasActiveFilters 
                        ? 'No student matches your active search and filter criteria. Try resetting filters.' 
                        : 'No students have been registered yet. Click the button below to add your first student.'
                      }
                    </p>
                    {hasActiveFilters ? (
                      <button
                        onClick={onResetFilters}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear All Filters</span>
                      </button>
                    ) : (
                      <button
                        onClick={onOpenAddModal}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-700 transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add First Student</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Table Rows
              students.map((student) => {
                const initials = (student.fullName || '')
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <tr 
                    key={student.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Student Info */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                            {student.fullName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {student.gender} • ID #{student.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Enrollment Number */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                        {student.enrollmentNumber}
                      </span>
                    </td>

                    {/* Department & Semester */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="text-xs font-medium text-slate-800 truncate max-w-[200px]" title={student.department}>
                          {student.department}
                        </p>
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          Sem {student.semester}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="text-xs text-slate-700 truncate max-w-[180px]" title={student.email}>
                          {student.email}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {student.phoneNumber}
                        </p>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(student.status)}`}>
                        {student.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="View Student Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Student Information"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(student)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <Pagination
          currentPage={pagination.pageNumber}
          totalPages={pagination.totalPages}
          totalElements={pagination.totalElements}
          pageSize={pagination.pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
