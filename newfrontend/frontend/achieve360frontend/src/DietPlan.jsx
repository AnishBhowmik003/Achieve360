import React, { useState } from 'react';

const DietPlan = ({ onBackToDashboard, email }) => {
  const [activityLevel, setActivityLevel] = useState('lightly active');
  const [weightGoal, setWeightGoal] = useState('gain');
  const [editableBackendOutput, setEditableBackendOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
        setEditableBackendOutput(data.res);
        setSubmitted(true);
      } else {
        console.error('Error generating diet plan.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setActivityLevel('lightly active');
    setWeightGoal('gain');
    setSubmitted(false);
    setEditableBackendOutput('');
  };

  return (
    <div>
    { submitted ? (
        <div>
        <h1>Script Output:</h1>
        <textarea
          value={editableBackendOutput}
          onChange={(e) => setEditableBackendOutput(e.target.value)}
          style={{ width: '100%', height: '300px', marginBottom: '10px' }} // Adjust size as needed
        />
        <div>
          <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
          <button onClick={resetForm} style={{ marginBottom: '10px' }}>Add New Plan</button>
        </div>
      </div>
    ) : (
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
      )}
    </div>
  );
};

export default DietPlan;