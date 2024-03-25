import React, { useState } from 'react';

const ProgressInput = ({ onBackToDashboard }) => {
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Time entered:", time);
        // Here, you would typically handle the submission, e.g., update state or send to an API
        onBackToDashboard();
    };

    return (
        <div>
            <h2>Input Progress Time</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Time (HH:MM:SS):
                    <input 
                        type="text" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        placeholder="Enter time as HH:MM:SS" 
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={onBackToDashboard} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        </div>
    );
};

export default ProgressInput;
