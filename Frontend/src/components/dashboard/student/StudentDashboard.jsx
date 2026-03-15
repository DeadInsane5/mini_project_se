import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import TopBar from './TopBar';
import AttendanceTab from './AttendanceTab';
import MarksTab from './MarksTab';
import AssignmentsTab from './AssignmentsTab';
import { API_BASE_URL } from '../../../config';

const StudentDashboard = ({ studentId, onLogout }) => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [theme, setTheme] = useState('light');
  const [studentProfile, setStudentProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch student profile
        const profileRes = await fetch(`${API_BASE_URL}/users/${studentId}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setStudentProfile(profileData);
        }

        // Fetch notifications
        const notifRes = await fetch(`${API_BASE_URL}/notifications/student/${studentId}`);
        if (notifRes.ok) {
          const notifData = await notifRes.json();
          setNotifications(notifData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchDashboardData();
    }
  }, [studentId]);

  if (loading) {
    return <div className="loading-screen">Loading Dashboard...</div>;
  }

  // Determine global risk flag from notifications
  const hasRiskAlert = notifications.some(n => n.priority === 'high' || n.priority === 'medium');
  const flagStatus = hasRiskAlert ? 'risk' : 'safe';

  return (
    <div className="student-dashboard-wrapper fade-in">
      <TopBar 
        studentId={studentId} 
        studentFlag={flagStatus} 
        theme={theme}
        setTheme={setTheme}
        onLogout={onLogout}
        notifications={notifications}
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
          {activeTab === 'attendance' && <AttendanceTab studentId={studentId} notifications={notifications} />}
          {activeTab === 'marks' && <MarksTab studentId={studentId} notifications={notifications} />}
          {activeTab === 'assignments' && <AssignmentsTab studentId={studentId} notifications={notifications} />}
        </div>
        </div>
        </div>
        );
        };


export default StudentDashboard;
