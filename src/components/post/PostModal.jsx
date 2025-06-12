import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  allTagSuggestions,
  allLocationSuggestions,
  allRoleSuggestions,
  allStatusSuggestions,
} from "../../utilities/data";

const PostModal = ({ isOpen, onClose, onSubmit, post }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Idea");
  const [workingMode, setWorkingMode] = useState("Remote");
  const [file, setFile] = useState(null);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [customRoles, setCustomRoles] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [customTags, setCustomTags] = useState([]);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [customLocations, setCustomLocations] = useState([]);

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?._id;

  const roleOptions = allRoleSuggestions.map((r) => ({ label: r, value: r }));
  const tagOptions = allTagSuggestions.map((t) => ({ label: t, value: t }));
  const locationOptions = allLocationSuggestions.map((l) => ({
    label: l,
    value: l,
  }));

  useEffect(() => {
    setTitle(post?.title || "");
    setDescription(post?.description || "");
    setStatus(post?.status || "Idea");
    setWorkingMode(post?.workingMode || "Remote");
    setSelectedRoles(post?.roles?.map((r) => ({ label: r, value: r })) || []);
    setSelectedTags(post?.tags?.map((t) => ({ label: t, value: t })) || []);
    setSelectedLocations(
      post?.location?.map((l) => ({ label: l, value: l })) || []
    );
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("status", status);
    formData.append("workingMode", workingMode);
    formData.append("author", userId);

    const rolesToSubmit = selectedRoles
      .filter((r) => r.value !== "Other")
      .map((r) => r.value)
      .concat(customRoles);

    const tagsToSubmit = selectedTags
      .filter((t) => t.value !== "Other")
      .map((t) => t.value)
      .concat(customTags);

    const locationsToSubmit = selectedLocations
      .filter((l) => l.value !== "Other")
      .map((l) => l.value)
      .concat(customLocations);

    formData.append("roles", JSON.stringify(rolesToSubmit));
    formData.append("tags", JSON.stringify(tagsToSubmit));
    formData.append("location", JSON.stringify(locationsToSubmit));

    onSubmit(formData, post?._id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          {post?._id ? "Update Post" : "Create New Post"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full h-28 p-3 border rounded resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Roles */}
        <label className="block mt-3">Roles</label>
        <Select
          isMulti
          options={[...roleOptions, { label: "Other", value: "Other" }]}
          value={selectedRoles}
          onChange={(selected) => setSelectedRoles(selected || [])}
        />
        
        {selectedRoles.some((r) => r.value === "Other") && (
          <input
            className="mt-2 w-full border p-2 rounded"
            placeholder="Enter custom roles (comma separated)"
            value={customRoles.join(", ")}
            onChange={(e) =>
              setCustomRoles(e.target.value.split(",").map((s) => s.trim()))
            }
          /> 
        )}

        {/* Tags */}
        <label className="block mt-3">Tags</label>
        <Select
          isMulti
          options={[...tagOptions, { label: "Other", value: "Other" }]}
          value={selectedTags}
          onChange={(selected) => setSelectedTags(selected || [])}
        />
        {selectedTags.some((t) => t.value === "Other") && (
          <input
            className="mt-2 w-full border p-2 rounded"
            placeholder="Enter custom tags (comma separated)"
            value={customTags.join(", ")}
            onChange={(e) =>
              setCustomTags(e.target.value.split(",").map((s) => s.trim()))
            }
          />
        )}

        {/* Status & Mode */}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <select
            className="p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {allStatusSuggestions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={workingMode}
            onChange={(e) => setWorkingMode(e.target.value)}
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Location */}
        <label className="block mt-3">Location</label>
        <Select
          isMulti
          options={[...locationOptions, { label: "Other", value: "Other" }]}
          value={selectedLocations}
          onChange={(selected) => setSelectedLocations(selected || [])}
        />
        {selectedLocations.some((l) => l.value === "Other") && (
          <input
            className="mt-2 w-full border p-2 rounded"
            placeholder="Enter custom locations (comma separated)"
            value={customLocations.join(", ")}
            onChange={(e) =>
              setCustomLocations(e.target.value.split(",").map((s) => s.trim()))
            }
          />
        )}

        {/* File */}
        <input
          type="file"
          accept="image/*,video/*,.pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-3"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {post?._id ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;