// pages/ChatPage/ChatPage.jsx
import styles from "./ChatPage.module.css";
import AvatarPanel from "../../components/AvatarPanel/AvatarPanel";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { useChat } from "../../hooks/useChat";

export default function ChatPage() {
  const { messages, loading, send, clearChat, bottomRef } = useChat();

  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.layout}>
        <AvatarPanel onQuickAction={send} />
        <ChatWindow
          messages={messages}
          loading={loading}
          onSend={send}
          onClear={clearChat}
          bottomRef={bottomRef}
        />
      </div>
    </div>
  );
}
