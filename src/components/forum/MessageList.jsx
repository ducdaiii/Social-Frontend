import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, onReply, currentUserId }) => {
  const bottomRef = useRef(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const container = document.getElementById("messageScrollContainer");
    if (!container) return;

    const scrollToBottom = () => {
      container.scrollTop = container.scrollHeight;
    };

    const timeout = setTimeout(() => {
      scrollToBottom();
      hasMounted.current = true;
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  if (!messages?.length) {
    return <p className="text-center text-gray-400 mt-6">No messages yet.</p>;
  }

  return (
    <div className="flex flex-col space-y-4 px-4 pb-24">
      {messages.map((msgId) => (
        <MessageItem
          key={msgId}
          messageId={msgId}
          onReply={onReply}
          currentUserId={currentUserId}
        />
      ))}
      {/* Không cần scrollIntoView nữa */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;