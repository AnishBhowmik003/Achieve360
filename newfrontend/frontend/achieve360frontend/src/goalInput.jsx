import React, { useState, useEffect } from 'react';

const GoalInput = ({ onBackToDashboard, email }) => {
  const [sport, setSport] = useState('');
  const [position, setPosition] = useState('');
  const [timeGoal, setTimeGoal] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [weightliftingStats, setWeightliftingStats] = useState({
    military_press: '',
    deadlift: '',
    benchpress: '',
    squat: ''
  });
  const [backendOutput, setBackendOutput] = useState('');
  const [editableBackendOutput, setEditableBackendOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sportOptions = ['Football', 'Basketball', 'Tennis', 'Running', 'Weightlifting'];
  const [positionOptions, setPositionOptions] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isWeightlifting, setIsWeightlifting] = useState(false);

  useEffect(() => {
    if (sport === "Running") {
      setPositionOptions(['5k', '10k', 'half-marathon', 'marathon']);
      setIsRunning(true);
      setIsWeightlifting(false);
    } else if (sport === "Weightlifting") {
      setPositionOptions([]);
      setIsRunning(false);
      setIsWeightlifting(true);
    } else {
      setPositionOptions(['Forward', 'Guard', 'Center']);
      setIsRunning(false);
      setIsWeightlifting(false);
    }
  }, [sport]);

  const generateWorkoutPlan = async (stats) => {
    try {
      const response = await fetch('http://localhost:6969/generatePlan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(stats)
      });
      const data = await response.json();
      if (response.ok) {
          return data;
      } else {
          console.error('Failed to generate workout plan:', data.message);
          throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const savePlan = async () => {
    try {
      const response = await fetch('http://localhost:6969/savePlan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'workout',
            email: email,
            plan: editableBackendOutput
          })
      });
      const data = await response.json();
      if (response.ok) {
          alert('Plan saved successfully.');
      } else {
          console.error('Failed to save workout plan:', data.message);
          throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleWeightliftingChange = (field, value) => {
    setWeightliftingStats(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isWeightlifting) {
      const weightliftingData = {
          military_press: weightliftingStats.military_press,
          deadlift: weightliftingStats.deadlift,
          benchpress: weightliftingStats.benchpress,
          squat: weightliftingStats.squat
      };

      try {
          const result = await generateWorkoutPlan(weightliftingData);
          setBackendOutput(result.message); 
          setEditableBackendOutput(result.plan); 
          setSubmitted(true);
      } catch (error) {
          console.error("Failed to generate workout plan:", error);
      }
    } else {
      const otherSportData = {
          sport: sport,
          position: position,
          email: email,
          goals: timeGoal,
          currentTime: currentTime
      };

      try {
          const response = await fetch('http://localhost:6969/addGoal', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(otherSportData)
          });
          const data = await response.json();
          if (response.ok) {
              setBackendOutput(data.message);
              setEditableBackendOutput(data.message);
              setSubmitted(true);
          } else {
              console.error('Error inputting goals:', data.message);
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  };

  const resetForm = () => {
    setSport('');
    setPosition('');
    setTimeGoal('');
    setCurrentTime('');
    setWeightliftingStats({ military_press: '', deadlift: '', benchpress: '', squat: '' });
    setSubmitted(false);
    setBackendOutput('');
    setEditableBackendOutput('');
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h1>Script Output:</h1>
          <textarea
            value={editableBackendOutput}
            onChange={(e) => setEditableBackendOutput(e.target.value)}
            style={{ width: '100%', height: '300px', marginBottom: '10px' }} // Adjusted for better layout
          />
          <div>
            <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
            <button onClick={savePlan} style={{ marginBottom: '10px' }}>Save Plan</button>
            <button onClick={resetForm} style={{ marginBottom: '10px' }}>Add New Goal</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Sport:
            <select value={sport} onChange={(e) => setSport(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select a sport</option>
              {sportOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <br />
          {isRunning && (
            <>
              <label>
                Position:
                <select value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginLeft: '5px' }}>
                  <option value="">Select a position</option>
                  {positionOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Goal Time (MM:SS):
                <input
                  type="text"
                  placeholder="MM:SS"
                  value={timeGoal}
                  onChange={(e) => setTimeGoal(e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
              <label>
                Current Time (MM:SS):
                <input
                  type="text"
                  placeholder="MM:SS"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
            </>
          )}
          {isWeightlifting && (
            <>
              <label>
                Military Press (lbs):
                <input
                  type="text"
                  placeholder="lbs"
                  value={weightliftingStats.military_press}
                  onChange={(e) => handleWeightliftingChange('military_press', e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
              <label>
                Deadlift (lbs):
                <input
                  type="text"
                  placeholder="lbs"
                  value={weightliftingStats.deadlift}
                  onChange={(e) => handleWeightliftingChange('deadlift', e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
              <label>
                Benchpress (lbs):
                <input
                  type="text"
                  placeholder="lbs"
                  value={weightliftingStats.benchpress}
                  onChange={(e) => handleWeightliftingChange('benchpress', e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
              <label>
                Squat (lbs):
                <input
                  type="text"
                  placeholder="lbs"
                  value={weightliftingStats.squat}
                  onChange={(e) => handleWeightliftingChange('squat', e.target.value)}
                  style={{ marginLeft: '5px' }}
                />
              </label>
              <br />
            </>
          )}
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
          <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </form>
      )}
    </div>
  );
};

export default GoalInput;
