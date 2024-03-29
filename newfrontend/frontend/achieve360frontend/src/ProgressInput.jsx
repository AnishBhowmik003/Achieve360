import React, { useState } from 'react';

const ProgressInput = ({ onBackToDashboard, email }) => {
    const [time, setTime] = useState('');
    const [days, setDays] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Time entered:", time);
        try {
            const response = await fetch('http://localhost:6969/addProgress', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                days: days,
                time: time
              }),
            });
            const data = await response.json();
            if (response.ok) {
              console.log('success')
            } else {
              console.error('Error inputting goals.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        onBackToDashboard();
    };

    return (
        <div>
            <h2>Input Progress Time</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Days since plan started:
                    <input 
                        type="text" 
                        value={days} 
                        onChange={(e) => setDays(e.target.value)} 
                        placeholder="Enter number of days" 
                    />
                </label>
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
