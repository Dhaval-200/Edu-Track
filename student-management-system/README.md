# EduTrack Pro - Modern Student Management System (Full Stack)

A complete, enterprise-grade, modern **Student Management System** built with **Java Spring Boot**, **React.js**, and **MySQL**. Designed with a clean SaaS aesthetic featuring white backgrounds, indigo/blue accents, responsive layouts, and robust layered architecture.

---

## 1. Technology Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, Lucide React Icons
- **Backend:** Java Spring Boot 3.3.5, Spring Data JPA, Hibernate, Jakarta Bean Validation
- **Database:** MySQL 8.0 (`student_management_db`)
- **API:** RESTful JSON APIs with Global Exception Handling and CORS configuration
- **Build Tools:** Apache Maven 3.8+ (Backend), Node.js & npm / Vite (Frontend)

---

## 2. Project Architecture & Layered Structure

```text
student-management-system/
├── backend/                               # Java Spring Boot Service
│   ├── pom.xml                            # Maven dependencies & plugins
│   └── src/main/
│       ├── java/com/sms/
│       │   ├── StudentManagementApplication.java  # Main Boot entrypoint
│       │   ├── config/
│       │   │   └── CorsConfig.java                # Cross-Origin resource sharing
│       │   ├── controller/
│       │   │   ├── StudentController.java         # Student CRUD REST APIs
│       │   │   └── DashboardController.java       # Analytics & Stats API
│       │   ├── dto/
│       │   │   ├── ApiResponse.java               # Standard unified API response wrapper
│       │   │   ├── DashboardStatsDTO.java          # Aggregated dashboard metrics
│       │   │   ├── StudentRequestDTO.java          # Validated input payload
│       │   │   └── StudentResponseDTO.java         # Safe output payload
│       │   ├── entity/
│       │   │   ├── Student.java                   # JPA Student Entity
│       │   │   ├── Department.java                # JPA Department Entity
│       │   │   ├── Course.java                    # JPA Course Entity
│       │   │   ├── Gender.java                    # Male / Female / Other Enum
│       │   │   └── StudentStatus.java             # Active / Inactive / Graduated Enum
│       │   ├── exception/
│       │   │   ├── ErrorDetails.java              # Structured error response
│       │   │   ├── GlobalExceptionHandler.java     # @RestControllerAdvice handler
│       │   │   ├── ResourceNotFoundException.java # 404 handler
│       │   │   └── DuplicateResourceException.java# 409 handler
│       │   ├── repository/
│       │   │   ├── StudentRepository.java         # Paginated & filtered queries
│       │   │   ├── DepartmentRepository.java      # Department queries
│       │   │   └── CourseRepository.java          # Course queries
│       │   └── service/
│       │       ├── StudentService.java            # Student service contract
│       │       ├── StudentServiceImpl.java        # Business logic & validations
│       │       ├── DashboardService.java          # Dashboard metrics contract
│       │       └── DashboardServiceImpl.java      # Stats calculation logic
│       └── resources/
│           └── application.properties             # Spring & MySQL configuration
├── frontend/                              # Modern React SPA
│   ├── index.html                         # Entry HTML with Inter fonts
│   ├── package.json                       # Scripts and frontend dependencies
│   ├── vite.config.js                     # Vite dev server & proxy
│   └── src/
│       ├── main.jsx                       # React DOM entry
│       ├── App.jsx                        # Core application state & layout
│       ├── index.css                      # Tailwind styling & smooth transitions
│       ├── api/
│       │   └── studentApi.js              # REST client for backend endpoints
│       ├── components/
│       │   ├── Navbar.jsx                 # Top bar with quick actions & search
│       │   ├── Sidebar.jsx                # Collapsible sidebar with active status
│       │   ├── StatCard.jsx               # Metric summary cards with trends
│       │   ├── StudentTable.jsx           # Data table with search, filters & actions
│       │   ├── StudentModal.jsx           # Add / Update student modal with validation
│       │   ├── StudentDetailModal.jsx     # Comprehensive profile inspection modal
│       │   ├── DeleteConfirmModal.jsx     # Destructive confirmation modal
│       │   ├── ToastNotification.jsx      # Success/error feedback alerts
│       │   └── Pagination.jsx             # Rows-per-page & page buttons
│       ├── pages/
│       │   ├── DashboardPage.jsx          # Live metrics, charts & recent records
│       │   ├── AnalyticsPage.jsx          # Departmental & semester demographics
│       │   └── CoursesPage.jsx            # Academic course catalog
│       └── utils/
│           └── exportCsv.js               # CSV export generator
├── database/                              # MySQL Database Assets
│   ├── schema.sql                         # DDL: Tables, constraints, foreign keys
│   ├── seed-data.sql                      # DML: Realistic student & course seed data
│   └── start-mysql.sh                     # Dedicated local MySQL launcher
└── README.md                              # Complete setup & API documentation
```

---

## 3. Database Schema & Setup

### Database Details
- **Database Name:** `student_management_db`
- **Default Port:** `3307` (or `3306` for default system MySQL)
- **Default Username:** `root`
- **Default Password:** `root`

