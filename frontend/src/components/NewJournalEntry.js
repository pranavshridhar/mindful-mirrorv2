// components/NewJournalEntry.jsx
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import StyledButton from "./StyledButton";

const JournalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const EntryForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
  background-color: #f9f9ff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #6a0dad;
    box-shadow: 0 0 5px rgba(106, 13, 173, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #6a0dad;
    box-shadow: 0 0 5px rgba(106, 13, 173, 0.3);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NewJournalEntry = ({ onSaveEntry }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(""); // Mood field if needed

  const handleSave = async (e) => {
    const handleSave = async (e) => {
        e.preventDefault();
        if (title && content) {
          try {
            const response = await axios.post("http://localhost:5000/api/journal", {
              title,
              content,
              mood,
            });
            if (response.status === 201) {
              // Successfully saved entry
              setTitle("");
              setContent("");
              setMood("");
              setFormVisible(false);
              onSaveEntry(response.data.journalEntry);
            }
          } catch (error) {
            console.error("Error saving entry:", error.response || error.message);
            alert("Failed to save entry. Please try again.");
          }
        } else {
          alert("Please fill out all required fields.");
        }
      };
    };      
  

  return (
    <JournalContainer>
      <StyledButton
        text="New Journal Entry"
        onClick={() => setFormVisible(!isFormVisible)}
        color="primary"
        size="medium"
      />

      {isFormVisible && (
        <EntryForm onSubmit={handleSave}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            rows="5"
            placeholder="Write your journal entry here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Mood (optional)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <ButtonContainer>
            <StyledButton text="Save Entry" type="submit" color="primary" />
          </ButtonContainer>
        </EntryForm>
      )}
    </JournalContainer>
  );
};

export default NewJournalEntry;
