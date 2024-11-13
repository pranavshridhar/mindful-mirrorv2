import React, { useState } from "react";
import styled from "styled-components";

const JournalContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  margin: 20px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  resize: none;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #a0aec0;
  }
`;

const JournalEntry = ({ onMoodChange }) => {
  const [entry, setEntry] = useState("");

  const handleEntryChange = (e) => {
    const newEntry = e.target.value;
    setEntry(newEntry);

    // Basic mood detection based on keywords
    if (newEntry.includes("happy")) onMoodChange("#d4f7da");
    else if (newEntry.includes("sad")) onMoodChange("#e8d7f7");
    else onMoodChange("#f0f4f8"); // Default color
  };

  return (
    <JournalContainer>
      <h2>How are you feeling today?</h2>
      <TextArea
        placeholder="Write your thoughts here..."
        value={entry}
        onChange={handleEntryChange}
      />
    </JournalContainer>
  );
};

export default JournalEntry;
