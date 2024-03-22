import React from 'react';

export const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <button onClick={() => onNavigate('inputMetrics')}>Input Metrics</button>
      <button onClick={() => onNavigate('viewPlans')}>View Current Plans</button>
      <button onClick={() => onNavigate('messageForm')}>Message Form</button> {/* Added this line */}
      <button onClick={async () => {
        onNavigate('logout');
        try {
          const response = await fetch('http://localhost:6969/logout', {
            method: 'POST',
          });

          await response.json();
        } catch (error) {
          console.error('Error:', error);
          alert('Error logging out');
        }
      }}>Logout</button>
      <button onClick={() => onNavigate('graph')}>View Progress</button>
      {/* Additional dashboard content goes here */}
    </div>
  );
};
