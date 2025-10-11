import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Plus, LogOut, User } from "lucide-react";

const Header = ({ onCreateSnippet }) => {
  const { darkMode, toggle } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`shadow-md py-4 px-6 flex items-center justify-between transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-900 text-white"
      }`}
    >
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity"
        >
          VibeCoded
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggle}
          className={`flex items-center px-3 py-2 rounded-full transition-colors ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white/20 hover:bg-white/30"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 0 0 0 16c4.42 0 8-3.58 8-8a8 8 0 0 0-8-8zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
            </svg>
          )}
        </button>

        {user ? (
          <>
            <Link
              to="/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Create Snippet</span>
            </Link>
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span className="text-sm">Welcome!</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;