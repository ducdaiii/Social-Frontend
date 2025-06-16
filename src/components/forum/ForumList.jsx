const ForumList = ({ forums, selectedId, onSelect }) => {
  return (
    <div>
      <h2 className="font-bold mb-2">Your Forums</h2>
      {forums.map(forum => (
        <div 
          key={forum._id}
          className={`p-2 cursor-pointer rounded ${forum._id === selectedId ? "bg-blue-100" : "hover:bg-gray-100"}`}
          onClick={() => onSelect(forum._id)}
        >
          {forum.project?.name || "Unnamed Project"}
        </div>
      ))}
    </div>
  );
};

export default ForumList;