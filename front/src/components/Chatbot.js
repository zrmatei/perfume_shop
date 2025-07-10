import React, { useState, useContext } from "react";
import { useChatbot } from "../components/auth/ChatbotContext";
import { AuthContext } from "./auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import pbottle from "../assets/perfume.svg";
import "../css/Chatbot.css";

function Chatbot() {
  const { chat, sendMessage, clearChat } = useChatbot();
  const { isLogged, user } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [showBot, setShowBot] = useState(false);

  const handleSend = () => {
    if (!msg.trim()) return;
    sendMessage(msg);
    setMsg("");
  };

  return (
    <>
      <div className="chatbot-floating-icon">
        <button className="chatbot-bottle" onClick={() => setShowBot((prev) => !prev)}>
          <img src={pbottle} width="50px" height="50px" id="img-bottle" />
        </button>
      </div>

      <AnimatePresence>
        {showBot && (
          <motion.div
            className="chatbot-popup"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-container">
              <h3>Hey, {user?.prenume || "visitor"} 👋</h3>
              <div className="chatbot-messages">
                {chat.map((c, i) => (
                  <div key={i} className={`chatbot-message ${c.role}`}>
                    <strong>{c.role === "user" ? "You" : "AI"}:</strong> {c.text}
                  </div>
                ))}
              </div>

              <textarea
                rows={2}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Ex: Need a fresh perfume"
                className="chatbot-area"
              />

              <div className="chatbot-btns">
                <button onClick={handleSend} className="chatbot-btn">
                  Send
                </button>

                <button onClick={clearChat} className="chatbot-clear-btn">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
