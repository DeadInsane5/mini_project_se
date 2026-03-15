import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AuthContainer from './components/AuthContainer';
import StudentDashboard from './components/dashboard/student/StudentDashboard';

function App() {
  // Initialize state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });
  const [studentId, setStudentId] = useState(() => {
    return localStorage.getItem('studentId') || '';
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userRole', userRole || '');
    localStorage.setItem('studentId', studentId || '');
  }, [isAuthenticated, userRole, studentId]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setStudentId('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentId');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {userRole !== 'Student' && <Header />}
          {userRole === 'Student' ? (
            <StudentDashboard 
              studentId={studentId} 
              onLogout={handleLogout} 
            />
          ) : (
            <Dashboard />
          )}
        </>
      ) : (
        <AuthContainer onLogin={(role, id) => {
          setIsAuthenticated(true);
          setUserRole(role);
          if (id) setStudentId(id);
        }} />
      )}
    </>
  );
}

export default App;
