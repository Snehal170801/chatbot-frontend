// components/ChatBubble/ChatBubble.jsx
import styles from "./ChatBubble.module.css";

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatBubble({ message }) {
  const isBot = message.from === "bot";

  return (
    <div className={`${styles.wrapper} ${isBot ? styles.bot : styles.user}`}>
      {isBot && (
        <div className={styles.avatar}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face"
            alt="Chatbot"
          />
        </div>
      )}
      <div className={styles.bubble}>
        <p className={styles.text}>{message.text}</p>
        <span className={styles.time}>{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}
