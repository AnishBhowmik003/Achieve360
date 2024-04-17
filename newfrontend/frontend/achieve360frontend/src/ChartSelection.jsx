import React from 'react';
import { useState } from 'react';

const ChartSelection = ({ onNavigate }) => {
  
  return (
    <div>
      <h1>Progress Tracker</h1>
        <div>
          <button onClick={() => onNavigate('Workout Graph')}>Workout Graph</button>
          <button onClick={() => onNavigate('Diet Graph')}>Diet Graph</button>
          <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        </div>
    </div>
  );
};

export default ChartSelection;
