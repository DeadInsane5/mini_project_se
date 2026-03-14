import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import TopBar from './TopBar';
import AttendanceTab from './AttendanceTab';
import MarksTab from './MarksTab';
import AssignmentsTab from './AssignmentsTab';

const StudentDashboard = ({ studentId, onLogout }) => {
  /*
   * DATA FETCHING COMMENT:
   * This parent layout manages the active tab state. It also could fetch basic student info 
   * (e.g. Student ID, Profile, Global At-Risk Flag) from the backend.
   * Example: 
   * fetch('/api/student/profile', { method: 'GET', headers: { Authorization: `Bearer ${token}` }})
   * .then(res => res.json())
   * .then(data => setStudentProfile(data));
   */

  const [activeTab, setActiveTab] = useState('attendance');
  const [theme, setTheme] = useState('light'); // default theme

  // Inject theme data attribute sequentially
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Dummy profile state for UI setup
  const studentProfile = {
    id: "STU-2026-001",
    flagStatus: "risk" // Depending on the backend overall aggregations
  };

  return (
    <div className="student-dashboard-wrapper fade-in">
      <TopBar 
        studentId={studentId || studentProfile.id} 
        studentFlag={studentProfile.flagStatus} 
        theme={theme}
        setTheme={setTheme}
        onLogout={onLogout}
      />
      
      <div className="main-content">
        {/* Sidebar Tabs */}
        <div className="sidebar-tabs glass-panel slide-up">
          <button 
            className={`nav-tab ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <span className="icon">📅</span> Attendance
          </button>
          <button 
            className={`nav-tab ${activeTab === 'marks' ? 'active' : ''}`}
            onClick={() => setActiveTab('marks')}
          >
            <span className="icon">📊</span> Marks
          </button>
          <button 
            className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <span className="icon">📝</span> Assignments
          </button>
        </div>

        {/* Dynamic Tab Content Area */}
        <div className="tab-content-area glass-container">
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'marks' && <MarksTab />}
          {activeTab === 'assignments' && <AssignmentsTab />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
