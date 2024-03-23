import React, { useEffect, useState } from "react";
import "./index.css";
import Avatar from "./assets/9440461.jpg";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import Speak from "../speak/Speak";
import DraftEmail from "../email/DraftEmail";

function Index() {
  const { userid } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [selectedOption, setSelectedOption] = useState("chat");
  const navigate = useNavigate();

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userid}`);
        if (response.status === 200) {
          setUsername(response.data);
        }
      } catch (error) {
        console.log("User info cant fetch");
      }
    };
    UserInfo();
  }, [userid]);

  const logout = () => {
    navigate("/");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setLoading(true);

      try {
        const response = await axios.post(`${BASE_URL}/openAi`, {
          prompt: message,
        });
        if (response.status === 200) {
          const botResponse = response.data.botResponse;
          setMessages([
            ...messages,
            { text: message, sender: "user" },
            { text: botResponse, sender: "bot" },
          ]);
        } else {
          console.error("Failed to get bot response");
        }
      } catch (error) {
        console.error("Failed to get bot response:", error.message);
      } finally {
        setLoading(false);
      }
    }
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container">
      <div className="main">
        <div className="left">
          <div className="list">
            <h1>Dev-HUT 🧑‍💻</h1>
          </div>
          <div className="list2">
            <div className="user">
              <img src={Avatar} alt="User Avatar" className="avatar" />
              <div className="user-details">
                <h3>👋{username}</h3>
              </div>
            </div>
          </div>
          <div className="opt">
            <ul>
              <li
                className={selectedOption === "chat" ? "active" : ""}
                onClick={() => handleOptionSelect("chat")}
              >
                Chat
              </li>
              <li
                className={selectedOption === "translate" ? "active" : ""}
                onClick={() => handleOptionSelect("translate")}
              >
                Translate
              </li>
              <li
                className={selectedOption === "email" ? "active" : ""}
                onClick={() => handleOptionSelect("email")}
              >
                Draft Email
              </li>
            </ul>
          </div>
          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="right">
          {selectedOption === "chat" && (
            <div className="chat-container">
              <div className="chat">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user"
                        ? "message sent"
                        : "message received"
                    }
                  >
                    {msg.text}
                    {msg.sender === "bot" && (
                      <button onClick={() => copyToClipboard(msg.text)}>
                        Copy
                      </button>
                    )}
                  </div>
                ))}
                {loading && <div className="message sent">Loading...</div>}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                />
                <div className="buttonss">
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          )}

          {selectedOption === "translate" && (
            <div>
              <Speak />
            </div>
          )}
          {selectedOption === "email" && (
            <div>
              <DraftEmail />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
