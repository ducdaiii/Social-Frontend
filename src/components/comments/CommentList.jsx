import React from "react";
import { useGetCommentsByPostQuery } from "../../api/commentApi";
import CommentItem from "./CommentItem";

const CommentList = ({ postId }) => {
  const { data: comments, isLoading, isError, refetch } = useGetCommentsByPostQuery(postId);

  if (isLoading) return <p>Loading comments...</p>;
  if (isError || !comments) return <p>Failed to load comments.</p>;

  const topLevelComments = comments.filter((c) => !c.parent);
  const childMap = comments.reduce((acc, comment) => {
    if (comment.parent) {
      acc[comment.parent] = acc[comment.parent] || [];
      acc[comment.parent].push(comment);
    }
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {topLevelComments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        topLevelComments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            replies={childMap[comment._id] || []}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;