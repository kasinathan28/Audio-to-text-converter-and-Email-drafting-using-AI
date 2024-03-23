import React, { useState } from 'react';
import './auth.css';
import Login from './components/Login';
import Signup from './components/Signup';

function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <div className='authc'>
      <div className='left1'>
        <h1>The Dev-Hut.🧑‍💻</h1>
      </div>
      <div className='togglebtn'>
        <button onClick={handleToggle} >
          {showLogin ? 'Switch to Signup👉🏻' : 'Switch to Login👉🏻'}
        </button>
      </div>
      <div className='right1'>
        {showLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default Auth;
