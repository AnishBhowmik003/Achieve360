import React, { useState } from 'react';

function ProgressCheck() {
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
                    <p>Date Selected: {selectedDate}</p>
                    <p>Type Selected: {selectedType}</p>
                    <button onClick={() => setIsSubmitted(false)}>Edit</button>  // Button to allow editing again
                </div>
            )}
        </div>
    );
}

export default ProgressCheck;
