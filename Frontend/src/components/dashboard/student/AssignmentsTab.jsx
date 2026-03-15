import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { API_BASE_URL } from '../../../config';

const AssignmentsTab = ({ studentId, notifications }) => {
  const [assignmentRecords, setAssignmentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSquare, setActiveSquare] = useState(null);

  const tabNotifications = notifications?.filter(n => n.type === 'submission_alert') || [];

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/records/student/${studentId}?type=assignment`);
        if (res.ok) {
          const data = await res.json();
          setAssignmentRecords(data);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [studentId]);

  // Derive categories from DB
  const delayedArr = assignmentRecords.filter(r => r.data.late_by !== null);
  const submittedArr = assignmentRecords.filter(r => r.data.marks !== null);
  const pendingArr = assignmentRecords.filter(r => r.data.marks === null && r.data.late_by === null);
  const newArr = []; // Could be based on timestamp < 2 days

  const assignments = {
    new: newArr,
    delayed: delayedArr.map(r => ({ id: r._id, title: r.subject, subject: r.subject, faculty: 'Prof. Unknown' })),
    pending: pendingArr.map(r => ({ id: r._id, title: r.subject, subject: r.subject, faculty: 'Prof. Unknown' })),
    submitted: submittedArr.map(r => ({ id: r._id, title: r.subject, subject: r.subject, faculty: 'Prof. Unknown' }))
  };

  const delayedCount = delayedArr.length;
  const hasMultipleDelayed = delayedCount > 1;

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

      {tabNotifications.length > 0 && (
        <div className="tab-notifications glass-panel slide-up">
          {tabNotifications.map(n => (
            <div key={n._id} className={`notif-item ${n.priority}`}>
              <strong>{n.title}</strong>: {n.message}
            </div>
          ))}
        </div>
      )}

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
