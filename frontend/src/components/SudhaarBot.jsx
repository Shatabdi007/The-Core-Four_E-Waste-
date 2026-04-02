import React, { useState } from "react";
import "./SudhaarBot.css";

export default function SudhaarBot() {
  const [botOpen, setBotOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMsg = { from: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/sudhaar-bot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const botMsg = { from: "bot", text: data.answer };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Bot is offline. Try again." },
      ]);
    }

    setQuestion("");
  };

  return (
    <>
      {/* Floating Button */}
      <button className="bot-toggle-btn" onClick={() => setBotOpen(!botOpen)}>
        💬
      </button>

      {/* Chat Window */}
      {botOpen && (
        <div className="bot-window">
          <div className="bot-header">Sudhaar Bot</div>

          <div className="bot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="bot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
