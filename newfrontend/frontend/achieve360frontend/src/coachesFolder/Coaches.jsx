import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkoutPlanManager from './WorkoutPlanManager';
import DietPlanManager from './DietPlanManager';
import ProgressTracker from './ProgressTracker';

function Coaches() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/manage-workout">Manage Workout Plans</Link>
            </li>
            <li>
              <Link to="/manage-diet">Manage Diet Plans</Link>
            </li>
            <li>
              <Link to="/track-progress">Track Progress</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/manage-workout" element={<WorkoutPlanManager />} />
          <Route path="/manage-diet" element={<DietPlanManager />} />
          <Route path="/track-progress" element={<ProgressTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Coaches;
