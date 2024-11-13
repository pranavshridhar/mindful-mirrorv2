import React from 'react'
import './JournalEntry.css'


function JournalEntry() {
  return (
    <div className="journal-entry-container">
      <textarea className="journal-entry-box" placeholder="Write your thoughts here..."></textarea>
    </div>
  )
}

export default JournalEntry