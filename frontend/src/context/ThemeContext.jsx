import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('vibecoded:darkMode');
      if (stored !== null) return stored === 'true';
    } catch (e) {}
    // default to prefer-color-scheme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vibecoded:darkMode', darkMode ? 'true' : 'false');
    } catch (e) {}
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggle = () => setDarkMode(d => !d);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
