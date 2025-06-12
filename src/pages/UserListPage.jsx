import React from "react";
import {
  useFollowUserMutation,
  useGetUsersQuery,
  useUnfollowUserMutation,
} from "../api/userApi";
import ErrorPage from "../components/err/ErrorPage";
import { motion } from "framer-motion";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingMotion from "../components/err/LoadingMotion";

const UserListPage = () => {
  const navigate = useNavigate();

  const goToUserDetail = (userId) => {
    navigate(`/detail/${userId}`);
  };

  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const currentUser = useSelector((state) => state.auth.userInfo);
  const authReady = useSelector((state) => state.auth.authReady);

  // Delay render cho đến khi authReady xác nhận
  if (!authReady || isLoading) return <LoadingMotion />;
  if (error) return <ErrorPage />;

  const handleFollow = async (id) => {
    try {
      await followUser(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Follow failed:", err);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      await unfollowUser(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Unfollow failed:", err);
    }
  };

  const isFollowing = (user) => {
    if (!currentUser) return false;
    return user.followers?.includes(currentUser._id);
    // Nếu cần check dạng object: return user.followers?.some(f => f._id === currentUser._id);
  };

  return (
    <div className="mx-auto p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400 drop-shadow-lg">
        🚀 Prominent Authors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users?.map((user, idx) => (
          <motion.div
            key={user._id}
            className="relative overflow-hidden rounded-2xl shadow-xl p-6 flex flex-col items-center text-center bg-gray-900 hover:scale-[1.03] transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {user.background && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${user.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative group">
                <img
                  onClick={() => goToUserDetail(user._id)}
                  src={user.avatar || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-600 shadow-lg group-hover:rotate-[10deg] group-hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </div>
              <h2
                onClick={() => goToUserDetail(user._id)}
                className="mt-4 text-xl font-semibold text-white cursor-pointer"
              >
                {user.username}
              </h2>
              <p className="text-sm text-gray-300">
                {user.followers?.length || 0} Followers
              </p>
              <p className="text-sm text-gray-400 mb-4">
                {user.following?.length || 0} Following
              </p>

              {/* Show follow/unfollow button only if logged in and not current user */}
              {currentUser && user._id !== currentUser._id && (
                <div className="flex gap-3 mt-2">
                  {isFollowing(user) ? (
                    <button
                      onClick={() => handleUnfollow(user._id)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"
                    >
                      <FiUserMinus />
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(user._id)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
                    >
                      <FiUserPlus />
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;