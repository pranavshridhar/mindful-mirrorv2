import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const backgroundShift = keyframes`
  0% { background-color: #f0f4f8; }
  50% { background-color: #d0e4f7; }
  100% { background-color: #f0f4f8; }
`;

const BackgroundContainer = styled.div`
  animation: ${backgroundShift} 10s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  transition: background-color 0.5s ease;
`;

const AmbientBackground = ({ children }) => {
  return <BackgroundContainer>{children}</BackgroundContainer>;
};

export default AmbientBackground;
