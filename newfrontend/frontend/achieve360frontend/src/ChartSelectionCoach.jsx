import React from 'react';
import { useState } from 'react';

const ChartSelectionCoach = ({ onNavigate, users, setUser, clearUsers }) => {
  const [student, setStudent] = useState('');
  
  return (
        <form className="login-form" onSubmit={() => {setUser(student); onNavigate('progressChart'); clearUsers();}}>
        <select value={student} onChange={(e) => setStudent(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select a user</option>
              {users.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
        <button type="submit">Submit</button>
        </form>
  );
};

export default ChartSelectionCoach;
