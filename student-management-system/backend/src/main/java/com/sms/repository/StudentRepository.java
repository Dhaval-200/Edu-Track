package com.sms.repository;

import com.sms.entity.Student;
import com.sms.entity.StudentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);

    Optional<Student> findByEmail(String email);

    boolean existsByEnrollmentNumber(String enrollmentNumber);

    boolean existsByEmail(String email);

    boolean existsByEnrollmentNumberAndIdNot(String enrollmentNumber, Long id);

    boolean existsByEmailAndIdNot(String email, Long id);

    long countByStatus(StudentStatus status);

    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> countStudentsByDepartment();

    @Query("SELECT s.semester, COUNT(s) FROM Student s GROUP BY s.semester ORDER BY s.semester ASC")
    List<Object[]> countStudentsBySemester();

    @Query("SELECT s FROM Student s WHERE " +
           "(:search IS NULL OR LOWER(s.fullName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "                  OR LOWER(s.enrollmentNumber) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:department IS NULL OR :department = '' OR s.department = :department) " +
           "AND (:semester IS NULL OR s.semester = :semester) " +
           "AND (:status IS NULL OR s.status = :status)")
    Page<Student> findWithFilters(
            @Param("search") String search,
            @Param("department") String department,
            @Param("semester") Integer semester,
            @Param("status") StudentStatus status,
            Pageable pageable
    );

    List<Student> findTop5ByOrderByCreatedAtDesc();
}
