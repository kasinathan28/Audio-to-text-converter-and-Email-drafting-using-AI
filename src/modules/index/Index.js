import React, { useState } from 'react';
import "./index.css";
import Avatar from "./assets/9440461.jpg";
import axios from 'axios';

function Index() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() !== '') {
      setLoading(true); // Show loading animation

      try {
        const response = await axios.post('http://localhost:5000/openAi', { prompt: message });
        if (response.status === 200) {
          const botResponse = response.data.botResponse;
          // Append both sent and bot's response messages to the message list
          setMessages([...messages, { text: message, sender: 'user' }, { text: botResponse, sender: 'bot' }]);
        } else {
          console.error('Failed to get bot response');
        }
      } catch (error) {
        console.error('Failed to get bot response:', error.message);
      } finally {
        setLoading(false); // Hide loading animation
      }
    }
    setMessage(''); // Clear input field after sending message
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
                <h3>👋 Kasinathan</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='chat'>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'message sent' : 'message received'}>
                {msg.text}
                {msg.sender === 'bot' && (
                  <button onClick={() => copyToClipboard(msg.text)}>Copy</button>
                )}
              </div>
            ))}
            {loading && (
              <div className='message sent'>Loading...</div>
            )}
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