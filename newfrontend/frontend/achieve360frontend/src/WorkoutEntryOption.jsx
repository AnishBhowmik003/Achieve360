import React from 'react';

const WorkoutEntryOption = ({ onNavigate }) => {
    return (
        <div>
          <button onClick={() => onNavigate('EnterWorkout')}>Enter Workout </button>
          <button onClick={() => onNavigate('SeeWorkouts')}>See Workouts</button>
          <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        </div>
      );
};

export default WorkoutEntryOption;