### Schema Overview
1. **`students` Table**:
   - `id`: BIGINT AUTO_INCREMENT PRIMARY KEY
   - `full_name`: VARCHAR(100) NOT NULL
   - `enrollment_number`: VARCHAR(50) NOT NULL UNIQUE
   - `email`: VARCHAR(100) NOT NULL UNIQUE
   - `phone_number`: VARCHAR(20) NOT NULL
   - `gender`: ENUM('Male', 'Female', 'Other') NOT NULL
   - `date_of_birth`: DATE NOT NULL
   - `department`: VARCHAR(100) NOT NULL
   - `semester`: INT NOT NULL (1 to 8)
   - `address`: VARCHAR(255) NOT NULL
   - `status`: ENUM('Active', 'Inactive', 'Graduated') NOT NULL DEFAULT 'Active'
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

2. **`departments` Table**:
   - `id`, `name`, `code`, `created_at`

3. **`courses` Table**:
   - `id`, `code`, `name`, `department_id`, `credits`, `created_at`

### Setting up the Database
To run the included local MySQL instance or import into your existing MySQL:

```bash
# 1. Start the database service (if using the included local runner):
bash database/start-mysql.sh

# 2. Import Schema & Initial Seed Data:
mysql -h 127.0.0.1 -P 3307 -u root -proot student_management_db < database/schema.sql
mysql -h 127.0.0.1 -P 3307 -u root -proot student_management_db < database/seed-data.sql
```

---

## 4. Running the Application Locally

### A. Run Spring Boot Backend (Port 8081)

```bash
cd backend
mvn clean spring-boot:run
```
The backend starts on `http://localhost:8081`.

> **Note on Port Configuration:**
> If your MySQL is running on port `3306` instead of `3307`, you can override it via environment variable or in `backend/src/main/resources/application.properties`:
> ```properties
> spring.datasource.url=jdbc:mysql://localhost:3306/student_management_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
> spring.datasource.username=root
> spring.datasource.password=your_password
> ```

### B. Run React Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to:
**`http://localhost:5173`**

---

## 5. RESTful API Documentation

All endpoints return unified JSON structures using the `ApiResponse<T>` envelope:

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| **GET** | `/api/dashboard/stats` | Retrieve aggregated dashboard counts, trends, and charts | None |
| **GET** | `/api/students` | Get paginated list of students with filtering and sorting | `search`, `department`, `semester`, `status`, `page`, `size`, `sortBy`, `sortDir` |
| **GET** | `/api/students/all` | Get all students in a flat list (for CSV export) | None |
| **GET** | `/api/students/{id}` | Retrieve single student by database ID | None |
| **GET** | `/api/students/enrollment/{enrollmentNo}` | Retrieve student by unique enrollment number | None |
| **GET** | `/api/students/departments` | Get unique available academic departments | None |
| **POST** | `/api/students` | Register a new student record (with `@Valid` checks) | JSON Body |
| **PUT** | `/api/students/{id}` | Update existing student record | JSON Body |
| **DELETE** | `/api/students/{id}` | Permanently delete a student record | None |

### Sample POST Request Payload:
```json
{
  "fullName": "Kavya Singhania",
  "enrollmentNumber": "EN2024CSE099",
  "email": "kavya.singhania@campus.edu",
  "phoneNumber": "+91 99887 76655",
  "gender": "Female",
  "dateOfBirth": "2005-04-10",
  "department": "Computer Science & Engineering",
  "semester": 2,
  "address": "Penthouse 14, Prestige Lakefront, Bangalore",
  "status": "Active"
}
```

---

## 6. Testing & Verification

You can test the running backend endpoints with curl:

```bash
# 1. Fetch dashboard analytics
curl -s http://localhost:8081/api/dashboard/stats

# 2. Search student by name
curl -s "http://localhost:8081/api/students?search=Aarav"

# 3. Filter by department and semester
curl -s "http://localhost:8081/api/students?department=Computer%20Science%20%26%20Engineering&semester=4"

# 4. Attempt duplicate registration (Returns 409 Conflict)
curl -i -X POST http://localhost:8081/api/students \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Duplicate","enrollmentNumber":"EN2024CSE001","email":"dup@test.com","phoneNumber":"1234567890","gender":"Male","dateOfBirth":"2000-01-01","department":"IT","semester":1,"address":"Test"}'
```

---

## 7. Key Features Implemented

1. **Enterprise Dashboard:**
   - Real-time statistics cards for Total Students, Active Students, Courses, and Departments.
   - Interactive progress bars showing enrollment distribution across departments.
   - Recent Student Registrations feed with direct profile inspection.

2. **Full CRUD Student Management:**
   - **Create:** Modal form with live client-side validation and backend uniqueness verification.
   - **Read:** Searchable, filterable, sortable, and paginated student data table.
   - **Update:** Pre-filled edit modal allowing full record updates.
   - **Delete:** Protected deletion with a confirmation modal warning.
   - **Detail View:** Full student profile card with contact and enrollment details.

3. **Data Integrity & Validations:**
   - Unique constraints on `enrollment_number` and `email`.
   - Validated phone number formats, past birth dates, and bounded semester numbers (1-8).
   - Global exception handling returning consistent error responses.

4. **Modern UI/UX Experience:**
   - Blue and purple gradient accents with clean white background.
   - Responsive sidebar and mobile drawer.
   - Toast notifications for all create, update, delete, and refresh actions.
   - One-click CSV export of student data.
