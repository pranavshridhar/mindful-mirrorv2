// components/StyledButton.jsx
import React from 'react';

const StyledButton = ({ text, onClick, size = 'medium', color = 'primary' }) => {
  // Define styles based on props
  const sizeClass =
    size === 'small'
      ? 'px-4 py-2 text-sm'
      : size === 'large'
      ? 'px-8 py-3 text-lg'
      : 'px-6 py-2 text-md'; // default to medium size

  const colorClass =
    color === 'primary'
      ? 'bg-purple-600 hover:bg-purple-700 text-white'
      : color === 'secondary'
      ? 'bg-gray-600 hover:bg-gray-700 text-white'
      : 'bg-blue-600 hover:bg-blue-700 text-white'; // default to primary color

  return (
    <button
      onClick={onClick}
      className={`transition duration-300 ease-in-out rounded-lg shadow-md ${sizeClass} ${colorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
    >
      {text}
    </button>
  );
};

export default StyledButton;
