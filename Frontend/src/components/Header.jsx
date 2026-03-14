import './Header.css';

function Header() {
  return (
    <header className="header">
      {/* Brand / Logo */}
      <div className="header__brand">
        <svg
          className="header__logo-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
          />
        </svg>
        <span className="header__title">AcadPulse</span>
      </div>

      {/* Right-side Controls */}
      <div className="header__controls">
        {/* Notification Bell */}
        <button className="header__notification-btn" aria-label="Notifications">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="header__notification-badge"></span>
        </button>

        {/* Login Button */}
        <button className="header__login-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;
