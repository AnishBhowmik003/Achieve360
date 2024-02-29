
import React, { useState } from 'react';

export const MessageForm = ({ onBackToDashboard }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      email: email,
      message: message
  };
  try {
      const response = await fetch('http://localhost:6969/sendMessage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
      });

      await response.json();
      alert(`Message sent to ${email}: ${message}`);
      
  } catch (error) {
      console.error('Error:', error);
      alert('Error while logging in');
  }
    onBackToDashboard(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
  className="large-textbox"
></textarea>

      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={onBackToDashboard}>Back to Dashboard</button>
    </form>
  );
};
