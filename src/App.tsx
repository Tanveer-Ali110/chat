import { useState } from 'react';

const App = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e: any) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prev) => [...prev, { text: newMessage, sender: 'user' }]);
      setNewMessage('');

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: 'Bot: Hi there!', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {message.sender === 'user' ? (
              <div style={{ textAlign: 'right', color: 'blue' }}>{message.text}</div>
            ) : (
              <div style={{ textAlign: 'left', color: 'green' }}>{message.text}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
