import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Student
import StudentLogin from './components/Student/StudentLogin';
import StudentSignup from './components/Student/StudentSignup';
import BrowseJobs from './components/Student/BrowseJobs';
import JobApplication from './components/Student/JobApplication';
import StudentDashboard from './components/Student/StudentDashboard';
import MyAssessments from './components/Student/MyAssessments';
import TaskAssessment from './components/Student/TaskAssessment';
import Profile from './components/Student/Profile';
import Status from './components/Student/Status';

// Admin
import AdminLogin from './components/Admin/AdminLogin';
import AdminSignup from './components/Admin/AdminSignup';
import AdminDashboard from './components/Admin/AdminDashboard';
import PostJob from './components/Admin/PostJob';
import ManageJobs from './components/Admin/ManageJobs';
import JobApplicants from './components/Admin/JobApplicants';
import CreateTaskTemplate from './components/Admin/CreateTaskTemplate';
import AssignTask from './components/Admin/AssignTask';
import ViewSubmissions from './components/Admin/ViewSubmissions';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/student/login" />} />

      {/* Student Auth */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />

      {/* Student Protected */}
      <Route
        path="/student/jobs"
        element={
          <ProtectedRoute allowedRole="student">
            <BrowseJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/apply"
        element={
          <ProtectedRoute allowedRole="student">
            <JobApplication />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/assessments"
        element={
          <ProtectedRoute allowedRole="student">
            <MyAssessments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/assessment/:assignmentId"
        element={
          <ProtectedRoute allowedRole="student">
            <TaskAssessment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/status"
        element={
          <ProtectedRoute allowedRole="student">
            <Status />
          </ProtectedRoute>
        }
      />

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      {/* Admin Protected */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/create"
        element={
          <ProtectedRoute allowedRole="admin">
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allowedRole="admin">
            <ManageJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/:jobId/applicants"
        element={
          <ProtectedRoute allowedRole="admin">
            <JobApplicants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks/create-template"
        element={
          <ProtectedRoute allowedRole="admin">
            <CreateTaskTemplate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks/assign"
        element={
          <ProtectedRoute allowedRole="admin">
            <AssignTask />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/submissions/user/:userId"
        element={
          <ProtectedRoute allowedRole="admin">
            <ViewSubmissions />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1 className="text-center mt-20">404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
