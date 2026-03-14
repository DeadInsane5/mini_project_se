import React, { useState } from 'react';
import './StudentDashboard.css';

const TopBar = ({ studentId, studentFlag, theme, setTheme, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="top-bar glass-panel">
      <div className="top-bar-left">
        <h1 className="website-name">EduTrack</h1>
      </div>
      
      <div className="top-bar-center">
        {studentFlag === 'risk' ? (
          <span className="flag risk-flag">⚠️ At Risk</span>
        ) : (
          <span className="flag safe-flag">✅ Safe</span>
        )}
      </div>

      <div className="top-bar-right">
        <span className="student-id">{studentId}</span>
        <div className="profile-menu-container">
          <div 
            className="profile-icon" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {/* Using a placeholder SVG avatar. In a real app, this would be user uploaded image */}
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" alt="Profile" />
          </div>
          
          {isProfileOpen && (
            <div className="profile-dropdown glass-panel fade-in">
              <button className="dropdown-item" onClick={() => alert('Profile Clicked. Under Construction.')}>Profile</button>
              <button className="dropdown-item" onClick={() => alert('Settings Clicked. Under Construction.')}>Settings</button>
              <button className="dropdown-item" onClick={() => alert('Notifications Clicked. Under Construction.')}>Notifications</button>
              <div className="theme-toggle">
                <span>Theme:</span>
                <select 
                  value={theme} 
                  onChange={(e) => {
                    setTheme(e.target.value);
                    document.documentElement.setAttribute('data-theme', e.target.value);
                  }} 
                  className="theme-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <button className="dropdown-item text-danger" onClick={onLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
