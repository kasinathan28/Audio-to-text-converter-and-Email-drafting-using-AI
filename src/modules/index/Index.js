import React, { useState } from 'react';
import "./index.css";

// Images
import Avatar from "./assets/9440461.jpg";

function Index() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

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
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'message sent' : 'message received'}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
