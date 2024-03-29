import React, { useState } from 'react';

const DietPlan = ({ onBackToDashboard, email }) => {
  const [activityLevel, setActivityLevel] = useState('lightly active');
  const [weightGoal, setWeightGoal] = useState('gain');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      weightGoal: weightGoal,
      activityLevel: activityLevel,
      email: email
    };

    try {
      const response = await fetch('http://localhost:6969/createDiet', {
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
        console.error('Error generating diet plan.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    onBackToDashboard();
  };

  return (
    <div>
      <h2>Generate Diet Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Weight Goal:
          <select value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)}>
            <option value="gain">Gain</option>
            <option value="loss">Loss</option>
            <option value="maintain">Maintain</option>
          </select>
        </label>
        <label>
          Activity Level:
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="lightly active">Lightly Active</option>
            <option value="moderatly active">Moderatly Active</option>
            <option value="very active">Very Active</option>
            <option value="extra active">Extra Active</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onBackToDashboard} style={{ marginTop: '10px' }}>Back to Dashboard</button>
    </div>
  );
};

export default DietPlan;