import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../services/baseURL';
import Loading from 'react-loading'; // Import the loading component

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSignup = async () => {
    setLoading(true); // Set loading to true when signup starts
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        username,
        phoneNumber,
        password,
      });
      
      // Check if signup was successful
      if (response.status === 200) {
        navigate('/');
      } else {
        // Handle other status codes if needed
        setErrorMessage('Signup failed');
      }
    } catch (error) {
      // Handle network errors or other errors
      console.error('Error during signup:', error);
      setErrorMessage('Error during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='loginc'>
        <h1>Signup here</h1>
        <div className='cta'>
          <label>Username:</label>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Phone Number:</label>
          <input type='text' placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <label>Password:</label>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignup} disabled={loading}> 
            {loading ? <Loading type='spin' color='#fff' height={20} width={20} /> : 'Signup'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        {/* <p>Already have an account? <span>Login</span></p> */}
      </div>
    </div>
  );
}

export default Signup;
