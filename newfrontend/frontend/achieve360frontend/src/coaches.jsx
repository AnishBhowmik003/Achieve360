import React, { useState, useEffect } from 'react';

const Coaches = ({ onBackToDashboard, user }) => {
  const [sport, setSport] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [arr, setArr] = useState([]);
  const[emails, setEmails] = useState([]);
  const[coach, setCoach] = useState('');
  const sportOptions = ['Football', 'Basketball', 'Baseball', 'Running'];
  useEffect(() => {
    console.log(arr);
  }, [arr]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6969/findCoaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sport: sport,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.res.map(a => a.username));
        setArr(data.res.map(a => a.username));
        setEmails(data.res.map(a => a.email));
        setSubmitted(true);
      } else {
        console.error('Error finding coach.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setSport('');
    setSubmitted(false);
  };

  const selectUser = async (e) => {
    e.preventDefault();
    const idx = arr.indexOf(coach);
    try {
    const response = await fetch('http://localhost:6969/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          coach: emails[idx]
        }),
      });
      const data = await response.json();
      if(response.ok) {
        console.log(data);
        alert(data.message);
      }
    }
    catch(error) {
        console.error(error);
    }
  };

  return (
    <div>
        {submitted ? (
            <div>
                {/* <ol>
          {arr.map((item) => (
            <li>
              <label htmlFor={`${item.key}-input`}>{item.name}</label>{" "}
              <button onClick={selectUser(item.key)}>Select</button>
            </li>
          ))}
        </ol> */}
                {/* <p>
                    {arr[0]}
                </p> */}
                
        <form onSubmit={selectUser}>
          <label>
            Select a coach:
            <select value={coach} onChange={(e) => setCoach(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select a coach</option>
              {arr.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
          <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
          <button onClick={resetForm} style={{ marginBottom: '10px' }}>Select Different Sport</button>
        </form>
            </div>
             ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Sport:
            <select value={sport} onChange={(e) => setSport(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select a sport</option>
              {sportOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
          <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </form>
        )}
    </div>
  );
  
};

export default Coaches;



