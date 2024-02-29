import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { MetricsInputForm } from './MetricsInputForm';
import { SportInfoForm } from './SportInfoForm';
import { Dashboard } from './Dashboard';
import { MessageForm } from './MessageForm'; // Import the MessageForm component

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
          return <MetricsInputForm onSubmit={handleMetricsSubmission} onBackToDashboard={handleBackToDashboard} />;
        case 'sportInfo':
          return <SportInfoForm userMetrics={userMetrics} />;
        case 'messageForm': // New case for rendering the MessageForm
          return <MessageForm onBackToDashboard={handleBackToDashboard} />;
        case 'logout':
          setIsLoggedIn(false);
          setCurrentForm('login'); // Reset to login form upon logout
          break;
        // Include additional cases as necessary
        default:
          return <Dashboard userMetrics={userMetrics} onNavigate={setCurrentForm} />;
      }
    } else {
      switch (currentForm) {
        case "login":
          return <Login onFormSwitch={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
        case "register":
          return <Register onFormSwitch={setCurrentForm} onRegisterSuccess={handleRegisterSuccess} />;
        default:
          return <Login onFormSwitch={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
      }
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
