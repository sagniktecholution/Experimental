import React, { useState } from 'react';

export const ChatApp = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
