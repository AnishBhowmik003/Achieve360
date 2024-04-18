
import React from 'react';

const SeeWorkouts = ({ onNavigate }) => {
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [array, setArray] = useState([]);
  const [email, setEmail] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:6969/getWorkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.res.map(a => a.username));
  }
}

const selectDate = async (e) => {
  e.preventDefault();
}

  return (
    <div className="see-workouts-container">
      <h1>Workout History</h1>
      <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default SeeWorkouts;



