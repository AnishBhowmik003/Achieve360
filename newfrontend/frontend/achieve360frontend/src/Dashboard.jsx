import React from 'react';

export const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <button onClick={() => onNavigate('inputMetrics')}>Input Metrics</button>
      <button onClick={() => onNavigate('messageClients')}>Message Other Clients</button>
      <button onClick={() => onNavigate('viewPlans')}>View Current Plans</button>
      <button onClick={() => {/* Handle logout functionality here */}}>Logout</button>
      {/* Additional dashboard content goes here */}
    </div>
  );
};

