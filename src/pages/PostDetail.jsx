import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaArrowLeft,
  FaFileAlt,
  FaTag,
  FaClock,
  FaMapMarkerAlt,
  FaNetworkWired,
} from "react-icons/fa";
import classNames from "classnames";
import { useCreatePartMutation, useUpdatePartMutation } from "../api/partApi";
import { useSelector } from "react-redux";
import MembersList from "../components/post/detail/PeopleList";
import JoinRequestList from "../components/post/detail/JoinRequestList";
import PartList from "../components/part/ListParts";
import PartModal from "../components/part/PartModal";
import { useGetProjectByIdQuery } from "../api/postApi";
import LoadingMotion from "../components/err/LoadingMotion";
import {
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
} from "../api/projectJoinRequestApi";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useGetProjectByIdQuery(id);

  const [showPartModal, setShowPartModal] = useState(false);
  const [createPart] = useCreatePartMutation();
  const [updatePart] = useUpdatePartMutation();
  const [editingPart, setEditingPart] = useState(null);
  const [acceptRequest] = useApproveJoinRequestMutation();
  const [deleteRequest] = useRejectJoinRequestMutation();

  const openCreateModal = () => setEditingPart(null);
  const openEditModal = (part) => setEditingPart(part);

  const currentUser = useSelector((state) => state.auth.userInfo);

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <LoadingMotion />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="text-center mt-20 text-red-500">Post not found.</div>
    );
  }

  const handleAccept = async (requestID) => {
    try {
      await acceptRequest(requestID);
      refetch();
    } catch (err) {
      console.error("Failed to accept", err);
      alert("Failed to accept");
    }
  };

  const handleDecline = async (requestID) => {
    try {
      await deleteRequest(requestID);
      refetch();
    } catch (err) {
      console.error("Failed to decline", err);
      alert("Failed to decline");
    }
  };

  const handleSubmit = async (partData, editingPartId = null) => {
    try {
      if (editingPartId) {
        await updatePart({ id: editingPartId, data: partData }).unwrap();
      } else {
        await createPart(partData).unwrap();
      }
      setShowPartModal(false);
      refetch();
    } catch (err) {
      console.error("Failed to create or update part:", err);
      alert("Failed to create or update");
    }
  };

  const isAuthorize =
    currentUser &&
    (currentUser._id === post.author ||
      post.members?.includes(currentUser._id));

  const renderMedia = () => {
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
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  {file.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 mb-20 bg-white rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="flex bg-stone-300 rounded-lg mb-6 text-gray-700 hover:text-white transition border-b-2 border-gray-200 p-2 hover:border-black"
      >
        <FaArrowLeft className="w-10" />
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 flex flex-col gap-8 sticky top-20 self-start">
          <MembersList author={post.author} members={post.members} />

          {currentUser && post?.author === currentUser._id && (
            <JoinRequestList
              requests={post?.joinRequests || []}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          )}
        </aside>

        <main className="md:w-3/4 w-full bg-stone-200 rounded-xl shadow-lg p-6 space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {post.title || "No title"}
          </h1>

          {renderMedia()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-6">
              {post.status && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">Status</h4>
                  <span
                    className={classNames(
                      "inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm capitalize shadow-sm select-none",
                      {
                        "bg-yellow-100 text-yellow-800": post.status === "Idea",
                        "bg-blue-100 text-blue-800":
                          post.status === "In Progress",
                        "bg-green-100 text-green-800":
                          post.status === "Completed",
                        "bg-red-100 text-red-800": post.status === "Cancelled",
                        "bg-gray-300 text-gray-800": post.status === "Archived",
                      }
                    )}
                  >
                    <FaClock className="w-4 h-4" /> {post.status}
                  </span>
                </div>
              )}

              {post.workingMode && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">
                    Working Mode
                  </h4>
                  <span
                    className={classNames(
                      "inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm capitalize shadow-sm select-none",
                      {
                        "bg-green-100 text-green-800":
                          post.workingMode === "Remote",
                        "bg-orange-100 text-orange-800":
                          post.workingMode === "Onsite",
                        "bg-purple-100 text-purple-800":
                          post.workingMode === "Hybrid",
                      }
                    )}
                  >
                    <FaNetworkWired className="w-4 h-4" /> {post.workingMode}
                  </span>
                </div>
              )}

              {post.roles?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">Roles</h4>
                  <div className="flex flex-wrap gap-3">
                    {post.roles.map((role, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full select-none shadow-sm"
                        title="Role"
                      >
                        <FaTag className="w-3.5 h-3.5" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {post.location?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">
                    Location
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {post.location.map((loc, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full select-none shadow-sm"
                        title="Location"
                      >
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {post.tags?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-200 text-blue-900 px-4 py-1.5 rounded-full text-sm font-semibold select-none cursor-default shadow-md hover:bg-blue-300 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <section className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
            {post.description || "No description"}
          </section>

          <PartList
            partIds={post.parts}
            isAuthorize={isAuthorize}
            handleEdit={(part) => {
              setEditingPart(part);
              setShowPartModal(true);
            }}
          />

          {isAuthorize && (
            <button
              onClick={() => {
                setEditingPart(null);
                setShowPartModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaPlusCircle /> Add Part
            </button>
          )}

          <PartModal
            isOpen={showPartModal}
            onClose={() => setShowPartModal(false)}
            onSubmit={(formData, partId) => handleSubmit(formData, partId)}
            defaultData={editingPart}
            projectId={post._id}
          />
        </main>
      </div>
    </div>
  );
};

export default PostDetail;
