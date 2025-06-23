import { useState } from "react";

const TopAuthorsFollowers = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-bold mb-2">🏆 Top Authors (Followers)</h3>
        <p className="text-sm text-gray-400">No data available</p>
      </div>
    );
  }

  const icons = ["🥉", "🥈", "🥇", "🏅", "🎖️", "⭐", "🌟", "🔥", "💎", "👑"];

  const getFollowerDisplay = (count) => {
    if (count < 100) {
      return <>{count}</>;
    } else {
      const level = Math.min(Math.floor((count - 100) / 500), icons.length - 1);
      const icon = icons[level];
      return <>{icon}</>;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow space-y-2">
      <h3 className="font-bold mb-2">🏆 Top Authors (Followers)</h3>
      {users.map((user) => (
        <HoverCard
          key={user._id}
          user={user}
          getFollowerDisplay={getFollowerDisplay}
        />
      ))}
    </div>
  );
};

const HoverCard = ({ user, getFollowerDisplay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded overflow-hidden border border-gray-700 p-1 hover:border-gray-500 transition"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {user.background && (
        <img
          src={user.background}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative z-10 flex items-center gap-2">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover border"
          />
        )}
        <div className="flex justify-between w-full items-center">
          <p className="text-md text-gray-100 truncate">{user.username}</p>
          <div className="text-sm text-gray-100 flex items-center gap-1">
            {getFollowerDisplay(user.followerCount)}
            {hovered && (
              <span className="opacity-0 animate-fadeIn text-lg text-gray-300">
                {user.followerCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAuthorsFollowers;
