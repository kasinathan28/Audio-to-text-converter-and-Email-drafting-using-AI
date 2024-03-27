import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { BASE_URL } from '../../../services/baseURL';
import { useNavigate } from 'react-router-dom';
import Loading from 'react-loading'; // Import the loading component

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setLoading(true); // Set loading to true when login starts
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
    } finally {
      setLoading(false); // Set loading to false after login completes
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
          <button onClick={handleLogin} disabled={loading}>
            {loading ? <Loading type='spin' color='#fff' height={20} width={20} /> : 'Login'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;