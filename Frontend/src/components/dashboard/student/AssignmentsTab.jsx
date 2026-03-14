import React, { useState } from 'react';
import './StudentDashboard.css';

const AssignmentsTab = () => {
  /*
   * DATA FETCHING COMMENT:
   * This component accesses assignments data from the backend MongoDB via Node/Express.
   * Total count per category is checked to determine the main assignments flag.
   * Example: 
   * fetch('/api/student/assignments', { method: 'GET', headers: { Authorization: `Bearer ${token}` }})
   * .then(res => res.json())
   * .then(data => setAssignments(data));
   */
   
  const [activeSquare, setActiveSquare] = useState(null);
  
  // Dummy State mimicking DB output
  const delayedCount = 2; // Derived from backend counting delayed array.
  const hasMultipleDelayed = delayedCount > 1; // Flag constraint: > 1 assignment late

  const assignments = {
    new: [{ id: 1, title: 'Math Worksheet 4', subject: 'Math', faculty: 'Prof. Smith' }],
    delayed: [
      { id: 2, title: 'Science Lab Report', subject: 'Science', faculty: 'Dr. Jones' },
      { id: 3, title: 'English Essay', subject: 'English', faculty: 'Prof. Davis' }
    ],
    pending: [{ id: 4, title: 'History Project', subject: 'History', faculty: 'Mr. White' }],
    submitted: [{ id: 5, title: 'Math Worksheet 3', subject: 'Math', faculty: 'Prof. Smith' }]
  };

  const renderDetails = () => {
    if (!activeSquare) return null;
    const list = assignments[activeSquare];
    
    return (
      <div className="assignment-details glass-panel fade-in slide-up">
        <h3>{activeSquare.charAt(0).toUpperCase() + activeSquare.slice(1)} Assignments</h3>
        {list.length === 0 ? <p>No assignments found in this category.</p> : (
          <ul className="assignment-list">
            {list.map(a => (
              <li key={a.id} className="assignment-item">
                <div className="assignment-title">{a.title}</div>
                <div className="assignment-meta">Subject: {a.subject} • Faculty: {a.faculty}</div>
              </li>
            ))}
          </ul>
        )}
        <button className="btn-close" onClick={() => setActiveSquare(null)}>Close</button>
      </div>
    );
  };

  return (
    <div className="assignments-tab fade-in">
      <div className="tab-header">
        <h2>Assignments Tracker</h2>
        {hasMultipleDelayed && (
          <span className="flag risk-flag">⚠️ Multiple Delayed ({delayedCount})</span>
        )}
      </div>

      <div className="assignment-grid 2x2-grid slide-up">
        <div className="grid-square new" onClick={() => setActiveSquare('new')}>
          <h4>New Assignments</h4>
          <span className="count">{assignments.new.length}</span>
        </div>
        <div className="grid-square delayed" onClick={() => setActiveSquare('delayed')}>
          <h4>Delayed Assignments</h4>
          <span className="count">{assignments.delayed.length}</span>
        </div>
        <div className="grid-square pending" onClick={() => setActiveSquare('pending')}>
          <h4>Pending Assignments</h4>
          <span className="count">{assignments.pending.length}</span>
        </div>
        <div className="grid-square submitted" onClick={() => setActiveSquare('submitted')}>
          <h4>Submitted Assignments</h4>
          <span className="count">{assignments.submitted.length}</span>
        </div>
      </div>

      {renderDetails()}
    </div>
  );
};

export default AssignmentsTab;
