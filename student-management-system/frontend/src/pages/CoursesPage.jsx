import React from 'react';
import { BookOpen, GraduationCap, Award, CheckCircle } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    { code: 'CS101', name: 'Data Structures & Algorithms', dept: 'Computer Science & Engineering', credits: 4, level: 'Undergraduate' },
    { code: 'CS201', name: 'Database Management Systems', dept: 'Computer Science & Engineering', credits: 4, level: 'Undergraduate' },
    { code: 'CS301', name: 'Operating Systems & Architecture', dept: 'Computer Science & Engineering', credits: 3, level: 'Undergraduate' },
    { code: 'IT102', name: 'Web Technologies & Frameworks', dept: 'Information Technology', credits: 4, level: 'Undergraduate' },
    { code: 'IT202', name: 'Cloud Computing & DevOps', dept: 'Information Technology', credits: 3, level: 'Undergraduate' },
    { code: 'EC103', name: 'Digital Signal Processing', dept: 'Electronics & Communication', credits: 4, level: 'Undergraduate' },
    { code: 'ME104', name: 'Thermodynamics & Fluid Mechanics', dept: 'Mechanical Engineering', credits: 4, level: 'Undergraduate' },
    { code: 'CE105', name: 'Structural Analysis & Design', dept: 'Civil Engineering', credits: 3, level: 'Undergraduate' },
    { code: 'EE106', name: 'Control Systems Engineering', dept: 'Electrical Engineering', credits: 4, level: 'Undergraduate' },
    { code: 'BA107', name: 'Organizational Behavior & Finance', dept: 'Business Administration', credits: 3, level: 'Undergraduate' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">College Course Catalog</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Curriculum listings connected with department faculty wings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div 
            key={course.code}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {course.code}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {course.credits} Credits
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{course.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{course.dept}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{course.level}</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Active Course
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
