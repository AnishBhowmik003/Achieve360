import React, { useState } from 'react';

const ProgressInput = ({ onBackToDashboard, email }) => {
  const [inputType, setInputType] = useState('time'); // State to manage the input type
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      days: days,
      type: inputType === 'time' ? 'workout' : 'diet',
      value: inputType === 'time' ? time : calories,
    };

    try {
      const response = await fetch('http://localhost:6969/addProgress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Success:', data);
      } else {
        console.error('Error inputting progress.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    onBackToDashboard();
  };

  return (
    <div>
      <h2>Input Progress</h2>
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
          Type:
          <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="time">Time</option>
            <option value="calories">Calories</option>
          </select>
        </label>
        {inputType === 'time' && (
          <label>
            Time (HH:MM:SS):
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time as HH:MM:SS"
            />
          </label>
        )}
        {inputType === 'calories' && (
          <label>
            Calories:
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Enter daily caloric intake"
            />
          </label>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onBackToDashboard} style={{ marginTop: '10px' }}>Back to Dashboard</button>
    </div>
  );
};

export default ProgressInput;