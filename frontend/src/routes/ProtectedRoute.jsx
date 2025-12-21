import { Navigate } from 'react-router-dom';

const isAuthenticated = () => localStorage.getItem('token');
const getUserRole = () => localStorage.getItem('role');

const ProtectedRoute = ({ children, allowedRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/student/login" replace />;
  }

  if (allowedRole && getUserRole() !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
