import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5003/api/authenticate', { code });
      
      if (response.data.authenticated) {
        
        setAuthenticated(true);
        <Link to="/timetable"></Link>
      } else {
        // Authentication failed
        alert('Invalid authentication code');
      }
    } catch (error) {
      console.error('Error authenticating:', error);
      alert('Error authenticating. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter authentication code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {authenticated && <p>Authenticated!</p>}
    </div>
  );
};

export default Login;
