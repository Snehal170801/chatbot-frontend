// hooks/useChat.js — Chat state and logic
import { useState, useRef, useCallback } from "react";
import { sendChatMessage } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: "init",
      from: "bot",
      text: "Hello! I'm your Student Database Chatbot. How may I help you today? 😊",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      60,
    );
  };

  const send = useCallback(
    async (text) => {
      if (!text.trim() || loading) return;

      const userMsg = {
        id: `u-${Date.now()}`,
        from: "user",
        text: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      scrollToBottom();

      try {
        const data = await sendChatMessage(text.trim());
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            from: "bot",
            text: data.bot,
            data: data.data || null,
            timestamp: new Date(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            from: "bot",
            text: "⚠️ Could not connect to server. Make sure Flask is running on port 5000.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [loading],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "init",
        from: "bot",
        text: "Hello! I'm your Student Database Chatbot. How may I help you today? 😊",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return { messages, loading, send, clearChat, bottomRef };
}
