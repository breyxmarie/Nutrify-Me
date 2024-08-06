import React, { useState } from "react";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div>
      <button onClick={toggleChat}>Open Chat</button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 999,
          }}
        >
          <button onClick={toggleChat} style={{ float: "right" }}>
            X
          </button>
          <div style={{ height: "200px", overflowY: "scroll" }}>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%" }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
