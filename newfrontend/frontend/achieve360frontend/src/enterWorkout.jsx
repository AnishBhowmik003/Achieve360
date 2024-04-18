import React, { useState } from 'react';

const EnterWorkout = ({ onNavigate }) => {
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            workoutType,
            duration,
            intensity,
            description,
        };
        console.log(payload);
        //  sending it to a backend put function here.
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
