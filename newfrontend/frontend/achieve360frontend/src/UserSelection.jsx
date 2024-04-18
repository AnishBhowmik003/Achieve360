import React from 'react';
import { useState } from 'react';

const UserSelection = ({ onNavigate, users, setUser, clearUsers, next }) => {
  console.log(users);
  const [student, setStudent] = useState('');
  users = [...new Set(users)];
  return (
        <form className="login-form" onSubmit={() => {setUser(student); clearUsers(); onNavigate(next);}}>
        <select value={student} onChange={(e) => setStudent(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select a user</option>
              {users.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
        <button type="submit">Submit</button>
        <button onClick={() => onNavigate('dashboard')} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </form>
  );
};

export default UserSelection;
