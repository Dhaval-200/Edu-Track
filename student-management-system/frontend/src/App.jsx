import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StudentTable from './components/StudentTable';
import AnalyticsPage from './pages/AnalyticsPage';
import CoursesPage from './pages/CoursesPage';
import StudentModal from './components/StudentModal';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastNotification from './components/ToastNotification';
import { studentApi } from './api/studentApi';
import { exportStudentsToCsv } from './utils/exportCsv';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Data states
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter states
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('ALL');
  const [semester, setSemester] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  // Pagination states
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 0,
  });

  // Modal states
  const [studentModal, setStudentModal] = useState({ isOpen: false, student: null });
  const [detailModal, setDetailModal] = useState({ isOpen: false, student: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, student: null });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      const data = await studentApi.getDashboardStats();
      setDashboardStats(data);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    }
  }, []);

  // Fetch Available Departments
  const fetchDepartments = useCallback(async () => {
    try {
      const data = await studentApi.getDepartments();
      if (data && Array.isArray(data)) {
        setDepartments(data);
      }
    } catch (err) {
      console.error('Failed to load departments:', err);
    }
  }, []);

  // Fetch Students with pagination and filters
  const fetchStudents = useCallback(async (page = 0, size = pagination.pageSize) => {
    setIsLoadingStudents(true);
    try {
      const data = await studentApi.getStudents({
        search,
        department,
        semester,
        status,
        page,
        size,
        sortBy: 'createdAt',
        sortDir: 'desc',
      });

      if (data) {
        setStudents(data.content || []);
        setPagination({
          pageNumber: data.number || 0,
          pageSize: data.size || 10,
          totalPages: data.totalPages || 1,
          totalElements: data.totalElements || 0,
        });
      }
    } catch (err) {
      console.error('Failed to load students:', err);
      showToast(err.message || 'Error fetching student records', 'error');
    } finally {
      setIsLoadingStudents(false);
    }
  }, [search, department, semester, status, pagination.pageSize]);

  // Initial load
  useEffect(() => {
    fetchDashboardStats();
    fetchDepartments();
  }, [fetchDashboardStats, fetchDepartments]);

  // Debounced/Reactive student fetch on filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(0);
    }, 250);
    return () => clearTimeout(timer);
  }, [search, department, semester, status]);

  // Refresh all application data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchStudents(pagination.pageNumber),
        fetchDepartments()
      ]);
      showToast('Data refreshed successfully', 'success');
    } catch (err) {
      showToast('Failed to refresh data', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle Add or Edit Student Submit
  const handleStudentFormSubmit = async (formData) => {
    if (studentModal.student) {
      // Update
      const updated = await studentApi.updateStudent(studentModal.student.id, formData);
      showToast(`Student ${updated.fullName} updated successfully!`, 'success');
    } else {
      // Create
      const created = await studentApi.createStudent(formData);
      showToast(`Student ${created.fullName} registered successfully!`, 'success');
    }
    // Refresh table and stats
    fetchStudents(pagination.pageNumber);
    fetchDashboardStats();
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async (id) => {
    try {
      await studentApi.deleteStudent(id);
      showToast('Student deleted successfully', 'success');
      fetchStudents(pagination.pageNumber);
      fetchDashboardStats();
    } catch (err) {
      showToast(err.message || 'Failed to delete student', 'error');
      throw err;
    }
  };

  // Handle Export to CSV
  const handleExportCsv = async () => {
    try {
      const allStudents = await studentApi.getAllStudents();
      exportStudentsToCsv(allStudents);
      showToast('Student data exported successfully', 'success');
    } catch (err) {
      // Fallback to currently loaded students
      exportStudentsToCsv(students);
      showToast('Exported visible records to CSV', 'success');
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setDepartment('ALL');
    setSemester('ALL');
    setStatus('ALL');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main App Layout */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar
          onOpenAddModal={() => setStudentModal({ isOpen: true, student: null })}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardPage
              stats={dashboardStats}
              isLoading={isLoadingStudents}
              onViewAllStudents={() => setCurrentTab('students')}
              onOpenAddModal={() => setStudentModal({ isOpen: true, student: null })}
              onViewStudent={(st) => setDetailModal({ isOpen: true, student: st })}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'students' && (
            <StudentTable
              students={students}
              isLoading={isLoadingStudents}
              search={search}
              setSearch={setSearch}
              department={department}
              setDepartment={setDepartment}
              semester={semester}
              setSemester={setSemester}
              status={status}
              setStatus={setStatus}
              departments={departments}
              pagination={pagination}
              onPageChange={(p) => fetchStudents(p)}
              onPageSizeChange={(size) => {
                setPagination((prev) => ({ ...prev, pageSize: size }));
                fetchStudents(0, size);
              }}
              onResetFilters={handleResetFilters}
              onViewStudent={(st) => setDetailModal({ isOpen: true, student: st })}
              onEditStudent={(st) => setStudentModal({ isOpen: true, student: st })}
              onDeleteStudent={(st) => setDeleteModal({ isOpen: true, student: st })}
              onOpenAddModal={() => setStudentModal({ isOpen: true, student: null })}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsPage stats={dashboardStats} />
          )}

          {currentTab === 'courses' && (
            <CoursesPage />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <StudentModal
        isOpen={studentModal.isOpen}
        onClose={() => setStudentModal({ isOpen: false, student: null })}
        onSubmit={handleStudentFormSubmit}
        student={studentModal.student}
        departments={departments}
      />

      <StudentDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, student: null })}
        student={detailModal.student}
        onEdit={(st) => setStudentModal({ isOpen: true, student: st })}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, student: null })}
        onConfirm={handleConfirmDelete}
        student={deleteModal.student}
      />

      {/* Toast Alert */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
