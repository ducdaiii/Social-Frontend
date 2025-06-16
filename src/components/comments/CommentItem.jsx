import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import dayjs from "../../utilities/dayjsSetup";

const CommentItem = ({ comment, replies }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const updatedTime = dayjs(comment.updatedAt)
    .tz("Asia/Ho_Chi_Minh")
    .format("DD/MM/YYYY HH:mm");

  return (
    <div className="ml-0">
      <div className="p-3 bg-gray-100 rounded-lg shadow-sm relative">
        <p className="font-semibold">{comment.user?.username}</p>
        <p className="text-sm">{comment.content}</p>

        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{updatedTime}</span>
          <button
            onClick={() => setShowReplyForm((prev) => !prev)}
            className="text-blue-500 hover:underline"
          >
            {showReplyForm ? "Cancel" : "Reply"}
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-6 mt-2">
          <CommentForm
            postId={comment.post}
            user={currentUser}
            parentId={comment._id}
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-6 mt-2 space-y-2">
          {replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
