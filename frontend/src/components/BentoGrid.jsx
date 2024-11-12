import React from 'react';

// Sample data (you can replace this with actual data from a server or database)
const journalEntries = [
  { id: 1, title: "Gratitude Journal", date: "2023-10-01", content: "Today I am grateful for..." },
  { id: 2, title: "Reflecting on Goals", date: "2023-10-02", content: "This week, I focused on..." },
  { id: 3, title: "Positive Thoughts", date: "2023-10-03", content: "A positive thought today is..." },
  // Add more entries here
];

const BentoGrid = () => {
  return (
    <div style={styles.gridContainer}>
      {journalEntries.map((entry) => (
        <div key={entry.id} style={styles.gridItem}>
          <h3 style={styles.entryTitle}>{entry.title}</h3>
          <p style={styles.entryDate}>{entry.date}</p>
          <p style={styles.entryContent}>{entry.content}</p>
          <button style={styles.updateButton} onClick={() => handleUpdate(entry.id)}>
            Update Entry
          </button>
        </div>
      ))}
    </div>
  );
};

// Handler for updating an entry (you could pass a real handler as a prop if needed)
const handleUpdate = (id) => {
  alert(`Update journal entry with ID: ${id}`);
};

const styles = {
  gridContainer: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    padding: '20px',
  },
  gridItem: {
    backgroundColor: '#f9fcfd', // Soft background for entries
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for a floating effect
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
  entryTitle: {
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#2e4057', // Darker text color
    marginBottom: '8px',
  },
  entryDate: {
    fontSize: '0.9em',
    color: '#5a8dee', // Accent color for date
    marginBottom: '12px',
  },
  entryContent: {
    fontSize: '1em',
    color: '#2e4057',
    marginBottom: '16px',
  },
  updateButton: {
    padding: '8px 12px',
    fontSize: '0.9em',
    color: '#fff',
    backgroundColor: '#76c7c0', // Button color
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

// Additional hover effects for grid items and button
styles.gridItem[':hover'] = {
  transform: 'scale(1.02)',
};
styles.updateButton[':hover'] = {
  backgroundColor: '#5daea8',
};

export default BentoGrid;

