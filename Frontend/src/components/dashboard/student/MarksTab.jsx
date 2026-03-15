import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { API_BASE_URL } from '../../../config';

const MarksTab = ({ studentId, notifications }) => {
  const [marksRecords, setMarksRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState('ia');

  // Filter tab-specific notifications
  const tabNotifications = notifications?.filter(n => n.type === 'academic_alert') || [];

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/records/student/${studentId}?type=IA`);
        if (res.ok) {
          const data = await res.json();
          setMarksRecords(data);
        }
      } catch (error) {
        console.error("Error fetching marks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, [studentId]);

  // Group IA records by subject
  const iaMarksGrouped = marksRecords.reduce((acc, rec) => {
    if (!acc[rec.subject]) acc[rec.subject] = { ia1: '-', ia2: '-' };
    // Assuming we can differentiate IA1/IA2 by some field, but current schema doesn't have it.
    // For now, let's just use the timestamp or first vs second found.
    if (acc[rec.subject].ia1 === '-') acc[rec.subject].ia1 = rec.data.marks;
    else acc[rec.subject].ia2 = rec.data.marks;
    return acc;
  }, {});

  const iaMarks = Object.keys(iaMarksGrouped).map(subj => ({
    subject: subj,
    ...iaMarksGrouped[subj]
  }));

  const marksStatus = marksRecords.some(r => r.data.marks < 16) ? 'risk' : 'safe';

  const twMarks = [
    { subject: 'Math', marks: 22 },
    { subject: 'Science', marks: 24 },
    { subject: 'English', marks: 19 },
  ];

  return (
    <div className="marks-tab fade-in">
      <div className="tab-header">
        <h2>Marks Overview</h2>
        {marksStatus === 'risk' && <span className="flag risk-flag">⚠️ Marks Warning</span>}
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

      <div className="marks-sub-tabs fade-in">
        <button 
          className={`sub-tab-btn ${subTab === 'ia' ? 'active' : ''}`} 
          onClick={() => setSubTab('ia')}
        >
          IA Marks
        </button>
        <button 
          className={`sub-tab-btn ${subTab === 'tw' ? 'active' : ''}`} 
          onClick={() => setSubTab('tw')}
        >
          Term Work Marks
        </button>
      </div>

      <div className="marks-content glass-panel slide-up">
        <div className="tab-header-small">
          <h3>{subTab === 'ia' ? 'Internal Assessment (IA)' : 'Term Work'}</h3>
          {/* We show safe/risk here as well based on specific sub-tab data */}
          {marksStatus === 'risk' ? (
             <span className="flag risk-flag small-flag">⚠️ Risk</span>
          ) : (
             <span className="flag safe-flag small-flag">✅ Safe</span>
          )}
        </div>
        
        {subTab === 'ia' ? (
          <div className="marks-grid">
            <div className="grid-header">Subject</div>
            <div className="grid-header">IA 1</div>
            <div className="grid-header">IA 2</div>
            {iaMarks.map((m, i) => (
              <React.Fragment key={i}>
                <div className="grid-cell subject-name">{m.subject}</div>
                <div className="grid-cell">{m.ia1} / 20</div>
                <div className="grid-cell">{m.ia2} / 20</div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="marks-grid tw-grid fade-in">
            <div className="grid-header">Subject</div>
            <div className="grid-header">Marks</div>
            {twMarks.map((m, i) => (
              <React.Fragment key={i}>
                <div className="grid-cell subject-name">{m.subject}</div>
                <div className="grid-cell">{m.marks} / 25</div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksTab;
