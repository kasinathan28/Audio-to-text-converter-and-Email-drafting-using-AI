import React from 'react';
import "./index.css";

// Images
import Avatar from "./assets/9440461.jpg";

function Index() {
  return (
    <div className='container'>
      <div className='main'>
        <div className='left'>
          <div className='list'>
            <h1>Dev-HUT 🧑‍💻</h1>
          </div>
          <div className='list2'>
            <div className='user'>
              <img src={Avatar} alt="User Avatar" className="avatar" />
              <div className="user-details">
                <h3>👋Kasinathan</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='chat'>
            
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;