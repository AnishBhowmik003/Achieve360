import React, { useState, useEffect } from 'react';

const GoalInput = ({ onBackToDashboard, email }) => {
  const [sport, setSport] = useState('');
  const [position, setPosition] = useState('');
  const [timeGoal, setTimeGoal] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [backendOutput, setBackendOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sportOptions = ['Football', 'Basketball', 'Tennis', 'Running'];
  const [positionOptions, setPositionOptions] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (sport === "Running") {
      setPositionOptions(['5k', '10k', 'half-marathon', 'marathon']);
      setIsRunning(true);
    } else {
      setPositionOptions(['Forward', 'Guard', 'Center']);
      setIsRunning(false);
    }
  }, [sport]);

  const validateAndSetTime = (value, setter) => {
    const partialTimeRegex = /^(\d{0,2}):?([0-5]?[0-9]?)$/;
    if (partialTimeRegex.test(value)) {
      setter(value);
    } else {
      alert('Please enter a valid time with any number of minutes and up to 59 seconds in the format MM:SS.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6969/addGoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sport: sport,
          position: position,
          goals: timeGoal,
          currentTime: currentTime,
          email: email
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setBackendOutput(data.message);
        setSubmitted(true);
      } else {
        console.error('Error inputting goals.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setBackendOutput('');
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h1>Script Output:</h1>
          <pre>{backendOutput}</pre>
          <button onClick={onBackToDashboard} style={{ margin: '10px' }}>Back to Dashboard</button>
          <button onClick={resetForm} style={{ margin: '10px' }}>Add New Goal</button>
        </div>
      ) : (
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
                Goal Time (MM:SS):
                <input
                  type="text"
                  placeholder="MM:SS"
                  value={timeGoal}
                  onChange={(e) => validateAndSetTime(e.target.value, setTimeGoal)}
                />
              </label>
              <br />
              <label>
                Current Time (MM:SS):
                <input
                  type="text"
                  placeholder="MM:SS"
                  value={currentTime}
                  onChange={(e) => validateAndSetTime(e.target.value, setCurrentTime)}
                />
              </label>
              <br />
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default GoalInput;