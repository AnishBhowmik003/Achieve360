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
  const [currentUser, setCurrentUser] = useState("");
  const [currentForm, setCurrentForm] = useState('login');
  const [userMetrics, setUserMetrics] = useState({
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
<<<<<<< HEAD
    setCurrentForm('dashboard');
=======
    setCurrentUser(userData.email);
    setCurrentForm('dashboard'); // Navigate to dashboard upon login
>>>>>>> d15c51b7a322a07c4063412409fa20d1b4b37f6e
  };

  const handleRegisterSuccess = (userData) => {
    setIsLoggedIn(true);
<<<<<<< HEAD
    setCurrentForm('dashboard');
=======
    setCurrentUser(userData.email);
    setCurrentForm('dashboard'); // Navigate to dashboard upon registration
>>>>>>> d15c51b7a322a07c4063412409fa20d1b4b37f6e
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
          console.log(currentUser);
          return <MetricsInputForm onSubmit={handleMetricsSubmission} onBackToDashboard={handleBackToDashboard} email={currentUser}/>;
        case 'sportInfo':
          return <SportInfoForm userMetrics={userMetrics} />;
<<<<<<< HEAD
        case 'messageForm':
          return <MessageForm onBackToDashboard={handleBackToDashboard} />;
=======
        case 'messageForm': // New case for rendering the MessageForm
          return <MessageForm onBackToDashboard={handleBackToDashboard} sender={currentUser} />;
>>>>>>> d15c51b7a322a07c4063412409fa20d1b4b37f6e
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
<<<<<<< HEAD
          setCurrentForm('login');
=======
          setCurrentUser("");
          setCurrentForm('login'); // Reset to login form upon logout
>>>>>>> d15c51b7a322a07c4063412409fa20d1b4b37f6e
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
