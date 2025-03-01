"use client";

import { useState } from "react";
import PreviousJournal from "./components/PreviousJournals";

export default function Home() {
  const [text, setText] = useState("");

  const handleSend = () => {
    alert(`Sent: ${text}`);
    setText(""); // Clear the text area after sending
  };

  return (
    <main className="overflow-hidden flex justify-center items-center min-h-screen bg-gray-100">
      <PreviousJournal/>
      <div className="p-4 bg-white shadow-lg rounded-lg w-3/4 max-w-lg">
        <h1 className="text-xl font-bold mb-2">Enter Your Text</h1>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={handleSend}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </main>
  );
}
