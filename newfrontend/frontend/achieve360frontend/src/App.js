import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { MetricsInputForm } from './MetricsInputForm';
import { SportInfoForm } from './SportInfoForm'; // Import the new component

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [userMetrics, setUserMetrics] = useState({
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  // Update this function to handle the submission of user metrics
  const handleMetricsSubmission = (metrics) => {
    setUserMetrics(metrics);
    setCurrentForm('sportInfo'); // Navigate to sport info form after submitting metrics
  };

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <Login onFormSwitch={setCurrentForm}/>;
      case "register":
        return <Register onFormSwitch={setCurrentForm}/>;
      case "metrics":
        return <MetricsInputForm onSubmit={handleMetricsSubmission} />;
      case "sportInfo":
        return <SportInfoForm userMetrics={userMetrics} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      { renderForm() }
      {/* Add navigation buttons if needed */}
    </div>
  );
}

export default App;
