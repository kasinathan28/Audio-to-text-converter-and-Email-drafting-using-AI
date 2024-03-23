import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";


function DraftEmail() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

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
  };

  return (
    <div>
      <input type="text" placeholder="To" value={to} onChange={handleToChange} />
      <input type="text" placeholder="From" value={from} onChange={handleFromChange} />
      <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
      <button onClick={handleDraftEmail}>Draft Email</button>
      {emailContent && <div>{emailContent}</div>}
    </div>
  );
}

export default DraftEmail;
