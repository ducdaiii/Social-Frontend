import React, { useState } from "react";
import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";
import LoginRequiredPopup from "../components/err/LoginRequiredPopup";

const CommentSection = ({ postId, currentUser }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCommentAttempt = () => {
    if (!currentUser) {
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Comments</h2>

      <div className="max-h-[400px] overflow-y-auto mb-6">
        <CommentList postId={postId} currentUser={currentUser} />
      </div>

      {currentUser ? (
        <CommentForm postId={postId} user={currentUser} />
      ) : (
        <button
          onClick={handleCommentAttempt}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          Đăng nhập để bình luận
        </button>
      )}

      {showLoginPopup && <LoginRequiredPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
};

export default CommentSection;