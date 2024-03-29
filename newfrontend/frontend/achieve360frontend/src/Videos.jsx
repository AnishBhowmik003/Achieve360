import React from 'react';
const Videos = ({ onNavigate }) => {
    return (
        <div>
            <button onClick={() => onNavigate('runningInfo')}>Running</button>
            <button onClick={() => onNavigate('benchInfo')}>Bench Press</button>
            <button onClick={() => onNavigate('squatInfo')}>Squats</button>
            <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
        </div>
    );
}
export default Videos;