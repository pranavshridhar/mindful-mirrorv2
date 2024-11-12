import { useState } from 'react';
import HeroSection from "../src/components/HeroSection";
import JournalEntry from './components/JournalEntry';
import BentoGrid from './components/BentoGrid';
import AuroraBackground from './components/ui/aurora-background'; // Import AuroraBackground

function App() {
  return (
    <AuroraBackground> {/* Wrap your content in AuroraBackground */}
      <HeroSection />
      <JournalEntry />
      <BentoGrid />
    </AuroraBackground>
  );
}

export default App;
