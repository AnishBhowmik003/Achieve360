import React, { useState, useEffect, useMemo } from 'react';
const ListProgressChecks = ({ onBackToDashboard, email }) => {
    const [displayData, setDisplayData] = useState();
    const [tableHead, setTableHead] = useState();
    useMemo(() => {
        const get = async () => {
        try {
            const response = await fetch('http://localhost:6969/listProgressChecks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email
              }),
            });
            const data = await response.json();
            if(response.ok) {
                setDisplayData(data.res.map((info, idx) => {
                    return (
                      <tr key={idx}>
                        {Object.values(info).map((value, index) => {
                          return (
                          <td key={index}> {typeof value == 'number' && !Number.isInteger(value) ? value.toFixed(3) : value}</td>
                          )
                        })}
                      </tr>
                    )
                  }));
                  setTableHead((
                      <tr>
                        {Object.keys(data.res[0]).map((value, index) => {
                          return (
                          <th key={index}>{value}</th>
                          )
                        })}
                      </tr>
                    )
                  );
            }
          }
          catch(err) {
            console.error(err);
          } 
        };
        get();
    }, []);
    

    return (
        <div>
        <table id="table" className="styled-table">
                <thead>
                  {tableHead}
                </thead>
                <tbody>
                  {displayData}
                </tbody>
              </table>
        <button onClick={onBackToDashboard} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </div>

    );
}

export default ListProgressChecks;
