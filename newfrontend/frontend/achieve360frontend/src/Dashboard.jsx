import React from 'react';

export const Dashboard = ({ onNavigate, type }) => {
  return (
    <div className="dashboard-container">
      {type == 'student' ? (<h1>User Dashboard</h1>) : (<h1>Coach Dashboard</h1>)}
      {type == 'student' ? (<button onClick={() => onNavigate('inputMetrics')}>Input Metrics</button>) : (<div></div>)}
      <button onClick={() => onNavigate('messageForm')}>Message Form</button>
      <button onClick={() => onNavigate('progress')}>Track/View Progress</button> {}
      {type == 'student' ? (<button onClick={() => onNavigate('goalInput')}>Add Goal</button>) : (<div></div>)}
      {type == 'student' ? (<button onClick={() => onNavigate('generateDietPlan')}>Generate Diet Plan</button>) : (<div></div>)}
      {type == 'student' ? (<button onClick={() => onNavigate('SelectProPlayers')}>Match to pro athlete</button>) : (<div></div>)}
      {type == 'student' ? (<button onClick={() => onNavigate('videos')}>Learn about exercises</button>) : (<div></div>)}
      {type == 'student' ? (<button onClick={() => onNavigate('coaches')}>Find coaches</button>) : (<div></div>)}
      <button onClick={() => onNavigate('workoutEntryOption')}>WorkoutEntryOption</button> {}

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
