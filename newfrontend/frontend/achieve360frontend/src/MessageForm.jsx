
import React, { useState } from 'react';
import axios from 'axios';


export const MessageForm = ({ onBackToDashboard }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {

    // Update the state
    setFile(e.target.files[0]);
}

  const upload = async (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object

    formData.append('file', file);

    // console.log(this.file);

    axios.post("http://localhost:6969/upload", formData, { headers: {}})
        .then((res) => {
            //console.log(res)
            if (res.status === 200)
              console.log('200');
        })
        .catch((error) => {
          console.log(error);
        })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      email: email,
      message: message
  };
  if(file) {
      postData.fileName = file.name;
      upload(e);
  }
  setTimeout(async () => {  
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
      alert('Error while sending message');
  }
    onBackToDashboard(); 
  }, 2000);
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

  <input type='file' name='uploadFile' onChange={handleFileChange}></input>
        {/* <button type='submit'>Upload</button> */}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={onBackToDashboard}>Back to Dashboard</button>
    </form>
  );
};
