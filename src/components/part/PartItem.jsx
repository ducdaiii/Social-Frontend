import React from "react";
import {
  FaImage,
  FaVideo,
  FaFileAlt,
  FaUser,
  FaLightbulb,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaArchive,
  FaRegEdit,
} from "react-icons/fa";
import classNames from "classnames";
import { useGetPartByIdQuery } from "../../api/partApi";


const statusDisplayMap = {
  Idea: {
    icon: <FaLightbulb className="text-yellow-500" />,
    bg: "bg-yellow-100 text-yellow-800",
  },
  "In Progress": {
    icon: <FaSpinner className="text-blue-500 animate-spin" />,
    bg: "bg-blue-100 text-blue-800",
  },
  Completed: {
    icon: <FaCheckCircle className="text-green-500" />,
    bg: "bg-green-100 text-green-800",
  },
  Cancelled: {
    icon: <FaTimesCircle className="text-red-500" />,
    bg: "bg-red-100 text-red-800",
  },
  Archived: {
    icon: <FaArchive className="text-gray-400" />,
    bg: "bg-gray-200 text-gray-700",
  },
};

const PartItem = ({ id, isAuthorize, handleEdit }) => {
  const { data: part, isLoading, isError } = useGetPartByIdQuery(id);

  if (isLoading) {
    return (
      <div className="w-full p-6 rounded-2xl bg-gray-100 animate-pulse">
        Loading part...
      </div>
    );
  }

  if (isError || !part) {
    return (
      <div className="w-full p-6 rounded-2xl bg-red-50 text-red-500">
        Error loading part.
      </div>
    );
  }

  const status = statusDisplayMap[part.status] || {
    icon: null,
    bg: "bg-gray-200 text-gray-700",
  };

  let mediaDisplay = null;
  if (part.videos && part.videos.length > 0) {
    mediaDisplay = (
      <video
        src={part.videos[0]}
        controls
        className="w-full min-h-120 rounded-lg mb-4 object-cover shadow-md"
      />
    );
  } else if (part.images && part.images.length > 0) {
    mediaDisplay = (
      <img
        src={part.images[0]}
        alt={part.title}
        className="w-full min-h-120 rounded-lg mb-4 object-cover shadow-md"
        loading="lazy"
      />
    );
  } else if (part.files && part.files.length > 0) {
    mediaDisplay = (
      <div className="mb-4">
        <h4 className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
          <FaFileAlt /> Attachments
        </h4>
        <ul className="list-disc list-inside text-blue-600 underline space-y-1">
          {part.files.map((file, i) => (
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

  return (
    <div className="w-full bg-white/60 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-blue-200 rounded-2xl p-6 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">
          {part.title.toUpperCase()}
        </h3>
        <div className="flex items-center gap-4">
          <span
            className={classNames(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold",
              status.bg
            )}
          >
            {status.icon} {part.status}
          </span>
          {isAuthorize && (
            <button
              onClick={() => handleEdit(part)}
              className="text-green-600 hover:text-blue-800 text-lg font-medium p-1 rounded-lg"
              title="Edit part"
            >
              <FaRegEdit />
            </button>
          )}
        </div>
      </div>

      {mediaDisplay}

      <p className="text-gray-700 whitespace-pre-wrap mb-4">
        {part.description}
      </p>

      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <FaImage /> {part.images?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <FaVideo /> {part.videos?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <FaFileAlt /> {part.files?.length || 0}
        </span>
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-1">
        <FaUser className="text-gray-400" />
        Created by: {part?.author || "Unknown"}
      </div>
    </div>
  );
};

export default PartItem;