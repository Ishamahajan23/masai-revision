import React from "react";

// Memoized ChatHeader: only re-renders when participants prop changes
const ChatHeader = React.memo(function ChatHeader({ participants }) {
  return (
    <header
      style={{
        padding: "1rem",
        borderBottom: "1px solid #eee",
        background: "#f9fafb",
      }}
    >
      <h2 style={{ margin: 0 }}>Chat Room</h2>
      <div style={{ fontSize: 14, color: "#555" }}>
        Participants: {participants.length}
        {participants.length > 0 && (
          <span style={{ marginLeft: 12 }}>
            {participants.map((p) => p.username).join(", ")}
          </span>
        )}
      </div>
    </header>
  );
});

export default ChatHeader;
