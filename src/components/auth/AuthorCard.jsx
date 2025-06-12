import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaRedditAlien,
  FaStackOverflow,
} from "react-icons/fa";
import { useGetUserByIdQuery } from "../../api/userApi";

const AuthorCard = ({ id }) => {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);
  const navigate = useNavigate();

  const renderSocialIcon = (url) => {
    if (url.includes("facebook.com")) return <FaFacebookF />;
    if (url.includes("linkedin.com")) return <FaLinkedinIn />;
    if (url.includes("github.com")) return <FaGithub />;
    if (url.includes("twitter.com")) return <FaTwitter />;
    if (url.includes("instagram.com")) return <FaInstagram />;
    if (url.includes("youtube.com")) return <FaYoutube />;
    if (url.includes("tiktok.com")) return <FaTiktok />;
    if (url.includes("pinterest.com")) return <FaPinterestP />;
    if (url.includes("reddit.com")) return <FaRedditAlien />;
    if (url.includes("stackoverflow.com")) return <FaStackOverflow />;
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full h-40 rounded-xl flex justify-center items-center bg-gray-100">
        <p className="text-gray-500">Loading author...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="w-full h-40 rounded-xl flex justify-center items-center bg-red-100">
        <p className="text-red-500">Failed to load author data.</p>
      </div>
    );
  }

  // Chuyển đến trang user detail
  const goToUserDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md border border-gray-200">
      {/* Background image */}
      <img
        src={user.background || "/default-bg.jpg"}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content container: flex row */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-start gap-4">
        {/* Left: Avatar + info */}
        <div
          className="flex items-start gap-4 cursor-pointer"
          onClick={goToUserDetail}
        >
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.username || "Anonymous"}
            className="w-24 h-24 rounded-full border-2 border-white shadow-lg object-cover"
          />
          <div className="text-white drop-shadow-md flex flex-col justify-center">
            <p className="text-lg font-bold leading-tight">
              {user.username || "Anonymous"}
            </p>

            {user.email && (
              <p className="flex items-center gap-2 mt-1 text-sm opacity-80">
                <FiMail /> {user.email}
              </p>
            )}

            {user.role && (
              <span className="mt-4 bg-white/40 backdrop-blur-sm text-neutral-800 text-md px-3 py-0.5 rounded-full shadow-inner border border-white/30 w-fit">
                {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Right: Social links (cột dọc) */}
        {user.socialLinks && user.socialLinks.length > 0 && (
          <div className="grid grid-rows-3 gap-3 text-white">
            {user.socialLinks.map((link, idx) => {
              const icon = renderSocialIcon(link);
              if (!icon) return null;
              return (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 text-2xl text-white hover:text-emerald-400 transition-colors"
                  title={link}
                >
                  <span
                    className="absolute text-white right-full mr-2 whitespace-nowrap rounded bg-emerald-600 px-2 py-0.5 text-xs font-semibold opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 select-none"
                  >
                    Go to
                  </span>
                  <span className="transform transition-transform duration-300 group-hover:scale-125">
                    {icon}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
