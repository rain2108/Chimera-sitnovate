"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

const Chat: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (isLoading || !query.trim()) return;

    try {
      setIsLoading(true);
      
      const res = await fetch("https://8bdb-103-183-91-106.ngrok-free.app/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ query }),
      });

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(`API Error (${res.status}): ${responseText}`);
      }

      try {
        const data = JSON.parse(responseText);
        // Update here: use "answer" from API response instead of "response"
        setResponse(data.answer || "Received empty response from API.");
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

    } catch (error) {
      console.error("API Request Failed:", error);
      setResponse(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Chat Interface</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Type your query..."
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4 text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white font-semibold p-3 rounded transition-all ${
            isLoading 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded w-full max-w-md animate-fade-in">
          <p className="text-gray-300">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
