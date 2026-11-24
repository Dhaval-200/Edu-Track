package com.sms.controller;

import com.sms.dto.ApiResponse;
import com.sms.dto.StudentRequestDTO;
import com.sms.dto.StudentResponseDTO;
import com.sms.entity.StudentStatus;
import com.sms.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Get paginated list of students with optional filtering and search.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<StudentResponseDTO>>> getAllStudents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) StudentStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<StudentResponseDTO> students = studentService.getAllStudents(search, department, semester, status, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Students retrieved successfully", students));
    }

    /**
     * Get all students as a flat list (useful for export or select lookups).
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<StudentResponseDTO>>> getAllStudentsFlat() {
        List<StudentResponseDTO> list = studentService.getAllStudentsList();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    /**
     * Get single student by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponseDTO>> getStudentById(@PathVariable Long id) {
        StudentResponseDTO student = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.ok(student));
    }

    /**
     * Get single student by unique enrollment number.
     */
    @GetMapping("/enrollment/{enrollmentNumber}")
    public ResponseEntity<ApiResponse<StudentResponseDTO>> getStudentByEnrollment(
            @PathVariable String enrollmentNumber) {
        StudentResponseDTO student = studentService.getStudentByEnrollmentNumber(enrollmentNumber);
        return ResponseEntity.ok(ApiResponse.ok(student));
    }

    /**
     * Add / Register a new student record.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<StudentResponseDTO>> createStudent(
            @Valid @RequestBody StudentRequestDTO requestDTO) {
        StudentResponseDTO created = studentService.createStudent(requestDTO);
        return new ResponseEntity<>(
                ApiResponse.ok("Student registered successfully", created),
                HttpStatus.CREATED
        );
    }

    /**
     * Update an existing student record.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponseDTO>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequestDTO requestDTO) {
        StudentResponseDTO updated = studentService.updateStudent(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.ok("Student updated successfully", updated));
    }

    /**
     * Delete a student record by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.ok("Student deleted successfully", null));
    }

    /**
     * Get list of unique available departments for dropdown filters.
     */
    @GetMapping("/departments")
    public ResponseEntity<ApiResponse<List<String>>> getDepartments() {
        List<String> depts = studentService.getAvailableDepartments();
        return ResponseEntity.ok(ApiResponse.ok(depts));
    }
}
