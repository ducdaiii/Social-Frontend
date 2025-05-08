import React from "react";
import { useFollowUserMutation, useGetUsersQuery, useUnfollowUserMutation } from "../api/userApi";


const UserListPage = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading users</p>;

  const handleFollow = async (id) => {
    try {
      await followUser(id).unwrap();
      console.log(`Followed user: ${id}`);
    } catch (err) {
      console.error("Follow failed:", err);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await unfollowUser(id).unwrap();
      console.log(`Unfollowed user: ${id}`);
    } catch (err) {
      console.error("Unfollow failed:", err);
    }
  };

  return (
    <div className="mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users?.map((user) => (
          <div key={user._id} className="p-4 bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={user.avatar || "/default-avatar.png"} alt="Avatar" className="w-12 h-12 rounded-full" />
              <span className="text-lg font-semibold">{user.username}</span>
            </div>
            <div>
              <button
                className="px-3 py-1 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 mr-2"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </button>
              <button
                className="px-3 py-1 bg-red-600 rounded-lg shadow-md hover:bg-red-700"
                onClick={() => handleUnfollow(user._id)}
              >
                Unfollow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;