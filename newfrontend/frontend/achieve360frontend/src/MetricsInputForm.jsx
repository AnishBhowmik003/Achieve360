

import React, { useState } from 'react';

export const MetricsInputForm = ({ onBackToDashboard, email }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      age: age,
      weight: weight,
      height: height,
      gender: gender,
      email: email
    };
    console.log(userData);

    try {
      const response = await fetch('http://localhost:6969/submitMetrics', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });

      await response.json();

      if (response.ok) {
          alert('Metrics inputted successfully');
      } else {
          alert(`Error inputting metrics.`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="metrics-form-container">
      <h1 className="form-title">Input Your Metrics</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        // Validation logic before submitting
        if (age < 1 || age > 100) {
          alert("Age must be between 1 and 100.");
          return;
        }
        if (weight <= 0) {
          alert("Weight must be greater than 0.");
          return;
        }
        if (height <= 0) {
          alert("Height must be greater than 0.");
          return;
        }
        handleSubmit(e); // Proceed with the original handleSubmit function
      }}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
          name="age"
          min="1"
          max="100"
        />

<label htmlFor="weight">Weight (kg)</label>
<input
  type="number"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  id="weight"
  name="weight"
  min="0.01"
  step="any"
/>

<label htmlFor="height">Height (cm)</label>
<input
  type="number"
  value={height}
  onChange={(e) => setHeight(e.target.value)}
  id="height"
  name="height"
  min="0.01"
  step="any"
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
        <button type="button" onClick={onBackToDashboard}>Back To Dashboard</button>
      </form>
    </div>
  );

};

