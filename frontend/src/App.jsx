import { useState } from 'react';
import HeroSection from "../src/components/HeroSection";
import JournalEntry from './components/JournalEntry';
import BentoGrid from './components/BentoGrid';

function App() {
  const [count, setCount] = useState(0);

  return (
   <>
      <HeroSection />
      <JournalEntry />
      <BentoGrid />
      </>
   
  );
}

export default App;
