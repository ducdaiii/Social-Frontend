import React, { useState, useEffect } from "react";

const RequestModal = ({ isOpen, onClose, onSubmit, roles = [] }) => {
  const [letter, setLetter] = useState("");
  const [file, setFile] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0]);
    }
  }, [roles]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!letter.trim()) {
      setError("Letter of recommendation cannot be empty.");
      return;
    }
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }
    if (!selectedRole && roles.length > 1) {
      setError("Please select a role.");
      return;
    }
    setError("");
    onSubmit({ letter, file, role: selectedRole });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Request Letter</h2>
        {error && <p className="mb-3 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-gray-700 font-medium">
            Letter of Recommendation
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded resize-none h-24"
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="Write your letter here..."
              required
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Upload PDF File
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="mt-1"
            />
          </label>

          {/* Role selection or display */}
          {roles.length === 1 ? (
            <div className="text-gray-700 font-medium">
              Role: <span className="font-semibold">{roles[0]}</span>
            </div>
          ) : roles.length > 1 ? (
            <label className="flex flex-col text-gray-700 font-medium">
              Select Role
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded"
                required
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
