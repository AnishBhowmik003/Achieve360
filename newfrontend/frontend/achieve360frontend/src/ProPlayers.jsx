import React, { useState, useEffect } from 'react';

const ProPlayers = ({ onBackToDashboard, email }) => {
    const [sport, setSport] = useState('');
    const sportOptions = ['Football', 'Basketball', 'Baseball', 'Running'];
    const [submitted, setSubmitted] = useState(false);
    const [displayData, setDisplayData] = useState();
    const [tableHead, setTableHead] = useState();
    useEffect(() => {
      console.log(tableHead);
   }, [tableHead]);
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
            setDisplayData(data.res.map((info) => {
              return (
                <tr>
                  {Object.keys(info).map((value) => {
                    return (
                    <td> {typeof info[value] == 'number' && !Number.isInteger(info[value]) ? info[value].toFixed(3) : info[value]}</td>
                    )
                  })}
                </tr>
              )
            }));
            setTableHead((
                <tr>
                  {Object.keys(data.res[0]).map((value) => {
                    return (
                    <th>{value}</th>
                    )
                  })}
                </tr>
              )
            );
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
        setDisplayData();
        setTableHead();
      };

    return (
        <div>
        {submitted ? (
            <div>
              <h1>Script Output:</h1>
              <table className="styled-table">
                <thead>
                  {tableHead}
                </thead>
                <tbody>
                  {displayData}
                </tbody>
              </table>
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