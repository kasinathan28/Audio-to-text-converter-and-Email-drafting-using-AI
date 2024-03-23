import React, { useState } from "react";

function DraftEmail() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  // Implement email sending functionality here

  return (
    <div>
      <input type="text" placeholder="To" value={to} onChange={handleToChange} />
      <input type="text" placeholder="From" value={from} onChange={handleFromChange} />
      <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} />
      {/* Add more inputs for email body */}
    </div>
  );
}

export default DraftEmail;
