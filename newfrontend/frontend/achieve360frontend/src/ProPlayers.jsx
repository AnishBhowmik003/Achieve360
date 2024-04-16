import React, { useState } from 'react';

const ProPlayers = ({ onBackToDashboard, email }) => {
    const [sport, setSport] = useState('');
    const sportOptions = ['Football', 'Basketball', 'Baseball', 'Running'];
    const [backendOutput, setBackendOutput] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:6969/getSimilarPlayers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sport: sport,
              email: email,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data.res);
            var str = "";
            for(var i = 0; i < data.res.length; i++) {
                str += JSON.stringify(data.res[i]) + "\n";
            }
            setBackendOutput(str);
            setSubmitted(true);
          } else {
            console.error('Error.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const resetForm = () => {
        setSport('');
        setSubmitted(false);
        setBackendOutput('');
      };

    return (
        <div>
        {submitted ? (
            <div>
              <h1>Script Output:</h1>
              <textarea readOnly
                value={backendOutput}
                // onChange={(e) => setBackendOutput(e.target.value)}
                style={{ width: '100%', height: '750px', marginBottom: '10px' }} // Adjust size as needed
              />
              <div>
                <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
                <button onClick={resetForm} style={{ marginBottom: '10px' }}>Select Different Sport</button>
              </div>
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
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
          <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </form>
        )}
        </div>
    );
}
export default ProPlayers;