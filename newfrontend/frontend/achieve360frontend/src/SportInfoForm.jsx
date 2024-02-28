import React, { useState } from 'react';

export const SportInfoForm = ({ userMetrics }) => {
  const [selectedSport, setSelectedSport] = useState('');
  const [goals, setGoals] = useState('');

  const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const handleGoalsChange = (e) => {
    setGoals(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission of the sport and goals, possibly updating the user's profile
    console.log({ selectedSport, goals });
  };

  return (
    <div className="sport-info-form-container">
      <h1>Enter Your Sport and Goals</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sport">Choose your sport:</label>
        <select id="sport" value={selectedSport} onChange={handleSportChange}>
          <option value="">Select a sport...</option>
          <option value="weightlifting">Weightlifting</option>
          <option value="basketball">Basketball</option>
          <option value="football">Football</option>
        </select>

        <label htmlFor="goals">Your Goals:</label>
        <textarea 
          id="goals" 
          value={goals} 
          onChange={handleGoalsChange} 
          placeholder="Enter your goals here..."
        />

        <button type="submit">Submit</button>
      </form>

      <div className="user-stats">
        <h2>Your Statistics:</h2>
        <p>Age: {userMetrics.age}</p>
        <p>Weight: {userMetrics.weight} kg</p>
        <p>Height: {userMetrics.height} cm</p>
        <p>Gender: {userMetrics.gender}</p>
      </div>
    </div>
  );
};
