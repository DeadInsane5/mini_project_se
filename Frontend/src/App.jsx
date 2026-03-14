import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AuthContainer from './components/AuthContainer';
import StudentDashboard from './components/dashboard/student/StudentDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [studentId, setStudentId] = useState('');

  return (
    <>
      {isAuthenticated ? (
        <>
          {userRole !== 'Student' && <Header />}
          {userRole === 'Student' ? <StudentDashboard studentId={studentId} onLogout={() => { setIsAuthenticated(false); setUserRole(null); setStudentId(''); }} /> : <Dashboard />}
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
