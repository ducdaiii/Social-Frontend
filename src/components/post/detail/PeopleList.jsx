import React from "react";
import { useGetUserByIdQuery } from "../../../api/userApi";
import LoadingMotion from "../../err/LoadingMotion"

const UserCard = ({ userId }) => {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  if (isLoading) return <LoadingMotion />;
  if (isError || !user)
    return <p className="text-sm text-red-500">Failed to load user</p>;

  return (
    <div className="flex items-center gap-3 mb-3 rounded-lg">
      <img
        src={user.avatar || "/default-avatar.png"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
      </div>
    </div>
  );
};

const MembersList = ({ author, members }) => {
  return (
    <div className="bg-stone-200 p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Teams</h2>

      {/* Author */}
      {author && (
        <>
          <div className="flex items-center justify-between px-1">
            <span className="text-sm px-2 py-0.5 rounded-full">
              👑
            </span>
          </div>
          <div className="relative z-10">
            <UserCard userId={author} />
          </div>
        </>
      )}

      {/* Members */}
      {members?.length > 0 && (
        <div className="space-y-2">
          {members.map((memberId) => (
            <UserCard key={memberId} userId={memberId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList;
