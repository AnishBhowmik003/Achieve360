import React from 'react';

export const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <button onClick={() => onNavigate('inputMetrics')}>Input Metrics</button>
      <button onClick={() => onNavigate('messageForm')}>Message Form</button>
      <button onClick={() => onNavigate('progress')}>Track/View Progress</button> {}
      <button onClick={() => onNavigate('goalInput')}>Add Goal</button>
      <button onClick={async () => {
        
        onNavigate('logout');
        try {
          const response = await fetch('http://localhost:6969/logout', {
            method: 'POST',
          });

          if (response.ok) {
            console.log('Logged out successfully');
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }}>Logout</button>
    </div>
  );
};
