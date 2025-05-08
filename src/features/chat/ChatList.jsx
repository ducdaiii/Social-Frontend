import React from "react";
import { useGetUserChatsQuery } from "../../api/chatApi";

const ChatList = ({ userId, onSelectChat, selectedChat }) => {
  const { data: chats, error, isLoading } = useGetUserChatsQuery(userId, { skip: !userId });

  if (isLoading) return <p>Loading chats...</p>;
  if (error) return <p>Error loading chat list: {error.message}</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl text-gray-400 mb-4">Chats</h2>
      <ul>
        {chats?.length === 0 ? (
          <p>No active chats.</p>
        ) : (
          chats.map((chat) => (
            <li
              key={chat._id}
              className={`flex justify-between items-center p-2 border-b border-gray-700 cursor-pointer ${
                selectedChat === chat._id ? "bg-gray-800" : ""
              }`}
              onClick={() => onSelectChat(chat._id)}
            >
              <span>{chat.groupName || "Unnamed Chat"}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatList;