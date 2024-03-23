import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import "./email.css";

function DraftEmail() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleDraftEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/draftemail`, {
        to,
        from,
        subject
      });
      setEmailContent(response.data.emailContent);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setIsLoading(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailContent)
      .then(() => {
        alert("Email copied to clipboard");
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
  };

  return (
    <div className="draft-email-container">
      <input className="input-field" type="text" placeholder="To" value={to} onChange={handleToChange} />
      <input className="input-field" type="text" placeholder="From" value={from} onChange={handleFromChange} />
      <input className="input-field" type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
      <button className="button" onClick={handleDraftEmail}>Draft Email</button>
      {isLoading && <div className="loading-spinner"></div>}
      {emailContent &&
        <div className="email-content">
          <div>To: {to}</div>
          <div>From: {from}</div>
          <div>Subject: {subject}</div>
          <div>{emailContent}</div>
          <button className="copy-button" onClick={handleCopyEmail}>Copy Email</button>
        </div>
      }
    </div>
  );
}

export default DraftEmail;
