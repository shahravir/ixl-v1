import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation (you'll likely need more robust validation)
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Simulate a login request to your backend API
    fetch('https://httpstat.us/200/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Login successful, redirect to the subject page
          window.location.href = '/subjects'; // Assuming your subject page is at '/subjects'
        } else {
          // Login failed, display an error message
          response.json().then((data) => { // Parse error message from response body
            setError(data.error || 'Invalid username or password.');
          });
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="login-page">
      <h1>Welcome to IXL-Like App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  );
};

export default LoginPage;
