
import React from 'react';

const SeeWorkouts = ({ onNavigate }) => {
  return (
    <div className="see-workouts-container">
      <h1>Workout History</h1>
      <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default SeeWorkouts;



