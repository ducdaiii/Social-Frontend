import React, { useState, useMemo, use } from "react";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../api/postApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GrClearOption } from "react-icons/gr";
import { useSelector } from "react-redux";
import TopBar from "../components/post/TopBar";
import PostDetailView from "../components/post/PostDetailView";
import SidebarFilter from "../components/post/SidebarFilter";
import PostList from "../components/post/PostList";
import PostModal from "../components/post/PostModal";
import LoginRequiredPopup from "../components/err/LoginRequiredPopup";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import RequestModal from "../components/post/detail/RequestModal";
import { useCreateJoinRequestMutation } from "../api/projectJoinRequestApi";
import { useSendNotificationWithPdfMutation } from "../api/mailApi";
import { useGetUserByIdQuery } from "../api/userApi";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);
  const userError = useSelector((state) => state.auth.error);
  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery();

  const [createPost] = useCreateProjectMutation();
  const [updatePost] = useUpdateProjectMutation();
  const [deletePost] = useDeleteProjectMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [createRequest] = useCreateJoinRequestMutation();
  const [createMail] = useSendNotificationWithPdfMutation();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const userIdToFetch = selectedPost?.author || user?._id;

  const [filters, setFilters] = useState({
    sort: "",
    location: [],
    workingMode: "",
    status: "",
    tags: [],
    roles: [],
    contributions: [],
  });

  const { data: author } = useGetUserByIdQuery(userIdToFetch, {
    skip: !userIdToFetch,
  });

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isLoggedIn = !!user && !userError;

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          (post.title?.toLowerCase() || "").includes(lowerSearch) ||
          (post.description?.toLowerCase() || "").includes(lowerSearch) ||
          (post.author?.toLowerCase() || "").includes(lowerSearch) ||
          (post.workingMode?.toLowerCase() || "").includes(lowerSearch) ||
          (post.status?.toLowerCase() || "").includes(lowerSearch) ||
          (Array.isArray(post.tags)
            ? post.tags.join(", ").toLowerCase().includes(lowerSearch)
            : false) ||
          (Array.isArray(post.location)
            ? post.location.join(", ").toLowerCase().includes(lowerSearch)
            : false) ||
          (Array.isArray(post.roles)
            ? post.roles.join(", ").toLowerCase().includes(lowerSearch)
            : false)
      );
    }

    if (filters.location?.length > 0)
      filtered = filtered.filter(
        (post) =>
          Array.isArray(post.location) &&
          post.location.some((loc) => filters.location.includes(loc))
      );

    if (filters.workingMode)
      filtered = filtered.filter(
        (post) => post.workingMode === filters.workingMode
      );

    if (filters.status)
      filtered = filtered.filter((post) => post.status === filters.status);

    if (filters.tags?.length > 0)
      filtered = filtered.filter(
        (post) =>
          Array.isArray(post.tags) &&
          post.tags.some((tag) => filters.tags.includes(tag))
      );

    if (filters.roles?.length > 0)
      filtered = filtered.filter(
        (post) =>
          Array.isArray(post.roles) &&
          post.roles.some((role) => filters.roles.includes(role))
      );

    if (filters.contributions?.length > 0)
      filtered = filtered.filter(
        (post) =>
          Array.isArray(post.contributions) &&
          post.contributions.some((c) => filters.contributions.includes(c))
      );

    if (filters.sort === "newest") {
      filtered = filtered
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === "oldest") {
      filtered = filtered
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  }, [posts, search, filters]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  const [needRefetch, setNeedRefetch] = useState(false);

  const handleRequest = async ({ letter, file, role }) => {
    try {
      await createRequest({
        user: user._id,
        project: selectedPost._id,
        role: role,
      });

      await createMail({
        to: author.email,
        file: file,
        note: letter,
      });
      setModalOpen(false);
      refetch();
    } catch (err) {
      console.error("Error when send request:", err);
    }
  };

  const handleSubmit = async (postData, editingPostId = null) => {
    try {
      if (editingPostId) {
        await updatePost({
          id: editingPostId,
          data: postData,
        }).unwrap();
      } else {
        await createPost(postData);
      }
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error("Error when submitting the post:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
        refetch();
      } catch (err) {
        console.error("Error when deleting the post:", err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-visible">
      {/* TopBar */}
      <div className="relative left-1/2 transform -translate-x-1/2 w-full sm:max-w-300 px-4 mt-20">
        <TopBar
          search={search}
          setSearch={setSearch}
          onAddPost={() => {
            if (!isLoggedIn) {
              setShowLoginPopup(true);
            } else {
              setSelectedPost(null);
              setShowModal(true);
            }
          }}
        />
      </div>

      {/* Nội dung chính bên dưới */}
      <div className="pt-5 px-6 flex gap-2 min-h-screen">
        {!selectedPost && (
          <div className="sidebar">
            <div className="sticky top-0 z-10 bg-white text-lg font-semibold rounded-lg shadow flex items-center justify-between">
              <span className="m-4 text-emerald-600">Advanced Selection</span>
              <button
                onClick={() => setFilters({})}
                className="mr-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600 transition"
              >
                <GrClearOption />
              </button>
            </div>
            <div className="mt-1">
              <SidebarFilter
                filters={filters}
                setFilters={setFilters}
                posts={posts}
              />
            </div>
          </div>
        )}

        {selectedPost && (
          <div className="relative">
            <div className="sticky top-[70px]">
              <PostDetailView
                postID={selectedPost._id}
                onClose={() => setSelectedPost(null)}
                openRequestModal={() => {
                  if (!user) {
                    setShowLoginPopup(true);
                  } else {
                    setModalOpen(true);
                  }
                }}
              />
            </div>
          </div>
        )}

        <div
          className={`${
            selectedPost ? "justify-start" : "flex-1"
          }  min-h-screen`}
        >
          {/* Pagination trên */}
          <div className="flex justify-end items-center mb-4 space-x-2">
            {/* Previous Page Button */}
            {currentPage > 1 && (
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <GiPreviousButton />
              </button>
            )}

            {/* Current Page Info */}
            <span className="text-white font-semibold">
              {currentPage} / {totalPages}
            </span>

            {/* Next Page Button */}
            {currentPage < totalPages && (
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <GiNextButton />
              </button>
            )}
          </div>

          <PostList
            posts={paginatedPosts}
            isLoading={isLoading}
            isError={isError}
            onEdit={(post) => {
              setSelectedPost(post);
              setShowModal(true);
            }}
            onDelete={handleDelete}
            onSelect={setSelectedPost}
            selectedPost={selectedPost}
            currentUser={user?._id}
            onRefetch={refetch}
          />

          {/* Pagination dưới */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            {/* Previous Page Button */}
            {currentPage > 1 && (
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <GiPreviousButton />
              </button>
            )}

            {/* Current Page Info */}
            <span className="text-white font-semibold">
              {currentPage} / {totalPages}
            </span>

            {/* Next Page Button */}
            {currentPage < totalPages && (
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <GiNextButton />
              </button>
            )}
          </div>
        </div>
      </div>

      <PostModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(formData) => handleSubmit(formData, selectedPost?._id)}
        post={selectedPost}
      />

      <RequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleRequest}
        roles={selectedPost?.roles}
      />

      {/* Popup yêu cầu đăng nhập */}
      <LoginRequiredPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={() => {
          setShowLoginPopup(false);
          navigate("/login");
        }}
      />
    </div>
  );
};

export default Home;
