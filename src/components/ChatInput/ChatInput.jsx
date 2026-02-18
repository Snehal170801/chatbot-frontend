// components/ChatInput/ChatInput.jsx
import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./ChatInput.module.css";

const QUERIES = [
  { label: "How many students?", msg: "how many students are there?" },
  { label: "Show all students", msg: "show all students" },
  { label: "Top 3 by GPA", msg: "top 3 students by GPA" },
  { label: "Highest GPA", msg: "highest GPA" },
  { label: "Lowest GPA", msg: "lowest GPA" },
  { label: "Average GPA", msg: "average GPA" },
  { label: "GPA above 3.5", msg: "students with GPA above 3.5" },
  { label: "GPA below 3.3", msg: "students with GPA below 3.3" },
  { label: "Students in Boston", msg: "students from boston" },
  { label: "Students in Seattle", msg: "students from seattle" },
  { label: "Computer Science", msg: "students in computer science" },
  { label: "Physics students", msg: "students in physics" },
  { label: "Find Student ID 1", msg: "find student with ID 1" },
  { label: "Find Student ID 3", msg: "find student with ID 3" },
];

export default function ChatInput({ onSend, disabled }) {
  const [mode, setMode] = useState("query"); // 'query' | 'chat'
  const [value, setValue] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Auto-fill input with live transcript
  useEffect(() => {
    if (transcript) setValue(transcript);
  }, [transcript]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setValue("");
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    SpeechRecognition.stopListening();
    resetTranscript();
    setValue("");
  };

  return (
    <div className={styles.container}>
      {/* Toggle */}
      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${mode === "query" ? styles.active : ""}`}
          onClick={() => handleModeChange("query")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Quick Select
        </button>
        <button
          className={`${styles.toggleBtn} ${mode === "chat" ? styles.active : ""}`}
          onClick={() => handleModeChange("chat")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Type / Voice
        </button>
      </div>

      {/* Query buttons mode */}
      {mode === "query" && (
        <div className={styles.grid}>
          {QUERIES.map((q) => (
            <button
              key={q.msg}
              className={styles.queryBtn}
              onClick={() => onSend(q.msg)}
              disabled={disabled}
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* Chat + Voice mode */}
      {mode === "chat" && (
        <>
          {/* Voice not supported warning */}
          {!browserSupportsSpeechRecognition && (
            <p className={styles.noSupport}>
              ⚠️ Your browser doesn't support voice input. Use Chrome for best
              results.
            </p>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Mic button */}
            {browserSupportsSpeechRecognition && (
              <button
                type="button"
                className={`${styles.micBtn} ${listening ? styles.micActive : ""}`}
                onClick={toggleListening}
                title={listening ? "Stop recording" : "Start voice input"}
              >
                {listening ? (
                  /* Stop icon */
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  /* Mic icon */
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                )}
              </button>
            )}

            <input
              className={styles.input}
              type="text"
              placeholder={
                listening
                  ? "🎙️ Listening... speak now"
                  : "Type or press mic to speak..."
              }
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                resetTranscript();
              }}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              autoComplete="off"
            />

            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!value.trim() || disabled}
              title="Send"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Live transcript indicator */}
          {listening && (
            <div className={styles.listeningBar}>
              <span className={styles.listeningDot} />
              <span
                className={styles.listeningDot}
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className={styles.listeningDot}
                style={{ animationDelay: "0.4s" }}
              />
              <span className={styles.listeningText}>
                Recording... click stop or press Send
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
