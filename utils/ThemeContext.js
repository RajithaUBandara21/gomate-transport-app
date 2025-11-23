// utils/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      card: isDarkMode ? '#1E1E1E' : '#F5F5F5',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      subtext: isDarkMode ? '#B0B0B0' : '#666666',
      primary: '#4A90E2',
      border: isDarkMode ? '#333333' : '#E0E0E0',
      input: isDarkMode ? '#2C2C2C' : '#FFFFFF',
      tabBar: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    },
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);