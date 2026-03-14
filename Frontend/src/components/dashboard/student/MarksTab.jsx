import React, { useState } from 'react';
import './StudentDashboard.css';

const MarksTab = () => {
  /*
   * DATA FETCHING COMMENT:
   * This component fetches IA marks and Term Work marks from the Node.js/MongoDB backend.
   * Example: 
   * fetch('/api/student/marks', { method: 'GET', headers: { Authorization: `Bearer ${token}` }})
   * .then(res => res.json())
   * .then(data => setMarksData(data));
   */
  
  const [subTab, setSubTab] = useState('ia');
  const marksStatus = 'risk'; // Dummy val: 'safe' or 'risk' based on backend threshold

  const iaMarks = [
    { subject: 'Math', ia1: 15, ia2: 12 },
    { subject: 'Science', ia1: 18, ia2: 16 },
    { subject: 'English', ia1: 10, ia2: 9 }, // Low marks simulate risk
  ];

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
