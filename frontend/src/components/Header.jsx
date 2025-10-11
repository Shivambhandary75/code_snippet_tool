import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ onCreateSnippet }) => {
  const { darkMode, toggle } = useContext(ThemeContext);

  return (
    <header className={`shadow-md py-4 px-6 flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white' : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-900 text-white'}`}>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-2xl tracking-wide">VibeCoded</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggle}
          className={`flex items-center px-3 py-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 0 0 0 16c4.42 0 8-3.58 8-8a8 8 0 0 0-8-8zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z"/>
            </svg>
          )}
        </button>
            <button
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onClick={() => window.location.href = '/create'}
    />
      </div>
    </header>
  );
};

export default Header;