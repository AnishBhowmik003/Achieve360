import React, { useState } from 'react';

const EnterWorkout = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(payload);
        //  sending it to a backend put function here.
        try {
            const response = await fetch('http://localhost:6969/addWorkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                workoutType,
                duration,
                intensity,
                description,
              }),
            });
            const data = await response.json();
            if (response.ok) {
              console.log("Success!");
            } else {
              console.error('Error.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
            </form>
            <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '10px' }}>
                Back to Dashboard
            </button>
        </>
    );
};

export default EnterWorkout;
