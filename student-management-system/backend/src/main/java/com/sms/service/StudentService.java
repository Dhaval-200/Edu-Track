package com.sms.service;

import com.sms.dto.StudentRequestDTO;
import com.sms.dto.StudentResponseDTO;
import com.sms.entity.StudentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentService {

    StudentResponseDTO createStudent(StudentRequestDTO requestDTO);

    StudentResponseDTO getStudentById(Long id);

    StudentResponseDTO getStudentByEnrollmentNumber(String enrollmentNumber);

    StudentResponseDTO updateStudent(Long id, StudentRequestDTO requestDTO);

    void deleteStudent(Long id);

    Page<StudentResponseDTO> getAllStudents(
            String search,
            String department,
            Integer semester,
            StudentStatus status,
            Pageable pageable
    );

    List<StudentResponseDTO> getAllStudentsList();

    List<String> getAvailableDepartments();
}
