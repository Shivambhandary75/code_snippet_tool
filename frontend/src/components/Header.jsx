import React, { useState, useEffect } from "react";

const Header = ({ onCreateSnippet }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
  <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-black shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
  <span className="font-bold text-2xl text-blue-400 dark:text-blue-300 tracking-wide">VibeCoded</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 0 0 0 16c4.42 0 8-3.58 8-8a8 8 0 0 0-8-8zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z"/>
            </svg>
          )}
        </button>
        <button
          onClick={onCreateSnippet}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-900 hover:scale-105 transition"
        >
          Create New Snippet
        </button>
      </div>
    </header>
  );
};

export default Header;