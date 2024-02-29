
import React, { useState } from 'react';

export const MessageForm = ({ onBackToDashboard }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent to ${email}: ${message}`);
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
