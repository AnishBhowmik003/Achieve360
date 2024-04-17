import React, { useState, useEffect } from 'react';



const ProPlayers = ({ onBackToDashboard, email }) => {
    const [sport, setSport] = useState('');
    const sportOptions = ['Football', 'Basketball', 'Baseball', 'Running'];
    const [submitted, setSubmitted] = useState(false);
    const [displayData, setDisplayData] = useState();
    const [tableHead, setTableHead] = useState();
    const[row, setRow] = useState(0);
    useEffect(() => {
      console.log(row);
    }, [row]);
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
            setDisplayData(data.res.map((info, idx) => {
              return (
                <tr key={idx} onClick={select.bind(e, idx)}>
                  {Object.values(info).map((value, index) => {
                    return (
                    <td key={index}> {typeof value == 'number' && !Number.isInteger(value) ? value.toFixed(3) : value}</td>
                    )
                  })}
                </tr>
              )
              // (
              //   <RowComponent info={info} onClick={showName} idx={idx}/>
              // )
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

      const select = (idx) => {
        var table = document.getElementById("table");
        if(row) {
          console.log('yes');
          var old = table.rows[row];
          old.classList.remove('selected');
        }
        else console.log(row);
        setRow(idx+1);
        var r = table.rows[idx+1];
        r.classList.contains('selected') ? r.classList.remove('selected') : r.classList.add('selected');
      }

    //   $("#table tr").on("click", function(){
    //     $(this).addClass('selected').siblings().removeClass('selected');    
    //     var value=$(this).find('td:first').html();
    //     alert(value);
    //  });
     
    //  $('.ok').on('click', function(e){
    //      alert($("#table tr.selected td:first").html());
    //  });


    return (
        <div>
        {submitted ? (
            <div>
              <h1>Script Output:</h1>
              <table id="table" className="styled-table">
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