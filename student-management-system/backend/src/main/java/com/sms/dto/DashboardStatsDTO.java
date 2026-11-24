package com.sms.dto;

import java.util.List;
import java.util.Map;

public class DashboardStatsDTO {

    private long totalStudents;
    private long activeStudents;
    private long inactiveStudents;
    private long graduatedStudents;
    private long totalCourses;
    private long totalDepartments;
    private List<StudentResponseDTO> recentStudents;
    private Map<String, Long> departmentDistribution;
    private Map<Integer, Long> semesterDistribution;

    public DashboardStatsDTO() {
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getActiveStudents() {
        return activeStudents;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }

    public long getInactiveStudents() {
        return inactiveStudents;
    }

    public void setInactiveStudents(long inactiveStudents) {
        this.inactiveStudents = inactiveStudents;
    }

    public long getGraduatedStudents() {
        return graduatedStudents;
    }

    public void setGraduatedStudents(long graduatedStudents) {
        this.graduatedStudents = graduatedStudents;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public List<StudentResponseDTO> getRecentStudents() {
        return recentStudents;
    }

    public void setRecentStudents(List<StudentResponseDTO> recentStudents) {
        this.recentStudents = recentStudents;
    }

    public Map<String, Long> getDepartmentDistribution() {
        return departmentDistribution;
    }

    public void setDepartmentDistribution(Map<String, Long> departmentDistribution) {
        this.departmentDistribution = departmentDistribution;
    }

    public Map<Integer, Long> getSemesterDistribution() {
        return semesterDistribution;
    }

    public void setSemesterDistribution(Map<Integer, Long> semesterDistribution) {
        this.semesterDistribution = semesterDistribution;
    }
}
