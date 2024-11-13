import React, { useState } from "react";
import styled from "styled-components";

const CloudContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;
  margin-top: 20px;
`;

const EmotionTag = styled.span`
  background-color: ${({ isActive }) => (isActive ? "#d0e8f2" : "#e2e8f0")};
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const emotions = ["Happy", "Sad", "Anxious", "Calm", "Excited", "Grateful"];

const EmotionCloud = () => {
  const [activeEmotion, setActiveEmotion] = useState(null);

  const handleClick = (emotion) => {
    setActiveEmotion(emotion);
    alert(`Reflecting on ${emotion}...`);
  };

  return (
    <CloudContainer>
      {emotions.map((emotion, index) => (
        <EmotionTag
          key={index}
          isActive={activeEmotion === emotion}
          onClick={() => handleClick(emotion)}
        >
          {emotion}
        </EmotionTag>
      ))}
    </CloudContainer>
  );
};

export default EmotionCloud;
