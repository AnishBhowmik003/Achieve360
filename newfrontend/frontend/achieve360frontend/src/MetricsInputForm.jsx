import React, { useState } from 'react';

export const MetricsInputForm = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      age,
      weight,
      height,
      gender,
    };
    // Here you would handle the submission of the metrics, e.g., sending it to a backend server
    console.log(userData);
  };

  return (
    <div className="metrics-form-container">
      <h1 className="form-title">Input Your Metrics</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
          name="age"
        />

        <label htmlFor="weight">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          id="weight"
          name="weight"
        />

        <label htmlFor="height">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          id="height"
          name="height"
        />

        <label htmlFor="gender">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          id="gender"
          name="gender"
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
