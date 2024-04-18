
import React, { useState, useEffect } from 'react';
const SeeWorkouts = ({ onNavigate, email }) => {
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [array, setArray] = useState([]);
  const [types, setTypes] = useState([]);
  const [durations, setDurations] = useState([]);
  const [intensities, setIntensities] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [description, setDescription] = useState('');
useEffect( () => {
  const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:6969/getWorkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // console.log(data.res.map(a => a.time));
      console.log(data.res);
      setArray(data.res.map(a => a.time));
      setTypes(data.res.map(a => a.type));
      setDurations(data.res.map(a => a.duration));
      setIntensities(data.res.map(a => a.intensity));
      setDescriptions(data.res.map(a => a.description));
      console.log(data.res);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
handleSubmit();
}, []);

const submit = async (e) => {
  e.preventDefault();
  // setIdx(array.indexOf(time));
  try {
    console.log(email, time, workoutType, duration, intensity, description);
    const response = await fetch('http://localhost:6969/editWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        time: time,
        type: workoutType, 
        duration: duration,
        intensity: intensity,
        description: description,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('successfully updated');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const setVars = (val) => {
  setTime(val);
  setIdx(array.indexOf(val));
  setWorkoutType(types[array.indexOf(val)]);
  setDuration(durations[array.indexOf(val)]);
  setIntensity(intensities[array.indexOf(val)]);
  setDescription(descriptions[array.indexOf(val)]);
}


  return (
    <div>
      {
        submitted ? (
          <div>
              <form onSubmit={submit}>
                <div>
                    <label htmlFor="workoutType">Workout Type:</label>
                    <select id="workoutType" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                        <option value="">Select Workout Type</option>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="running">Running</option>
                        <option value="weightlifting">Weightlifting</option>
                        <option value="baseball">Baseball</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} min="0" />
                </div>
                <div>
                    <label htmlFor="intensity">Intensity:</label>
                    <select id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                        <option value="">Select Intensity</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" cols="50" />
                </div>
                <button type="submit">Submit</button>
                <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
            </form>






          </div>
        )
      : (
    <div className="see-workouts-container">
      <h1>Select Wokrout Entry</h1>
      <form onSubmit={() => {setSubmitted(true); console.log(descriptions[0])}}>
          <label>
            Select a entry to edit:
            <select value={time} onChange={(e) => {setVars(e.target.value)}} style={{ marginLeft: '5px' }}>
              <option value="">Select a time</option>
              {array.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        </form>
      <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
    </div>)}
    </div>
  );
};

export default SeeWorkouts;



