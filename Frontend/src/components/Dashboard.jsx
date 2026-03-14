import './Dashboard.css';

function Dashboard() {
  return (
    <main className="dashboard">
      <h2 className="dashboard__heading">Quick Access</h2>

      <div className="dashboard__cards">
        {/* Attendance Card */}
        <div className="dashboard__card" role="button" tabIndex={0}>
          <div className="dashboard__card-icon dashboard__card-icon--attendance">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M9 16l2 2 4-4" />
            </svg>
          </div>
          <div className="dashboard__card-text">
            <span className="dashboard__card-title">Attendance</span>
            <span className="dashboard__card-description">
              Track your daily lecture attendance
            </span>
          </div>
          <div className="dashboard__card-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Assignments Card */}
        <div className="dashboard__card" role="button" tabIndex={0}>
          <div className="dashboard__card-icon dashboard__card-icon--assignments">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="dashboard__card-text">
            <span className="dashboard__card-title">Assignments</span>
            <span className="dashboard__card-description">
              Manage submissions and deadlines
            </span>
          </div>
          <div className="dashboard__card-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Internal Marks Card */}
        <div className="dashboard__card" role="button" tabIndex={0}>
          <div className="dashboard__card-icon dashboard__card-icon--marks">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="dashboard__card-text">
            <span className="dashboard__card-title">Internal Marks</span>
            <span className="dashboard__card-description">
              View test scores and performance trends
            </span>
          </div>
          <div className="dashboard__card-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
