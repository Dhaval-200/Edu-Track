package com.sms.service;

import com.sms.dto.StudentRequestDTO;
import com.sms.dto.StudentResponseDTO;
import com.sms.entity.Department;
import com.sms.entity.Student;
import com.sms.entity.StudentStatus;
import com.sms.exception.DuplicateResourceException;
import com.sms.exception.ResourceNotFoundException;
import com.sms.repository.DepartmentRepository;
import com.sms.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    public StudentServiceImpl(StudentRepository studentRepository, DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO requestDTO) {
        // Check for duplicate enrollment number
        if (studentRepository.existsByEnrollmentNumber(requestDTO.getEnrollmentNumber().trim())) {
            throw new DuplicateResourceException(
                    "Student with enrollment number '" + requestDTO.getEnrollmentNumber() + "' already exists."
            );
        }

        // Check for duplicate email
        if (studentRepository.existsByEmail(requestDTO.getEmail().trim())) {
            throw new DuplicateResourceException(
                    "Student with email '" + requestDTO.getEmail() + "' already exists."
            );
        }

        Student student = new Student();
        mapDtoToEntity(requestDTO, student);

        Student savedStudent = studentRepository.save(student);
        return StudentResponseDTO.fromEntity(savedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
        return StudentResponseDTO.fromEntity(student);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByEnrollmentNumber(String enrollmentNumber) {
        Student student = studentRepository.findByEnrollmentNumber(enrollmentNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "enrollmentNumber", enrollmentNumber));
        return StudentResponseDTO.fromEntity(student);
    }

    @Override
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO requestDTO) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        // Validate uniqueness excluding current student ID
        if (studentRepository.existsByEnrollmentNumberAndIdNot(requestDTO.getEnrollmentNumber().trim(), id)) {
            throw new DuplicateResourceException(
                    "Enrollment number '" + requestDTO.getEnrollmentNumber() + "' is already in use by another student."
            );
        }

        if (studentRepository.existsByEmailAndIdNot(requestDTO.getEmail().trim(), id)) {
            throw new DuplicateResourceException(
                    "Email '" + requestDTO.getEmail() + "' is already in use by another student."
            );
        }

        mapDtoToEntity(requestDTO, existingStudent);
        Student updatedStudent = studentRepository.save(existingStudent);
        return StudentResponseDTO.fromEntity(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getAllStudents(
            String search,
            String department,
            Integer semester,
            StudentStatus status,
            Pageable pageable) {

        String trimmedSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String trimmedDept = (department != null && !department.trim().isEmpty() && !department.equalsIgnoreCase("ALL"))
                ? department.trim() : null;

        Page<Student> studentPage = studentRepository.findWithFilters(
                trimmedSearch, trimmedDept, semester, status, pageable
        );

        return studentPage.map(StudentResponseDTO::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDTO> getAllStudentsList() {
        return studentRepository.findAll()
                .stream()
                .map(StudentResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getAvailableDepartments() {
        List<Department> departments = departmentRepository.findAll();
        if (!departments.isEmpty()) {
            return departments.stream().map(Department::getName).sorted().collect(Collectors.toList());
        }
        return List.of(
                "Business Administration",
                "Civil Engineering",
                "Computer Science & Engineering",
                "Electrical Engineering",
                "Electronics & Communication",
                "Information Technology",
                "Mechanical Engineering"
        );
    }

    private void mapDtoToEntity(StudentRequestDTO dto, Student student) {
        student.setFullName(dto.getFullName().trim());
        student.setEnrollmentNumber(dto.getEnrollmentNumber().trim().toUpperCase());
        student.setEmail(dto.getEmail().trim().toLowerCase());
        student.setPhoneNumber(dto.getPhoneNumber().trim());
        student.setGender(dto.getGender());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setDepartment(dto.getDepartment().trim());
        student.setSemester(dto.getSemester());
        student.setAddress(dto.getAddress().trim());
        if (dto.getStatus() != null) {
            student.setStatus(dto.getStatus());
        } else if (student.getStatus() == null) {
            student.setStatus(StudentStatus.Active);
        }
    }
}
