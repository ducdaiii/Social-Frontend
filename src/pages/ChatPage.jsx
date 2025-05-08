import { useState } from "react";
import { useSelector } from "react-redux";
import ChatWindow from "../features/chat/ChatWindow";
import ChatList from "../features/chat/ChatList";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const user = useSelector((state) => state.auth.code);

  return (
    <div className="flex h-screen">
      {/* Cửa sổ chat (Nội dung chính) */}
      <div className="flex-1 flex flex-col pr-24">
        <ChatWindow selectedChat={selectedChat} user={user.sub} />
      </div>
      {/* Danh sách cuộc trò chuyện (Sidebar trái) */}
      <div className="w-1/4 overflow-y-auto">
        <ChatList
          userId={user.sub}
          onSelectChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>
    </div>
  );
};

export default ChatPage;
