import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PartModal = ({ isOpen, onClose, onSubmit, defaultData, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Idea");
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    setTitle(defaultData?.title || "");
    setDescription(defaultData?.description || "");
    setStatus(defaultData?.status || "Idea");
    setFile(null);
  }, [defaultData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("status", status);
    formData.append("project", projectId);
    formData.append("createdBy", userInfo?._id);
    formData.append("author", userInfo?.username);

    onSubmit(formData, defaultData?._id || null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-emerald-700">
          {defaultData ? "Edit Part" : "New Part Creation"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*,video/*,.pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-3"
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Idea">Idea</option>
            <option value="In-progress">In-progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
            >
              {defaultData ? "Save Changes" : "Create Part"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartModal;
