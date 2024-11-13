import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JournalEntry from './components/JournalEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to Mindful Mirror!</h1>
      <JournalEntry/>

    </>
  )
}

export default App
