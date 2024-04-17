import React from 'react';

const Progress = ({ onNavigate, type, email, addUser }) => {

  const getStudents = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6969/findUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coach: email
        }),
      });
      const data = await response.json();
      if(response.ok) {
        console.log(data);
        for(var i = 0; i < data.res.length; i++) {
          console.log(data.res[i].user_email);
          addUser(data.res[i].user_email);
        }
      }
    }
    catch(err) {
      console.error(err);
    } 
    onNavigate('coachProgressChart');
  }
  return (
    <div>
      <h1>Progress Tracker</h1>
      <button onClick={type == 'student' ? () => onNavigate('progressChart') : getStudents}> View Progress Chart</button>
      {type == 'student' ? (<button onClick={() => onNavigate('progressInput')}>Input New Progress</button>) : (<div></div>)}
      <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
    </div>
  );
};

export default Progress;
