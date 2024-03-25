import React from 'react';

const Progress = ({ onNavigate }) => {
  return (
    <div>
      <h1>Progress Tracker</h1>
      <button onClick={() => onNavigate('progressChart')}>View Progress Chart</button>
      <button onClick={() => onNavigate('progressInput')}>Input New Progress</button>
      <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
    </div>
  );
};

export default Progress;
