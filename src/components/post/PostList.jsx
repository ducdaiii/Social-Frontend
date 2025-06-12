import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MoreVertical, Bookmark, Flag, Edit, Trash2 } from "lucide-react";
import LoadingMotion from "../err/LoadingMotion";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const PostList = ({
  posts,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onSelect,
  selectedPost,
  currentUser,
  onRefetch,
}) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const lastCountRef = useRef(posts?.length || 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const interval = setInterval(() => {
      const currentCount = posts.length;

      if (currentCount !== lastCountRef.current) {
        onRefetch?.();
        lastCountRef.current = currentCount;
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [posts, onRefetch]);

  if (isLoading) return <LoadingMotion />;
  if (isError) return <div className="text-red-500">Fail</div>;
  if (!posts.length)
    return <div className="text-gray-500">There aren't any posts</div>;

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const isSelected = selectedPost?._id === post._id;
        const isAuthor = post.author === currentUser;

        let mediaUrl = null;
        if (Array.isArray(post.images) && post.images.length > 0) {
          mediaUrl = post.images[0];
        } else if (typeof post.images === "string" && isImage(post.images)) {
          mediaUrl = post.images;
        } else if (Array.isArray(post.videos) && post.videos.length > 0) {
          mediaUrl = post.videos[0];
        } else if (typeof post.video === "string" && isVideo(post.video)) {
          mediaUrl = post.video;
        }

        return (
          <div
            key={post._id}
            className={`relative flex bg-white min-w-100 rounded-lg shadow hover:shadow-md transition cursor-pointer ${
              isSelected
                ? "border-4 border-green-500"
                : "border border-transparent"
            }`}
            onClick={() => onSelect?.(post)}
            style={{ minHeight: 150 }}
          >
            {/* Nội dung bên trái */}
            <div className="flex-1 p-4 flex flex-col justify-between text-stone-700 hover:text-stone-500">
              <div>
                <h3
                  className="font-semibold text-lg mb-2 clamp-3-lines text-stone-600 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/post/${post._id}`);
                  }}
                >
                  {post.title.toUpperCase() || "Title not available"}
                </h3>
                <p className="text-gray-700 text-sm clamp-3-lines">
                  {post.description || "Description not available"}
                </p>
              </div>
              <span className="italic text-sm text-stone-800">
                Update:{" "}
                {dayjs(post.updatedAt)
                  .tz("Asia/Ho_Chi_Minh")
                  .format("DD/MM/YYYY")}
              </span>
            </div>

            {/* Media bên phải */}
            <div className="w-50 h-50 overflow-hidden rounded-r-lg bg-gray-100 flex items-center justify-center">
              {mediaUrl ? (
                isImage(mediaUrl) ? (
                  <img
                    src={mediaUrl}
                    alt="media"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : isVideo(mediaUrl) ? (
                  <video
                    src={mediaUrl}
                    className="object-cover w-full h-full"
                    muted
                    loop
                    playsInline
                    controls={false}
                  />
                ) : (
                  <div className="text-gray-500 text-xs">
                    Media not supported
                  </div>
                )
              ) : (
                <div className="text-gray-400 text-xs">
                  Image/video not available
                </div>
              )}
            </div>

            {/* Menu ba chấm */}
            <div className="absolute top-2 right-2 z-20">
              <button
                className="p-1 rounded hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === post._id ? null : post._id);
                }}
              >
                <MoreVertical size={20} />
              </button>

              {/* Menu options */}
              {openMenuId === post._id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow z-30"
                >
                  {isAuthor ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(post);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={16} /> Sửa bài
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(post._id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                      >
                        <Trash2 size={16} /> Xóa bài
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Bài viết đã được lưu!");
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Bookmark size={16} /> Lưu bài
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Báo cáo bài viết này đã được gửi!");
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-orange-600"
                      >
                        <Flag size={16} /> Báo cáo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
