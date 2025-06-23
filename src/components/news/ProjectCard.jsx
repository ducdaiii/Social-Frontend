import React from "react";
import { FaStar, FaDizzy, FaUser, FaCrown, FaMedal } from "react-icons/fa";

const ProjectCard = ({ project, rank }) => {
  if (!project) return null;

  const tags = project.tags || [];
  const roles = project.roles || [];
  const stars = project.giveStar || [];
  const obscures = project.obscurity || [];
  const members = project.members || [];

  let rankBadge = null;
  if (rank === 1) {
    rankBadge = (
      <div className="flex flex-col items-center text-yellow-400 animate-pulse font-bold m-5">
        <FaCrown className="text-3xl drop-shadow-glow" />
        <span>#1</span>
      </div>
    );
  } else if (rank === 2) {
    rankBadge = (
      <div className="flex flex-col items-center text-gray-300 animate-pulse font-bold m-5">
        <FaMedal className="text-3xl drop-shadow-glow" />
        <span>#2</span>
      </div>
    );
  } else if (rank === 3) {
    rankBadge = (
      <div className="flex flex-col items-center text-orange-400 animate-pulse font-bold m-5">
        <FaMedal className="text-3xl drop-shadow-glow" />
        <span>#3</span>
      </div>
    );
  } else if (rank) {
    rankBadge = (
      <div className="flex flex-col items-center text-gray-400 font-semibold m-6">
        <span className="text-lg">#{rank}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {/* Rank nằm ngoài */}
      {rankBadge}

      {/* Card */}
      <div className="w-full mr-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {project.images?.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title || "Project image"}
              className="w-full md:w-48 h-48 object-cover"
            />
          ) : (
            <div className="w-full md:w-48 h-48 bg-gray-700 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="flex-1 p-4 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {project.title || "Untitled"}
            </h3>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 text-xs mb-2">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {roles.length > 0 && (
              <div className="text-sm text-gray-400 mb-2">
                <span className="font-medium text-gray-300">Roles:</span>{" "}
                {roles.slice(0, 3).join(", ")}
              </div>
            )}

            <div className="flex gap-4 text-sm text-gray-300 mt-2 justify-end">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {stars.length}
              </div>
              <div className="flex items-center gap-1">
                <FaDizzy className="text-pink-400" /> {obscures.length}
              </div>
              <div className="flex items-center gap-1">
                <FaUser className="text-blue-400" /> {members.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;