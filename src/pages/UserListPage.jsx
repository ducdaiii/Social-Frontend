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

  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const currentUser = useSelector((state) => state.auth.userInfo);
  const authReady = useSelector((state) => state.auth.authReady);

  if (!authReady || isLoading) return <LoadingMotion />;
  if (error) return <ErrorPage />;

  const goToUserDetail = (userId) => {
    navigate(`/detail/${userId}`);
  };

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
  };

  const getFollowerLevel = (count) => {
    if (count >= 200) return { tag: "Legendary", level: 4 };
    if (count >= 50) return { tag: "Rare", level: 3 };
    if (count >= 10) return { tag: "Uncommon", level: 2 };
    return { tag: "Newbie", level: 1 };
  };

  const getFollowingLevel = (count) => {
    if (count >= 200) return { tag: "Influencer", level: 4 };
    if (count >= 50) return { tag: "Networker", level: 3 };
    if (count >= 10) return { tag: "Connector", level: 2 };
    return { tag: "Explorer", level: 1 };
  };

  return (
    <div className="mx-auto mt-15 p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-blue-400 drop-shadow-lg">
        🚀 Prominent Authors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {users?.map((user, idx) => {
          const followerData = getFollowerLevel(user.followers.length);
          const followingData = getFollowingLevel(user.following.length);

          const displayTag =
            followerData.level >= followingData.level
              ? followerData.tag
              : followingData.tag;

          return (
            <motion.div
              key={user._id}
              className="relative bg-black rounded-2xl border border-gray-700 shadow-2xl overflow-hidden w-full"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 50px rgba(59,130,246,0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative w-full h-50 bg-blue-400 cursor-pointer">
                {/* Tag */}
                <div className="absolute z-10 top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-md shadow">
                  {displayTag}
                </div>

                {/* Background image clickable */}
                <img
                  src={user.background || "/default-bg.png"}
                  alt="background"
                  className="absolute inset-0 w-full h-full object-cover"
                  onClick={() => goToUserDetail(user._id)}
                />

                {/* Avatar clickable */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
                    onClick={() => goToUserDetail(user._id)}
                  />
                </div>

                {/* ETH tag */}
                <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-sm font-semibold px-4 py-1 rounded-t-md shadow">
                  {user.projectSend.length > 0 ? user.projectSend.length + " Requests" : "Reader"}
                </div>
              </div>

              <div className="p-4 text-white text-center">
                <div className="font-bold text-lg">
                  {user.username || "Unknown"}
                </div>
                <p className="text-sm text-gray-400">
                  {user.followers?.length || 0} Followers
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {user.following?.length || 0} Following
                </p>

                {currentUser && user._id !== currentUser._id && (
                  <div className="flex justify-center mt-2">
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
          );
        })}
      </div>
    </div>
  );
};

export default UserListPage;