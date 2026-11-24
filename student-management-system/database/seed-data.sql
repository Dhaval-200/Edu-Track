-- ====================================================================
-- Student Management System - Seed Data
-- Database: student_management_db
-- ====================================================================

USE student_management_db;

-- Insert Departments
INSERT INTO departments (name, code) VALUES
('Computer Science & Engineering', 'CSE'),
('Information Technology', 'IT'),
('Electronics & Communication', 'ECE'),
('Mechanical Engineering', 'ME'),
('Civil Engineering', 'CE'),
('Electrical Engineering', 'EE'),
('Business Administration', 'BBA')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Insert Courses
INSERT INTO courses (code, name, department_id, credits) VALUES
('CS101', 'Data Structures & Algorithms', 1, 4),
('CS201', 'Database Management Systems', 1, 4),
('CS301', 'Operating Systems & Architecture', 1, 3),
('IT102', 'Web Technologies & Frameworks', 2, 4),
('IT202', 'Cloud Computing & DevOps', 2, 3),
('EC103', 'Digital Signal Processing', 3, 4),
('ME104', 'Thermodynamics & Fluid Mechanics', 4, 4),
('CE105', 'Structural Analysis & Design', 5, 3),
('EE106', 'Control Systems Engineering', 6, 4),
('BA107', 'Organizational Behavior & Finance', 7, 3)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Insert Realistic Initial Students
INSERT INTO students (full_name, enrollment_number, email, phone_number, gender, date_of_birth, department, semester, address, status, created_at) VALUES
('Aarav Sharma', 'EN2024CSE001', 'aarav.sharma@campus.edu', '+91 98765 43210', 'Male', '2004-03-15', 'Computer Science & Engineering', 4, '42 Maple Heights, Tech City, Sector 5', 'Active', '2026-11-20 09:30:00'),
('Ananya Patel', 'EN2024CSE002', 'ananya.patel@campus.edu', '+91 98765 43211', 'Female', '2004-07-22', 'Computer Science & Engineering', 4, '15 Green Park Avenue, West Extension', 'Active', '2026-11-20 10:15:00'),
('Rohan Verma', 'EN2023IT001', 'rohan.verma@campus.edu', '+91 98765 43212', 'Male', '2003-11-05', 'Information Technology', 6, '78 Sunrise Boulevard, Flat 3B', 'Active', '2026-11-21 11:00:00'),
('Sneha Reddy', 'EN2024ECE001', 'sneha.reddy@campus.edu', '+91 98765 43213', 'Female', '2004-01-30', 'Electronics & Communication', 3, '102 Silicon Residency, Cyber Hills', 'Active', '2026-11-21 14:20:00'),
('Vikram Joshi', 'EN2022ME001', 'vikram.joshi@campus.edu', '+91 98765 43214', 'Male', '2002-09-18', 'Mechanical Engineering', 8, '55 Industrial Lane, North Gate', 'Graduated', '2026-11-22 08:45:00'),
('Pooja Nair', 'EN2024CE001', 'pooja.nair@campus.edu', '+91 98765 43215', 'Female', '2004-05-12', 'Civil Engineering', 2, '23 Royal Orchid Road, South Point', 'Active', '2026-11-22 13:10:00'),
('Aditya Kulkarni', 'EN2023EE001', 'aditya.kulkarni@campus.edu', '+91 98765 43216', 'Male', '2003-08-25', 'Electrical Engineering', 5, '88 Riverfront View, Block C', 'Active', '2026-11-23 15:40:00'),
('Isha Gupta', 'EN2024BBA001', 'isha.gupta@campus.edu', '+91 98765 43217', 'Female', '2005-02-14', 'Business Administration', 1, '12 Harmony Gardens, Central Plaza', 'Active', '2026-11-23 16:50:00'),
('Rahul Mehta', 'EN2024CSE003', 'rahul.mehta@campus.edu', '+91 98765 43218', 'Male', '2004-12-01', 'Computer Science & Engineering', 3, '34 Crescent Towers, East Wing', 'Inactive', '2026-11-24 08:10:00'),
('Diya Deshmukh', 'EN2024IT002', 'diya.deshmukh@campus.edu', '+91 98765 43219', 'Female', '2004-06-19', 'Information Technology', 4, '91 Skyline Heights, Phase 2', 'Active', '2026-11-24 09:20:00')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);
