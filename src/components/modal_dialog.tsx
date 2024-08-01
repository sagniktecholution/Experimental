import React, { useState } from 'react';

export const ModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Modal Dialog</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>This is a modal dialog</p>
          <button onClick={() => setIsOpen(false)}>Close Modal</button>
        </div>
      )}
    </div>
  );
};
