import React, { useState, useEffect } from 'react';
const ProgressCheck = ({ onNavigate, email, type, addUser, clear, user }) => {
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
            onNavigate('coachProgressCheck');
          };
          if(type == 'coach') func();
    }, []);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);  // State to track if form has been submitted

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);  
        console.log('Selected date:', selectedDate);
        console.log('Selected type:', selectedType);
    }

    return (
        <div>
            {!isSubmitted ? (  
                <form onSubmit={handleSubmit}>
                    <label htmlFor="date">Choose a date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />

                    <label htmlFor="type">Choose a type:</label>
                    <select id="type" value={selectedType} onChange={handleTypeChange}>
                        <option value="">Select type</option>
                        <option value="diet">Diet</option>
                        <option value="workout">Workout</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p> Coach: {email}</p>
                    <p> User: {user}</p>
                    <p>Date Selected: {selectedDate}</p>
                    <p>Type Selected: {selectedType}</p>
                    <button onClick={() => setIsSubmitted(false)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default ProgressCheck;
