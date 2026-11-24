package com.sms.config;

import com.sms.entity.*;
import com.sms.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            DepartmentRepository departmentRepository,
            CourseRepository courseRepository,
            StudentRepository studentRepository) {
        return args -> {
            if (departmentRepository.count() == 0) {
                Department cse = departmentRepository.save(new Department(null, "Computer Science & Engineering", "CSE"));
                Department it = departmentRepository.save(new Department(null, "Information Technology", "IT"));
                Department ece = departmentRepository.save(new Department(null, "Electronics & Communication", "ECE"));
                Department me = departmentRepository.save(new Department(null, "Mechanical Engineering", "ME"));
                Department ce = departmentRepository.save(new Department(null, "Civil Engineering", "CE"));
                Department ee = departmentRepository.save(new Department(null, "Electrical Engineering", "EE"));
                Department bba = departmentRepository.save(new Department(null, "Business Administration", "BBA"));

                courseRepository.save(createCourse("CS101", "Data Structures & Algorithms", cse, 4));
                courseRepository.save(createCourse("CS201", "Database Management Systems", cse, 4));
                courseRepository.save(createCourse("CS301", "Operating Systems & Architecture", cse, 3));
                courseRepository.save(createCourse("IT102", "Web Technologies & Frameworks", it, 4));
                courseRepository.save(createCourse("IT202", "Cloud Computing & DevOps", it, 3));
                courseRepository.save(createCourse("EC103", "Digital Signal Processing", ece, 4));
                courseRepository.save(createCourse("ME104", "Thermodynamics & Fluid Mechanics", me, 4));
                courseRepository.save(createCourse("CE105", "Structural Analysis & Design", ce, 3));
                courseRepository.save(createCourse("EE106", "Control Systems Engineering", ee, 4));
                courseRepository.save(createCourse("BA107", "Organizational Behavior & Finance", bba, 3));
            }

            if (studentRepository.count() == 0) {
                studentRepository.save(new Student("Aarav Sharma", "EN2024CSE001", "aarav.sharma@campus.edu", "+91 98765 43210", Gender.Male, LocalDate.of(2004, 3, 15), "Computer Science & Engineering", 4, "42 Maple Heights, Tech City, Sector 5", StudentStatus.Active));
                studentRepository.save(new Student("Ananya Patel", "EN2024CSE002", "ananya.patel@campus.edu", "+91 98765 43211", Gender.Female, LocalDate.of(2004, 7, 22), "Computer Science & Engineering", 4, "15 Green Park Avenue, West Extension", StudentStatus.Active));
                studentRepository.save(new Student("Rohan Verma", "EN2023IT001", "rohan.verma@campus.edu", "+91 98765 43212", Gender.Male, LocalDate.of(2003, 11, 5), "Information Technology", 6, "78 Sunrise Boulevard, Flat 3B", StudentStatus.Active));
                studentRepository.save(new Student("Sneha Reddy", "EN2024ECE001", "sneha.reddy@campus.edu", "+91 98765 43213", Gender.Female, LocalDate.of(2004, 1, 30), "Electronics & Communication", 3, "102 Silicon Residency, Cyber Hills", StudentStatus.Active));
                studentRepository.save(new Student("Vikram Joshi", "EN2022ME001", "vikram.joshi@campus.edu", "+91 98765 43214", Gender.Male, LocalDate.of(2002, 9, 18), "Mechanical Engineering", 8, "55 Industrial Lane, North Gate", StudentStatus.Graduated));
                studentRepository.save(new Student("Pooja Nair", "EN2024CE001", "pooja.nair@campus.edu", "+91 98765 43215", Gender.Female, LocalDate.of(2004, 5, 12), "Civil Engineering", 2, "23 Royal Orchid Road, South Point", StudentStatus.Active));
                studentRepository.save(new Student("Aditya Kulkarni", "EN2023EE001", "aditya.kulkarni@campus.edu", "+91 98765 43216", Gender.Male, LocalDate.of(2003, 8, 25), "Electrical Engineering", 5, "88 Riverfront View, Block C", StudentStatus.Active));
                studentRepository.save(new Student("Isha Gupta", "EN2024BBA001", "isha.gupta@campus.edu", "+91 98765 43217", Gender.Female, LocalDate.of(2005, 2, 14), "Business Administration", 1, "12 Harmony Gardens, Central Plaza", StudentStatus.Active));
                studentRepository.save(new Student("Rahul Mehta", "EN2024CSE003", "rahul.mehta@campus.edu", "+91 98765 43218", Gender.Male, LocalDate.of(2004, 12, 1), "Computer Science & Engineering", 3, "34 Crescent Towers, East Wing", StudentStatus.Inactive));
                studentRepository.save(new Student("Diya Deshmukh", "EN2024IT002", "diya.deshmukh@campus.edu", "+91 98765 43219", Gender.Female, LocalDate.of(2004, 6, 19), "Information Technology", 4, "91 Skyline Heights, Phase 2", StudentStatus.Active));
            }
        };
    }

    private Course createCourse(String code, String name, Department dept, int credits) {
        Course course = new Course();
        course.setCode(code);
        course.setName(name);
        course.setDepartment(dept);
        course.setCredits(credits);
        return course;
    }
}
