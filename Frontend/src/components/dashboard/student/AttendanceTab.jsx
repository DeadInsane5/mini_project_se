import React, { useState } from 'react';
import './StudentDashboard.css';

const AttendanceTab = () => {
  /*
   * DATA FETCHING COMMENT:
   * This component will fetch attendance data from the Node.js/Express backend.
   * Example integration: 
   * fetch('/api/student/attendance', { method: 'GET', headers: { Authorization: `Bearer ${token}` }})
   * .then(res => res.json())
   * .then(data => setAttendanceData(data));
   */
  
  const currentYear = new Date().getFullYear(); // e.g. 2026
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // State to manage the currently selected month. Defaults to the current actual month.
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  
  // Dummy data
  const averageAttendance = 72; // Threshold constraint defined in backend (<75%)
  const dummyTimetable = ["Math - 9:00 AM", "Science - 10:00 AM", "History - 11:30 AM"];
  
  const getMonthIndex = (monthName) => months.indexOf(monthName);
  
  // Basic math to get days in month and start day for the grid
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month, year) => {
    let day = new Date(year, month, 1).getDay();
    // Adjust so Monday is 0, Sunday is 6
    return day === 0 ? 6 : day - 1;
  };

  // Safely fallback to January if selectedMonth isn't found
  const currentMonthIdx = Math.max(0, getMonthIndex(selectedMonth));
  const totalDays = daysInMonth(currentMonthIdx, currentYear);
  const startDay = startDayOfMonth(currentMonthIdx, currentYear);
  
  // Generate exact calendar days
  const calendarDays = [];
  // 1. empty slots for alignment
  for (let i = 0; i < startDay; i++) {
    calendarDays.push({ type: 'empty', id: `empty-${i}` });
  }
  // 2. actual days
  for (let i = 1; i <= totalDays; i++) {
    const dayOfWeek = (startDay + i - 1) % 7;
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Sat or Sun
    
    // Pseudo logic for demo 
    let status = 'present';
    if (isWeekend) status = 'off';
    else if (i % 6 === 0) status = 'absent';
    else if (i % 8 === 0) status = 'mix';

    calendarDays.push({
      type: 'day',
      id: `day-${i}`,
      day: i,
      status: status
    });
  }

  const [modalData, setModalData] = useState(null);

  const handleDayClick = (dayData) => {
    if (dayData.type === 'empty' || dayData.status === 'off') return;
    
    const missed = dayData.status === 'absent' ? ["Math - 9:00 AM", "History - 11:30 AM"] :
                   dayData.status === 'mix' ? ["Science - 10:00 AM"] : [];
                   
    setModalData({
      day: dayData.day,
      month: selectedMonth,
      status: dayData.status,
      missedLectures: missed
    });
  };

  return (
    <div className="attendance-tab fade-in">
      <div className="tab-header">
        <h2>Attendance</h2>
        {averageAttendance < 75 && (
          <span className="flag risk-flag">⚠️ Attendance Low ({averageAttendance}%)</span>
        )}
      </div>

      <div className="timetable-section glass-panel slide-up">
        <h3>Today's Timetable</h3>
        <p className="subtitle">Average Attendance: <strong>{averageAttendance}%</strong></p>
        <ul className="timetable-list">
          {dummyTimetable.map((tt, i) => (
            <li key={i}>{tt}</li>
          ))}
        </ul>
      </div>

      <div className="monthly-attendance-section glass-panel slide-up" style={{ animationDelay: '0.1s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Monthly Overview</h3>
          
          {/* Dropdown for Month Selection */}
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="" disabled>Select a month</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="months-list">
          {months.map(m => (
            <button 
              key={m} 
              className={`month-btn ${selectedMonth === m ? 'active' : ''}`}
              onClick={() => setSelectedMonth(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="calendar-container">
          <div className="days-of-week">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="days-grid-calendar">
            {calendarDays.map((d) => {
              if (d.type === 'empty') {
                return <div key={d.id} className="day-cell-empty"></div>;
              }
              return (
                <div 
                  key={d.id} 
                  className={`day-cell ${d.status}`} 
                  title={`${selectedMonth} ${d.day} - ${d.status}`}
                  onClick={() => handleDayClick(d)}
                >
                  <span className={`dot ${d.status}`}></span>
                  <span className="day-num">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="legend glass-container">
           <span className="legend-item"><span className="dot present"></span> Present</span>
           <span className="legend-item"><span className="dot absent"></span> Absent</span>
           <span className="legend-item"><span className="dot mix"></span> Partial/Mix</span>
           <span className="legend-item"><span className="dot off"></span> Off Day</span>
        </div>
      </div>

      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="btn-close" onClick={() => setModalData(null)}>×</button>
            <h3>{modalData.month} {modalData.day} Details</h3>
            <p><strong>Status:</strong> <span style={{textTransform: 'capitalize'}}>{modalData.status}</span></p>
            
            <div className="modal-body">
              {modalData.status === 'present' ? (
                <p>You attended all lectures on this day!</p>
              ) : (
                <>
                  <h4>Missed Lectures:</h4>
                  {modalData.missedLectures.length > 0 ? (
                    <ul className="timetable-list" style={{paddingLeft: '20px', marginTop: '10px'}}>
                      {modalData.missedLectures.map((lec, idx) => (
                        <li key={idx} style={{color: 'var(--danger-color)'}}>{lec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No lectures were scheduled, or data is missing.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTab;
