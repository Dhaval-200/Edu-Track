/**
 * Utility to export student records as CSV format
 */
export function exportStudentsToCsv(students) {
  if (!students || students.length === 0) {
    alert('No student records to export');
    return;
  }

  const headers = [
    'Student ID',
    'Full Name',
    'Enrollment Number',
    'Email',
    'Phone Number',
    'Gender',
    'Date of Birth',
    'Department',
    'Semester',
    'Status',
    'Address',
    'Registered Date'
  ];

  const rows = students.map(s => [
    s.id,
    `"${(s.fullName || '').replace(/"/g, '""')}"`,
    `"${s.enrollmentNumber || ''}"`,
    `"${s.email || ''}"`,
    `"${s.phoneNumber || ''}"`,
    `"${s.gender || ''}"`,
    `"${s.dateOfBirth || ''}"`,
    `"${(s.department || '').replace(/"/g, '""')}"`,
    s.semester || '',
    `"${s.status || ''}"`,
    `"${(s.address || '').replace(/"/g, '""')}"`,
    `"${s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
