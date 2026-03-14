import React, { useState } from 'react';
import './AuthContainer.css';
import Login from './Login';
import CreateAccount from './CreateAccount';

const AuthContainer = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-page">
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
        
        {/* Sign Up Form Container */}
        <div className="form-container sign-up-container">
          <CreateAccount onLoginClick={() => setIsSignUp(false)} />
        </div>

        {/* Sign In Form Container */}
        <div className="form-container sign-in-container">
          <Login onLogin={(accountType, identifier) => onLogin(accountType, identifier)} onSignUpClick={() => setIsSignUp(true)} />
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Left Overlay (shown when isSignUp is true) */}
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>Already have an account? Log in to access your dashboard.</p>
              <button className="ghost-btn" onClick={() => setIsSignUp(false)}>
                Go to Login
              </button>
            </div>

            {/* Right Overlay (shown when isSignUp is false) */}
            <div className="overlay-panel overlay-right">
              <h2>Hello, Learner!</h2>
              <p>Don't have an account? Join us to start your journey.</p>
              <button className="ghost-btn" onClick={() => setIsSignUp(true)}>
                Create Account
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
