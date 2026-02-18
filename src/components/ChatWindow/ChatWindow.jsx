// components/ChatWindow/ChatWindow.jsx
import styles from "./ChatWindow.module.css";
import ChatBubble from "../ChatBubble/ChatBubble";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import ChatInput from "../ChatInput/ChatInput";

export default function ChatWindow({
  messages,
  loading,
  onSend,
  onClear,
  bottomRef,
}) {
  return (
    <div className={styles.window}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerAvatar}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face"
              alt="Chatbot"
            />
            <span className={styles.headerDot} />
          </div>
          <div>
            <h3 className={styles.headerName}>Chatbot</h3>
            <p className={styles.headerStatus}>Student Database Assistant</p>
          </div>
        </div>
        <button
          className={styles.clearBtn}
          onClick={onClear}
          title="Clear chat"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={loading} />
    </div>
  );
}
