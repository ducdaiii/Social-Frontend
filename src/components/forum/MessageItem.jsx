import { useGetForumMessageByIdQuery } from "../../api/projectForumMessageApi";
import MessageLoading from "../err/MessageLoading";

const MessageItem = ({ messageId, onReply, currentUserId }) => {
  const { data: message, isLoading, error } = useGetForumMessageByIdQuery(messageId);
  const {
    data: parentMessage,
    isLoading: loadingParent,
  } = useGetForumMessageByIdQuery(message?.replyTo, {
    skip: !message?.replyTo,
  });

  if (isLoading) return <MessageLoading />;
  if (error || !message) return <div className="p-2 text-sm text-red-500">Failed to load message</div>;

  const isOwnMessage = message.author._id === currentUserId;

  return (
    <div className={`p-2 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl px-4 py-2 max-w-sm shadow space-y-1
          ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}
        `}
      >
        {/* Replying to... (quote) */}
        {message.replyTo && parentMessage && (
          <div className={`text-xs italic border-l-4 pl-2 mb-1 opacity-70 ${isOwnMessage ? "border-white" : "border-blue-400"}`}>
            {parentMessage.content?.length > 100
              ? parentMessage.content.slice(0, 100) + "..."
              : parentMessage.content}
          </div>
        )}

        {/* Main content */}
        <div className="text-xs font-semibold">
          {isOwnMessage ? "You" : message.author.username || "Unknown"}
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>

        <div className="text-right">
          <button
            onClick={() => onReply(message._id)}
            className={`text-xs hover:underline ${isOwnMessage ? "text-white/70" : "text-black/60"}`}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;