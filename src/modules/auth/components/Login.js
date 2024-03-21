import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { BASE_URL } from '../../../services/baseURL';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    console.log(BASE_URL);
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      
      // Check if login was successful
      if (response.status === 200) {
        const { user } = response.data;
        navigate(`/index/${user._id}`);
      } else {
        // Handle other status codes if needed
        setErrorMessage('Login failed');
      }
    } catch (error) {
      // Handle network errors or other errors
      console.error('Error during login:', error);
      setErrorMessage('Error during login');
    }
  };  

  return (
    <div>
      <div className='loginc'>
        <h1>Login here</h1>
        <div className='cta'>
          <label>Username:</label>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <p>Don't have an account?<span>Signup</span></p>
      </div>
    </div>
  );
}

export default Login;
