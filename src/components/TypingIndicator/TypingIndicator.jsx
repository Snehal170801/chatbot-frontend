// components/TypingIndicator/TypingIndicator.jsx
import styles from "./TypingIndicator.module.css";

export default function TypingIndicator() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face"
          alt="typing"
        />
      </div>
      <div className={styles.bubble}>
        <span className={styles.dot} style={{ animationDelay: "0ms" }} />
        <span className={styles.dot} style={{ animationDelay: "160ms" }} />
        <span className={styles.dot} style={{ animationDelay: "320ms" }} />
      </div>
    </div>
  );
}
