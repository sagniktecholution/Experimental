import React, { useState } from 'react';

export const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      style={{
        background: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      <h1>Toggle Theme</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};
