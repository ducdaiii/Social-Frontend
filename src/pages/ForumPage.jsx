import React, { useState, useRef, useEffect } from "react";
import { useCreateForumMessageMutation } from "../api/projectForumMessageApi";
import MessageList from "../components/forum/MessageList";
import { useGetMessagesByProjectQuery } from "../api/projectForumApi";
import LoadingMotion from "../components/err/LoadingMotion";

const ForumPage = ({ postId, userId }) => {
  const [replyParentId, setReplyParentId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);

  const {
    data: forums,
    isLoading,
    error,
    refetch,
  } = useGetMessagesByProjectQuery(postId);

  const [createMessage] = useCreateForumMessageMutation();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await createMessage({
        forum: forums._id,
        author: userId,
        content: newMessage,
        replyTo: replyParentId,
        edited: false,
      }).unwrap();

      setNewMessage("");
      setReplyParentId(null);
      refetch();
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  if (isLoading) return <LoadingMotion />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div
        id="messageScrollContainer"
        className="flex-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-2"
      >
        <MessageList
          messages={forums.messages}
          onReply={setReplyParentId}
          currentUserId={userId}
        />
      </div>

      {/* Chat Input Fixed Bottom */}
      <div className="sticky bottom-0 bg-white border-t py-2 z-10">
        {replyParentId && (
          <div className="text-sm text-gray-500 mb-1 px-1 flex items-center justify-between">
            <span>
              Replying to message <strong>{forums.content}</strong>
            </span>
            <button
              onClick={() => setReplyParentId(null)}
              className="text-red-500 hover:underline text-xs"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            className="w-full bg-gray-100 rounded-2xl py-2 px-4 pr-10 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
