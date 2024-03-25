import React, { useState } from 'react';

const SportGoalsSettingForm = ({ onBackToDashboard }) => {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [goals, setGoals] = useState('');

  // This function would handle the change of the sport selection
  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
    // Would also fetch and display position-related information here
  };

  // This function would handle the change of the position selection
  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
    // Would also fetch and display sport-related information here
  };

  // This function would handle setting the goals
  const handleGoalsChange = (event) => {
    setGoals(event.target.value);
  };

  // This function would handle the submission of the goals
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the goals to the backend
    console.log('Goals submitted:', selectedSport, selectedPosition, goals);
    onBackToDashboard();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Sport:
        <select value={selectedSport} onChange={handleSportChange}>
          {/* Options would be generated based on available sports */}
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          {/* etc. */}
        </select>
      </label>

      <label>
        Select Position:
        <select value={selectedPosition} onChange={handlePositionChange}>
          {/* Options would be generated based on the selected sport */}
          <option value="forward">Forward</option>
          <option value="defense">Defense</option>
          {/* etc. */}
        </select>
      </label>

      <label>
        Set Your Goals:
        <textarea value={goals} onChange={handleGoalsChange} />
      </label>

      <button type="submit">Submit Goals</button>
      <button type="button" onClick={onBackToDashboard}>Back to Dashboard</button>
    </form>
  );
};

export default SportGoalsSettingForm;
