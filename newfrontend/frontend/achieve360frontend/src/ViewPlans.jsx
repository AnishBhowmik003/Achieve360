import React, { useState, useEffect } from 'react';

const ViewPlans = ({ onNavigate, email, type, addUser, clear}) => {
  useEffect(() => {
    const func = async() => {
        try {
          const response = await fetch('http://localhost:6969/findUsers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coach: email
            }),
          });
          const data = await response.json();
          if(response.ok) {
            console.log(data);
            for(var i = 0; i < data.res.length; i++) {
              console.log(data.res[i].user_email);
              addUser(data.res[i].user_email);
            }
          }
        }
        catch(err) {
          console.error(err);
        } 
        onNavigate('coachViewPlans');
      };
      if(type == 'coach') func();
  }, []);

  const [planType, setPlanType] = useState('');
  const [output, setOutput] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6969/getPlans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: planType
        }),
      });
      const data = await response.json();
      if(response.ok) {
        console.log(data);
        if(data.res.length == 0) {
          alert(`No ${planType} plans exist for this user`);
        }
        else {
          setOutput(data.res[0].plan);
        }
      }
    }
    catch(err) {
      console.error(err);
    }
  };

  const savePlan = async () => {
    try {
      const response = await fetch('http://localhost:6969/savePlan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: planType,
            email: email,
            plan: output
          })
      });
      const data = await response.json();
      if (response.ok) {
          alert('Plan saved successfully.');
      } else {
          console.error(`Failed to save ${planType} plan:`, data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  return (
    <div>
    {output ? (
      <div>
      <textarea
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        style={{ width: '100%', height: '300px', marginBottom: '10px' }} // Adjust size as needed
      />
      <div>
        <button onClick={() => onNavigate('dashboard')} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        <button onClick={savePlan} style={{ marginBottom: '10px' }}>Save Plan</button>
        <button onClick={() => setOutput('')} style={{ marginBottom: '10px' }}>Select different plan type</button>
      </div>
      </div>
    ) : (
      <form className="login-form" onSubmit={handleSubmit}>
        <select value={planType} onChange={(e) => setPlanType(e.target.value)} style={{ marginLeft: '5px' }}>
              <option value="">Select plan type</option>
              <option key={'workout'} value={'workout'}> workout plan </option>
              <option key={'diet'} value={'diet'}> diet plan </option>
            </select>
        <button type="submit">Submit</button>
        <button onClick={() => onNavigate('dashboard')} style={{ marginRight: '10px', marginBottom: '10px' }}>Back to Dashboard</button>
        </form>
      )}
    </div>
  );
}
export default ViewPlans;