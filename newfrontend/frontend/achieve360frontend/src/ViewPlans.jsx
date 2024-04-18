import React, { useState, useEffect } from 'react';

const ViewPlans = ({ onNavigate, email, type, addUser, clear}) => {
  useEffect(() => {
    // if(type == 'student') { 
    //   clear();
    //   return;
    // }
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

  return (
    <div>
      <p>{email}</p>
    </div>
  )
  
  
}
export default ViewPlans;