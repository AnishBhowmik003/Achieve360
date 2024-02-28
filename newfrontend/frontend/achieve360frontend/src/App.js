import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { MetricsInputForm } from './MetricsInputForm';
import { SportInfoForm } from './SportInfoForm';
import { Dashboard } from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');
  const [userMetrics, setUserMetrics] = useState({
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentForm('dashboard'); // Navigate to dashboard upon login
  };

  const handleRegisterSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentForm('dashboard'); // Navigate to dashboard upon registration
  };

  const handleMetricsSubmission = (metrics) => {
    setUserMetrics(metrics);
    setCurrentForm('dashboard'); // Navigate to dashboard after submitting metrics
  };

  const handleBackToDashboard = () => {
    setCurrentForm('dashboard'); // Function to navigate back to dashboard
  };

  const renderContent = () => {
    if (isLoggedIn) {
      switch (currentForm) {
        case 'dashboard':
          return <Dashboard userMetrics={userMetrics} onNavigate={setCurrentForm} />;
        case 'inputMetrics':
          // Pass the new function handleBackToDashboard to MetricsInputForm
          return <MetricsInputForm onSubmit={handleMetricsSubmission} onBackToDashboard={handleBackToDashboard} />;
        case 'sportInfo':
          return <SportInfoForm userMetrics={userMetrics} />;
        // Include additional cases for other forms or content as needed
        default:
          // Default to the dashboard if no other content is matched
          return <Dashboard userMetrics={userMetrics} onNavigate={setCurrentForm} />;
      }
    } else {
      switch (currentForm) {
        case "login":
          return <Login onFormSwitch={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
        case "register":
          return <Register onFormSwitch={setCurrentForm} onRegisterSuccess={handleRegisterSuccess} />;
        default:
          // Default to the login form if not logged in and no other form is specified
          return <Login onFormSwitch={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
      }
    }
  };

  return (
    <div className="App">
      { renderContent() }
    </div>
  );
}

export default App;
