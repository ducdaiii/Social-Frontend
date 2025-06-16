const MessageLoading = () => {
  return (
    <div className="flex items-center justify-start p-4">
      <div className="flex space-x-2">
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default MessageLoading;