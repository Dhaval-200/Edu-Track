/**
 * API Service for Student Management System
 * Communicates with Java Spring Boot backend on /api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:8081/api' 
    : '/api');

/**
 * Handle API responses and extract JSON data or error messages
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    let errorMsg = 'An unexpected error occurred';
    if (data && data.message) {
      errorMsg = data.message;
    } else if (data && data.validationErrors) {
      errorMsg = Object.values(data.validationErrors).join(', ');
    } else if (response.statusText) {
      errorMsg = response.statusText;
    }
    const error = new Error(errorMsg);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data ? data.data : null;
}

export const studentApi = {
  // Fetch dashboard statistics
  getDashboardStats: async () => {
    const res = await fetch(`${BASE_URL}/dashboard/stats`);
    return handleResponse(res);
  },

  // Fetch paginated students with filters
  getStudents: async ({ search = '', department = '', semester = '', status = '', page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc' } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (department && department !== 'ALL') params.append('department', department);
    if (semester && semester !== 'ALL') params.append('semester', semester);
    if (status && status !== 'ALL') params.append('status', status);
    params.append('page', page);
    params.append('size', size);
    params.append('sortBy', sortBy);
    params.append('sortDir', sortDir);

    const res = await fetch(`${BASE_URL}/students?${params.toString()}`);
    return handleResponse(res);
  },

  // Fetch all students without pagination (for export)
  getAllStudents: async () => {
    const res = await fetch(`${BASE_URL}/students/all`);
    return handleResponse(res);
  },

  // Fetch student by ID
  getStudentById: async (id) => {
    const res = await fetch(`${BASE_URL}/students/${id}`);
    return handleResponse(res);
  },

  // Fetch available departments
  getDepartments: async () => {
    const res = await fetch(`${BASE_URL}/students/departments`);
    return handleResponse(res);
  },

  // Create a new student
  createStudent: async (studentData) => {
    const res = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  // Update an existing student
  updateStudent: async (id, studentData) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  // Delete a student
  deleteStudent: async (id) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },
};
