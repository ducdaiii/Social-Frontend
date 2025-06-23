import { FaCommentDots } from "react-icons/fa";

const TopAuthorsActivity = ({ articles }) => {
  const sorted = [...articles].sort(
    (a, b) => (b.authorPosts + b.authorComments) - (a.authorPosts + a.authorComments)
  );
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="font-bold mb-2">⚡ Top Authors (Activity)</h3>
      {sorted.map((a, idx) => (
        <p key={idx} className="text-sm text-gray-300 truncate flex items-center gap-1">
          <FaCommentDots className="text-yellow-400" /> {a.author}: {a.authorPosts + a.authorComments}
        </p>
      ))}
    </div>
  );
};
export default TopAuthorsActivity;