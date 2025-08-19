import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import ChatHeader from "./compoenents/ChatHeader";

// Dummy users
const initialUsers = [
  { id: 1, username: "Alice", online: true },
  { id: 2, username: "Bob", online: true },
  { id: 3, username: "Charlie", online: false },
  { id: 4, username: "Diana", online: true },
];

// Dummy messages
const initialMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hello Bob!",
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    id: 2,
    senderId: 2,
    content: "Hi Alice!",
    timestamp: Date.now() - 1000 * 60 * 4,
  },
  {
    id: 3,
    senderId: 1,
    content: "How are you?",
    timestamp: Date.now() - 1000 * 60 * 3,
  },
  {
    id: 4,
    senderId: 2,
    content: "I am good, thanks!",
    timestamp: Date.now() - 1000 * 60 * 2,
  },
  {
    id: 5,
    senderId: 4,
    content: "Hey everyone!",
    timestamp: Date.now() - 1000 * 60 * 1,
  },
];

function App() {
  const [users] = useState(initialUsers);
  const [messages, setMessages] = useState(initialMessages);
  const [activeUserId, setActiveUserId] = useState(1); // Alice by default
  const [input, setInput] = useState("");

  // Add message handler
  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          senderId: activeUserId,
          content: input,
          timestamp: Date.now(),
        },
      ]);
      setInput("");
    }
  }, [input, activeUserId]);

  // Memoize users for sidebar (not used, so removed)

  // Memoize participants for header
  const participants = useMemo(() => {
    const ids = new Set(messages.map((m) => m.senderId));
    return users.filter((u) => ids.has(u.id));
  }, [messages, users]);

  return (
    <div className="chat-app" style={{ display: "flex", height: "100vh" }}>
      <ActiveUsersSidebar
        users={users}
        activeUserId={activeUserId}
        setActiveUserId={setActiveUserId}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader participants={participants} />
        <ChatWindow messages={messages} users={users} />
        <div
          style={{
            display: "flex",
            padding: "1rem",
            borderTop: "1px solid #eee",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, marginRight: "1rem" }}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

// Sidebar for active users
const ActiveUsersSidebar = React.memo(function ActiveUsersSidebar({
  users,
  activeUserId,
  setActiveUserId,
}) {
  return (
    <aside
      style={{
        width: 220,
        borderRight: "1px solid #eee",
        padding: "1rem",
        background: "#fafafa",
      }}
    >
      <h3>Active Users</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            selected={user.id === activeUserId}
            setActiveUserId={setActiveUserId}
          />
        ))}
      </ul>
    </aside>
  );
});

// Memoized user item
const UserItem = React.memo(
  function UserItem({ user, selected, setActiveUserId }) {
    return (
      <li
        style={{
          padding: "0.5rem",
          background: selected ? "#e0e7ff" : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
          borderRadius: 4,
          opacity: user.online ? 1 : 0.5,
        }}
        onClick={() => setActiveUserId(user.id)}
      >
        <span style={{ marginRight: 8, fontWeight: 500 }}>{user.username}</span>
        <span style={{ fontSize: 12, color: user.online ? "green" : "gray" }}>
          {user.online ? "● Online" : "● Offline"}
        </span>
      </li>
    );
  },
  (prev, next) =>
    prev.user.online === next.user.online && prev.selected === next.selected
);

// Chat window for messages
const ChatWindow = React.memo(function ChatWindow({ messages, users }) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        background: "#fff",
      }}
    >
      {messages.map((msg) => {
        const sender = users.find((u) => u.id === msg.senderId);
        return <Message key={msg.id} message={msg} sender={sender} />;
      })}
    </div>
  );
});

// Memoized message component
const Message = React.memo(function Message({ message, sender }) {
  // Memoize formatted timestamp
  const formattedTime = useMemo(
    () => formatTimestamp(message.timestamp),
    [message.timestamp]
  );
  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: 8,
        background: "#f3f4f6",
      }}
    >
      <div style={{ fontWeight: 600 }}>{sender?.username || "Unknown"}</div>
      <div>{message.content}</div>
      <div style={{ fontSize: 12, color: "#888" }}>{formattedTime}</div>
    </div>
  );
});

// Timestamp formatting
function formatTimestamp(ts) {
  const now = Date.now();
  const diff = Math.floor((now - ts) / 1000);
  if (diff < 60) return `${diff} secs ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return new Date(ts).toLocaleString();
}

export default App;
