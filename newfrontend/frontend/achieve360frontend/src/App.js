import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { MetricsInputForm } from './MetricsInputForm';
import { SportInfoForm } from './SportInfoForm';
import { Dashboard } from './Dashboard';
import { MessageForm } from './MessageForm';
import { ProgressChart } from './ProgressChart';
import GoalInput from './goalInput'; // Import the GoalInput component
import Progress from './Progress';
import ProgressInput from './ProgressInput'; 
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
    setCurrentForm('dashboard');
  };

  const handleRegisterSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentForm('dashboard');
  };

  const handleMetricsSubmission = (metrics) => {
    setUserMetrics(metrics);
    setCurrentForm('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentForm('dashboard');
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
        case 'messageForm':
          return <MessageForm onBackToDashboard={handleBackToDashboard} />;
        case 'graph':
          return <ProgressChart />;
        case 'goalInput':
          return <GoalInput onBackToDashboard={handleBackToDashboard} />;
        case 'progress':
          return <Progress onNavigate={setCurrentForm} />;
          case 'progressChart':
            return <ProgressChart onNavigate={setCurrentForm} />;
          
        case 'progressInput':
          return <ProgressInput onBackToDashboard={handleBackToDashboard} />;

        case 'logout':
          setIsLoggedIn(false);
          setCurrentForm('login');
          break;
        default:
          return <Dashboard userMetrics={userMetrics} onNavigate={setCurrentForm} />;
      }
    } else {
      switch (currentForm) {
        case 'login':
          return <Login onFormSwitch={setCurrentForm} onLoginSuccess={handleLoginSuccess} />;
        case 'register':
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
