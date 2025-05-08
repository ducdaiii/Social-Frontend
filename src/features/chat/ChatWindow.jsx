import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  useSendMessageMutation,
  useMarkAsReadMutation,
  usePinMessageMutation,
  useSoftDeleteMessageMutation,
  useGetChatsQuery,
} from "../../api/chatApi";

const ChatWindow = ({ selectedChat, user }) => {
  const [message, setMessage] = useState("");

  const { data: messages, refetch } = useGetChatsQuery(
    { chatId: selectedChat, page: 1, limit: 20 },
    { skip: !selectedChat }
  );

  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [pinMessage] = usePinMessageMutation();
  const [softDeleteMessage] = useSoftDeleteMessageMutation();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.on("newMessage", (newMessage) => {
      if (newMessage.chatId === selectedChat) refetch();
    });
    socket.on("messageRead", refetch);
    socket.on("messagePinned", refetch);
    socket.on("messageDeleted", refetch);

    return () => socket.disconnect();
  }, [selectedChat, refetch]);

  const determineType = (message) => {
    try {
      const url = new URL(message);
      if (url.hostname.includes("img") || /\.(jpeg|jpg|gif|png)$/.test(url.pathname)) {
        return "image";
      }
    } catch (e) {}
    return "text";
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const messageType = determineType(message);
    await sendMessage({
      senderId: user, 
      chatId: selectedChat,
      type: messageType,
      content: message,
    });
    setMessage("");
    refetch();
  };

  const handleMarkAsRead = async (messageId) => {
    await markAsRead({ id: messageId, userId: user });
    refetch();
  };

  const handlePinMessage = async (messageId) => {
    await pinMessage({ id: messageId, chatId: selectedChat }); 
    refetch();
  };

  const handleDeleteMessage = async (messageId) => {
    await softDeleteMessage(messageId);
    refetch();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages?.length > 0 &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-2 ${msg.sender === user ? "text-right" : "text-left"}`}
            >{msg.createdAt}
              <span className="inline-block bg-blue-200 p-2 rounded-lg">
                {msg.content}
              </span>
              <button onClick={() => handleMarkAsRead(msg._id)}>✔</button>
              <button onClick={() => handlePinMessage(msg._id)}>📌</button>
              <button onClick={() => handleDeleteMessage(msg._id)}>🗑</button>
            </div>
          ))}
      </div>
      {selectedChat && (
        <div className="p-4 border-t flex items-center">
          <input
            className="flex-1 p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSend}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;