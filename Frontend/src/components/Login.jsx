import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

const Login = ({ onLogin }) => {
  const [accountType, setAccountType] = useState('Student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/${identifier}`);
      
      if (response.ok) {
        const user = await response.json();
        
        // Check if the account type matches the role in DB
        if (user.role.toLowerCase() === accountType.toLowerCase()) {
          if (onLogin) onLogin(accountType, user.user_id);
        } else {
          alert(`Account found, but it is not registered as ${accountType}`);
        }
      } else {
        alert('User not found. Please create an account.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="auth-form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <label>Account Type</label>
        <select 
          value={accountType} 
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Division Incharge">Division Incharge</option>
        </select>

        {accountType === 'Student' ? (
          <>
            <label>Student ID / Email</label>
            <input 
              type="text" 
              placeholder="e.g. 2024FHCO081 or student@example.com" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required 
            />
          </>
        ) : (
          <>
            <label>Email / Username</label>
            <input 
              type="text" 
              placeholder={`Enter your ${accountType.toLowerCase()} email`}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required 
            />
          </>
        )}

        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <button type="submit" className="btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
