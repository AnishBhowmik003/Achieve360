import React, { useState, useEffect } from 'react';

const GoalInput = ({ onBackToDashboard }) => {
    const [sport, setSport] = useState('');
    const [position, setPosition] = useState('');
    const [timeGoal, setTimeGoal] = useState(''); // For setting the goal time
    const [currentTime, setCurrentTime] = useState(''); // For inputting the current time

    const sportOptions = ['Football', 'Basketball', 'Tennis', 'Running'];
    const [positionOptions, setPositionOptions] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (sport === "Running") {
            setPositionOptions(['200m', '400m', '800m', '1500m', '5k', '10k']);
            setIsRunning(true);
        } else {
            setPositionOptions(['Forward', 'Guard', 'Center']);
            setIsRunning(false);
        }
    }, [sport]);

    const validateAndSetTime = (value, setter) => {
        // Basic format validation: HH:MM:SS
        if (/^(\d{1,2}):([0-5]?[0-9]):([0-5]?[0-9])$/.test(value) || value === '') {
            setter(value);
        } else {
            alert('Please enter a valid time in the format HH:MM:SS.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        try {
            const response = await fetch('/submitSportsGoals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sport,
                    position,
                    timeGoal,
                    currentTime, // @mezzy backend here
                }),
            });
            if (response.ok) {
                console.log('Goals added successfully.');
                onBackToDashboard(); // to dashboard :{)
            } else {
                console.error('Error inputting goals.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Sport:
                    <select value={sport} onChange={(e) => setSport(e.target.value)}>
                        <option value="">Select a sport</option>
                        {sportOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Position:
                    <select value={position} onChange={(e) => setPosition(e.target.value)}>
                        <option value="">Select a position</option>
                        {positionOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <br />
                {isRunning && (
                    <>
                        <label>
                            Goal Time (HH:MM:SS):
                            <input 
                                type="text" 
                                placeholder="HH:MM:SS"
                                value={timeGoal}
                                onChange={(e) => validateAndSetTime(e.target.value, setTimeGoal)}
                            />
                        </label>
                        <br />
                        <label>
                            Current Time (HH:MM:SS):
                            <input 
                                type="text" 
                                placeholder="HH:MM:SS"
                                value={currentTime}
                                onChange={(e) => validateAndSetTime(e.target.value, setCurrentTime)}
                            />
                        </label>
                    </>
                )}
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={onBackToDashboard} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        </div>
    );
};

export default GoalInput;
