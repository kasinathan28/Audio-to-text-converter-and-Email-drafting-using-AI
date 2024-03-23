import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from 'axios';
import "./speak.css";
import { BASE_URL } from "../../services/baseURL";

function Speak() {
  const [selectedFromLanguage, setSelectedFromLanguage] = useState("en");
  const [selectedToLanguage, setSelectedToLanguage] = useState("en");
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [translatedText, setTranslatedText] = useState("");

  const handleFromLanguageChange = (event) => {
    setSelectedFromLanguage(event.target.value);
  };

  const handleToLanguageChange = (event) => {
    setSelectedToLanguage(event.target.value);
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech to text");
      return;
    }
    SpeechRecognition.startListening({ language: selectedFromLanguage });
  };

  // Function to translate text using your API endpoint
  const translateText = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/translate`, {
        selectedFromLanguage,
        selectedToLanguage,
        transcript
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  return (
    <div className="smain">
      <div className="speak-container">
       
        <p>From</p>
        <select value={selectedFromLanguage} onChange={handleFromLanguageChange}>
          <option value="en">English</option>
          <option value="ml">Malayalam</option>
          <option value="hi">Hindi</option>
        </select>
        <p>To</p>
        <select value={selectedToLanguage} onChange={handleToLanguageChange}>
          <option value="en">English</option>
          <option value="ml">Malayalam</option>
          <option value="hi">Hindi</option>
        </select>
        <button onClick={startListening}>
          <FaMicrophone /> {listening ? "OFF" : "on"}
        </button>
        <button onClick={translateText}>Translate</button>
      </div>
      <div className="transcript">{transcript}</div>
      <div className="translated-text">{translatedText}</div>
    </div>
  );
}

export default Speak;