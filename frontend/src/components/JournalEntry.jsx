import React from 'react';

const JournalEntry = () => {
  return (
    <div style={styles.container}>
      <label htmlFor="journal-entry" style={styles.label}>Your Journal Entry</label>
      <textarea
        id="journal-entry"
        style={styles.textarea}
        placeholder="Write your thoughts here..."
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    maxWidth: '500px',
    width: '100%',
  },
  label: {
    fontSize: '1em',
    color: '#5a8dee', // Calming blue color for label
    marginBottom: '8px',
    fontWeight: '500',
  },
  textarea: {
    width: '100%',
    minHeight: '200px',
    padding: '16px',
    fontSize: '1em',
    color: '#2e4057', // Darker color for text readability
    backgroundColor: '#f9fcfd', // Soft, light background for relaxation
    border: '1px solid #b4cdd9', // Light border color
    borderRadius: '12px', // Rounded corners for a soft appearance
    resize: 'vertical', // Allows vertical resizing
    outline: 'none',
    fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  },
};

// Add focus styling using CSS in JS (or inline with an onFocus/onBlur handler if needed)
const textareaFocusStyles = {
  borderColor: '#76c7c0', // Calming focus border color
  boxShadow: '0 0 8px rgba(118, 199, 192, 0.3)', // Soft shadow for focus
};

// To apply focus style dynamically (optional):
// onFocus={() => setStyle({ ...styles.textarea, ...textareaFocusStyles })}

export default JournalEntry;
