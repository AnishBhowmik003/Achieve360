import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { MetricsInputForm } from './MetricsInputForm';
import { Dashboard } from './Dashboard';
import { MessageForm } from './MessageForm';
import { ProgressChart } from './ProgressChart';
import GoalInput from './goalInput'; // Import the GoalInput component
import Progress from './Progress';
import ProgressInput from './ProgressInput'; 
import ChartSelection from "./ChartSelection";
import DietPlan from "./DietPlan";
import ProPlayers from "./ProPlayers";
import Videos from "./Videos";
import Info from "./Info";
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
    setCurrentForm('dashboard');
    setCurrentUser(userData.email);
  };

  const handleRegisterSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData.email);
    setCurrentForm('dashboard'); // Navigate to dashboard upon registration
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
          return <MetricsInputForm onSubmit={handleMetricsSubmission} onBackToDashboard={handleBackToDashboard} email={currentUser}/>;

        case 'messageForm': // New case for rendering the MessageForm
          return <MessageForm onBackToDashboard={handleBackToDashboard} sender={currentUser} />;
        case 'graph':
          return <ProgressChart />;
        case 'goalInput':
          return <GoalInput onBackToDashboard={handleBackToDashboard} email={currentUser}/>;
        case 'progress':
          return <Progress onNavigate={setCurrentForm} />;
        case 'progressChart':
          return <ChartSelection onNavigate={setCurrentForm}/>
        case 'Workout Graph':
          return <ProgressChart onNavigate={setCurrentForm} email={currentUser} type='workout' />;
        case 'Diet Graph':
          return <ProgressChart onNavigate={setCurrentForm} email={currentUser} type='diet' />;
        case 'progressInput':
          return <ProgressInput onBackToDashboard={handleBackToDashboard} email={currentUser} />;
        case 'generateDietPlan':
          return <DietPlan onBackToDashboard={handleBackToDashboard} email={currentUser}/>
        case 'SelectProPlayers':
          return <ProPlayers onBackToDashboard={handleBackToDashboard} email={currentUser}/>
        case 'videos':
          return <Videos onNavigate={setCurrentForm}/>
        case 'runningInfo':
          return <Info onNavigate={setCurrentForm} type='running'/>;
        case 'benchInfo':
          return <Info onNavigate={setCurrentForm} type='bench press'/>;
        case 'squatInfo':
          return <Info onNavigate={setCurrentForm} type='squatting'/>;

        case 'logout':
          setIsLoggedIn(false);
          setCurrentUser("");
          setCurrentForm('login'); // Reset to login form upon logout
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
