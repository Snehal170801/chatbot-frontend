// components/AvatarPanel/AvatarPanel.jsx
import styles from "./AvatarPanel.module.css";

const QUICK_ACTIONS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "All Students",
    msg: "Show all students",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Top 3 GPAs",
    msg: "Top 3 students by GPA",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    label: "Avg GPA",
    msg: "What is the average GPA?",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    label: "Find by ID",
    msg: "Find student with ID 1",
  },
];

export default function AvatarPanel({ onQuickAction }) {
  return (
    <div className={styles.panel}>
      <div className={styles.decCircle1} />
      <div className={styles.decCircle2} />

      <div className={styles.avatarWrap}>
        <div className={styles.avatarRing}>
          <div className={styles.avatarInner}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
              alt="Chatbot"
              className={styles.avatarImg}
            />
          </div>
        </div>
        <div className={styles.onlineDot} />
      </div>

      <div className={styles.nameBlock}>
        <h2 className={styles.name}>Chatbot</h2>
        <p className={styles.role}>Student Database Assistant</p>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          Online
        </span>
      </div>

      <div className={styles.micBtn} title="Voice (UI only)">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.micIcon}
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </div>

      <p className={styles.quickLabel}>Quick Actions</p>
      <div className={styles.actions}>
        {QUICK_ACTIONS.map((a) => (
          <button
            key={a.label}
            className={styles.actionBtn}
            title={a.label}
            onClick={() => onQuickAction(a.msg)}
          >
            <span className={styles.actionIcon}>{a.icon}</span>
            <span className={styles.actionLabel}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
