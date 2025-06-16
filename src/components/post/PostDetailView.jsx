import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdOutlineSendTimeExtension } from "react-icons/md";
import { HiMagnifyingGlassCircle, HiUserGroup } from "react-icons/hi2";
import {
  FaLightbulb,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaArchive,
  FaFileAlt,
} from "react-icons/fa";
import { BsLaptop, BsBuilding, BsPeople } from "react-icons/bs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AuthorCard from "../auth/AuthorCard";
import PartList from "../part/ListParts";
import { useSelector } from "react-redux";

dayjs.extend(utc);
dayjs.extend(timezone);

const Badge = ({ children }) => (
  <span className="inline-block bg-emerald-200 text-emerald-800 text-md font-medium mr-2 mb-1 px-2.5 py-0.5 rounded-full">
    {children}
  </span>
);

const statusIcons = {
  Idea: <FaLightbulb className="text-yellow-300" />,
  "In Progress": <FaSpinner className="text-blue-500 animate-spin" />,
  Completed: <FaCheckCircle className="text-green-500" />,
  Cancelled: <FaTimesCircle className="text-red-500" />,
  Archived: <FaArchive className="text-gray-400" />,
};

const workingModeIcons = {
  Remote: <BsLaptop className="text-purple-500" />,
  Onsite: <BsBuilding className="text-orange-500" />,
  Hybrid: <BsPeople className="text-indigo-500" />,
};

const PostDetailView = ({ post, onClose, openRequestModal }) => {
  if (!post) return null;
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.auth.userInfo);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const updatedDate = dayjs(post.updatedAt).tz("Asia/Ho_Chi_Minh");
  const now = dayjs().tz("Asia/Ho_Chi_Minh");
  const daysAgo = now.diff(updatedDate, "day");

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight);
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const cantRequest =
    !user ||
    user._id === post.author ||
    post.status === "Completed" ||
    post.status === "Cancelled" ||
    post.roles.length === 0 ||
    post.members.includes(user._id) ||
    user.projectSend?.some((reqId) => post.joinRequests.includes(reqId));

  const renderMedia = () => {
    if (post.files?.length > 0) {
      return (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
            <FaFileAlt /> Attachments
          </h2>
          <ul className="list-disc list-inside text-blue-600 underline space-y-1">
            {post.files.map((file, i) => (
              <li key={i}>
                <a
                  href={file.replace("/upload/", "/upload/attachment=true/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="hover:text-blue-800"
                >
                  {decodeURIComponent(file.split("/").pop())}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (post.videos?.length > 0) {
      return (
        <div className="mb-8 space-y-6">
          {post.videos.map((video, i) => (
            <video
              key={i}
              src={video}
              controls
              className="w-full rounded-lg min-h-150 shadow-md"
            />
          ))}
        </div>
      );
    }

    if (post.images?.length > 0) {
      return (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={post.images[0]}
            alt="Post media"
            className="w-full h-150 object-cover"
            loading="lazy"
          />
          {post.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50">
              {post.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Additional image ${i + 1}`}
                  className="w-full h-24 object-cover rounded-md shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-[700px] h-[calc(100vh-75px)] bg-white rounded-2xl shadow-xl p-6 flex flex-col border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold leading-snug text-gray-800 max-w-[80%]">
          {post.title.toUpperCase()}
        </h2>
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 p-2 rounded-full transition"
          title="Close"
        >
          <MdCancel className="text-xl" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-1 mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300"
      >
        {renderMedia()}

        <div className="flex justify-center items-center flex-wrap gap-6 text-base font-medium text-gray-800 mb-2">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            {statusIcons[post.status] || (
              <FaLightbulb className="text-gray-400 text-lg" />
            )}
            <span className="text-base">{post.status || "Unknown"}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            {workingModeIcons[post.workingMode] || (
              <BsLaptop className="text-gray-400 text-lg" />
            )}
            <span className="text-base">{post.workingMode || "Unknown"}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            <HiUserGroup className="text-teal-600 text-lg" />
            <span className="text-base">
              {post.joinRequests?.length || 0} requests
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {post.tags?.length > 0 && (
            <div className="flex-1">
              <strong>Tags:</strong>
              <div className="mt-1 flex flex-wrap">
                {post.tags.map((tag, i) => (
                  <Badge key={i}>{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          {post.roles?.length > 0 && (
            <div className="flex-1">
              <strong>Positions:</strong>
              <div className="mt-1 flex flex-wrap">
                {post.roles.map((rol, i) => (
                  <Badge key={i}>{rol}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        {post.location?.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <strong>Locations:</strong>
            <div className="mt-2">
              {post.location.map((loc, i) => (
                <Badge key={i}>{loc}</Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
            {post.description}
          </div>
        </div>

        {post.parts?.length > 0 && <PartList partIds={post?.parts} />}

        <div className="flex italic text-md mt-2 justify-between">
          <AuthorCard id={post?.author} />
        </div>
        <span className="italic text-md text-black">
          Update:{" "}
          {daysAgo === 0
            ? updatedDate.format("HH:mm") + " today"
            : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
        </span>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        {cantRequest || (
          <button
            onClick={openRequestModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-white hover:text-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
          >
            <MdOutlineSendTimeExtension className="text-lg" />
            <span>Request</span>
          </button>
        )}

        <button
          onClick={() => {
            if (post?._id) {
              navigate(`/post/${post._id}`, { state: { post } });
              onClose();
            } else {
              alert("Bài viết chưa được lưu, không có chi tiết để xem.");
            }
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-white hover:text-green-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          <HiMagnifyingGlassCircle className="text-lg" />
          <span>View details</span>
        </button>
      </div>
    </div>
  );
};

export default PostDetailView;
