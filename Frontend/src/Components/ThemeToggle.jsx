// src/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Apply theme to the body
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');

    // Apply theme to all navbar elements
    document.querySelectorAll('.navbar').forEach(nav => {
      nav.classList.remove('dark-mode', 'light-mode');
      nav.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
    });

    // Apply theme to a specific link with class 'logotexxt'
    let link = document.querySelector('.logotexxt');
    if (link) {
      link.classList.remove('dark-mode', 'light-mode');
      link.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
    }

    // Apply theme to all Link components if needed
    // Note: Adjust this if you're using React Router's Link component
    document.querySelectorAll('a').forEach(a => {
      a.classList.remove('dark-mode', 'light-mode');
      a.classList.add(isDarkMode ? 'dark-mode' : 'light-mode');
    });

    // Save the theme to localStorage
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
