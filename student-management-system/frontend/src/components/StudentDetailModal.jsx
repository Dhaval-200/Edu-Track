import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Layers, 
  Clock, 
  Edit3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function StudentDetailModal({ isOpen, onClose, student, onEdit }) {
  if (!isOpen || !student) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Inactive':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Graduated':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const initials = (student.fullName || '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Top */}
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative px-6 py-4 flex justify-between items-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Profile Details</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="px-6 pb-6 relative">
          {/* Avatar and Top Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 -mt-10 mb-3">
            <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-xl ring-4 ring-white shrink-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-inner">
                {initials}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-end">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(student.status)}`}>
                {student.status}
              </span>
              <button
                onClick={() => {
                  onClose();
                  onEdit(student);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Student Name & Enrollment - Fully in clean white area */}
          <div className="mb-4">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {student.fullName}
            </h3>
            <p className="text-xs font-mono font-semibold text-indigo-600 mt-1">
              Enrollment No: {student.enrollmentNumber}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
            {/* Academic Info */}
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Department
              </span>
              <p className="text-xs font-semibold text-slate-800">{student.department}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-500" /> Current Semester
              </span>
              <p className="text-xs font-semibold text-slate-800">Semester {student.semester}</p>
            </div>

            {/* Contact Info */}
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500" /> Email Address
              </span>
              <p className="text-xs font-medium text-slate-800 break-all">{student.email}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" /> Phone Number
              </span>
              <p className="text-xs font-medium text-slate-800">{student.phoneNumber}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-500" /> Date of Birth & Gender
              </span>
              <p className="text-xs font-medium text-slate-800">
                {student.dateOfBirth} ({student.gender})
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Student System ID
              </span>
              <p className="text-xs font-mono font-medium text-slate-800">
                DB-ID #{student.id}
              </p>
            </div>
          </div>

          {/* Address Bar */}
          <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Residential Address
            </span>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">{student.address}</p>
          </div>

          {/* Footer Dates */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Enrolled: {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</span>
            <span>Last Updated: {student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
