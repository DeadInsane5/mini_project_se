import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

const CreateAccount = ({ onLoginClick }) => {
  const [accountType, setAccountType] = useState('Student');
  
  // Faculty specific
  const [facultyRole, setFacultyRole] = useState('Lecturer');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Map to User Schema
    const payload = {
      user_id: accountType === 'Student' ? data.studentId : data.email, // Using email as ID for faculty for now
      role: accountType.toLowerCase(),
      name: data.fullName,
      email: data.email,
      academic_info: {
        department: data.department,
        year: data.year,
        semester: data.semester ? parseInt(data.semester) : undefined,
        class: data.division
      },
      roll_no: data.rollNo ? parseInt(data.rollNo) : undefined
    };

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Account created successfully!');
        if (onLoginClick) onLoginClick();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="auth-form">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="scrollable-form" style={{ width: '100%' }}>
        
        <label>Account Type</label>
        <select 
          value={accountType} 
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
        </select>

        {accountType === 'Faculty' && (
          <>
            <label>Role</label>
            <select 
              value={facultyRole} 
              onChange={(e) => setFacultyRole(e.target.value)}
            >
              <option value="Lecturer">Lecturer</option>
              <option value="Incharge">Incharge</option>
            </select>
          </>
        )}

        <label>Full Name</label>
        <input type="text" name="fullName" placeholder="Aryan Kamble" required />

        <label>Email Address</label>
        <input type="email" name="email" placeholder="aryan@example.com" required />

        {accountType === 'Student' ? (
          <>
            <div className="form-row">
              <div>
                <label>Student ID</label>
                <input type="text" name="studentId" placeholder="e.g. 2024FHCO088" required />
              </div>
              <div>
                <label>Roll No.</label>
                <input type="text" name="rollNo" placeholder="e.g. 42" required />
              </div>
            </div>

            <label>Department</label>
            <input type="text" name="department" placeholder="e.g. Computer Engineering" required />

            <div className="form-row">
              <div>
                <label>Year</label>
                <select name="year" required>
                  <option value="">Select Year</option>
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>
              </div>
              <div>
                <label>Semester</label>
                <select name="semester" required>
                  <option value="">Select Sem</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div>
                <label>Division</label>
                <input type="text" name="division" placeholder="e.g. A" required />
              </div>
            </div>
          </>
        ) : (
          <>
            <label>Department</label>
            <input type="text" name="department" placeholder="e.g. Information Technology" required />

            <label>Year and Div</label>
            <span className="help-text">Can be multiple (e.g. SE A, TE B)</span>
            <input type="text" name="yearAndDiv" placeholder="e.g. SE A, TE B" required />

            <div className="form-row">
              <div>
                <label>Subject</label>
                <input type="text" name="subject" placeholder="e.g. DBMS" required />
              </div>
              <div>
                <label>Labs (If any)</label>
                <input type="text" name="labs" placeholder="e.g. L1, L2" />
              </div>
            </div>
          </>
        )}

        {/* Passwords moved to the end */}
        <label>Password</label>
        <input type="password" name="password" placeholder="Create a strong password" required />
        
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" placeholder="Confirm your password" required />

        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccount;
