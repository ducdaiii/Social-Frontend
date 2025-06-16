import React, { useState } from "react";
import { useAddCommentMutation } from "../../api/commentApi";
import { GrSend } from "react-icons/gr";

const CommentForm = ({ postId, user, parentId = null, onSuccess }) => {
  const [content, setContent] = useState("");
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({
        content,
        post: postId,
        user: user._id,
        parent: parentId, 
      });
      setContent("");
      onSuccess?.(); 
    } catch (error) {
      console.error("Failed to comment", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-md border border-gray-200"
    >
      <img
        src={user.avatar || "/default-avatar.png"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-100 rounded-2xl py-2 px-4 pr-10 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
          placeholder="Write a comment... (Enter to send)"
        />
        <button
          type="submit"
          className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 transition"
        >
          <GrSend size={18} />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
