// Create a React component that inputs a <textarea> message then performs a fetch request to
// localhost:1337, gets back a response as a data.message, and displays that message in a box
// below.

// Create a React component that inputs a <textarea> message then performs a fetch request to
// localhost:1337, gets back a response as a data.message, and displays that message in a box
// below.
import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:1337', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea value={message} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;