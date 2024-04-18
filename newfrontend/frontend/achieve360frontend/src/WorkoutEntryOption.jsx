import React from 'react';

const WorkoutEntryOption = ({ onNavigate, type }) => {
    return (
        <div>
          {type == 'student' ? (<button onClick={() => onNavigate('EnterWorkout')}>Enter Workout </button>) : (<h1>Coach Dashboard</h1>)}
          <button onClick={() => onNavigate('SeeWorkouts')}>{type == 'student' ? 'View/edit Workouts' : 'View Workouts'}</button>
          <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        </div>
      );
};

export default WorkoutEntryOption;

