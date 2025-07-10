import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const ChatbotContext = createContext();

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { id, email } = jwtDecode(token);
    return id || email || null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function ChatbotProvider({ children }) {
  const [chat, setChat] = useState([]);
  const [chatKey, setChatKey] = useState("chat_visitor");

  const updateChatKey = () => {
    const uId = getUserIdFromToken();
    const currentChatKey = uId ? `chat_${uId}` : "chat_visitor";
    setChatKey(currentChatKey);

    const storedChat = localStorage.getItem(currentChatKey);
    setChat(storedChat ? JSON.parse(storedChat) : []);
  };

  useEffect(() => {
    updateChatKey();
  }, []);

  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(chat));
  }, [chat, chatKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentUID = getUserIdFromToken();
      const currentKey = currentUID ? `chat_${currentUID}` : "chat_visitor";
      if (currentKey !== chatKey) {
        updateChatKey();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [chatKey]);

  const sendMessage = async (msg) => {
  const userMsg = { role: "user", text: msg };
  setChat((prev) => [...prev, userMsg]);

  const token = localStorage.getItem("token")
  // if (!token) {
  //   console.warn("Token lipsa");
  //   setChat((prev) => [
  //     ...prev,
  //     { role: "ai", text: "Eroare: trebuie sa fii autentificat" },
  //   ]);
  //   return;
  // }

  try {
    const res = await axios.post(
      "http://localhost:8081/chatbot",
      { msg },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const aiMsg = { role: "ai", text: res.data.response };
    setChat((prev) => [...prev, aiMsg]);
  } catch (err) {
    console.error("Err AI: ", err);
    setChat((prev) => [
      ...prev,
      { role: "ai", text: "A aparut o eroare la conectarea cu AI-ul." },
    ]);
  }
};


  const clearChat = () => {
    setChat([]);
    localStorage.removeItem(chatKey);
  };

  return (
    <ChatbotContext.Provider value={{ chat, sendMessage, clearChat }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  return useContext(ChatbotContext);
}

export default ChatbotProvider;
