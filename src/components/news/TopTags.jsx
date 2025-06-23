import React from "react";

const TopTags = ({ tags }) => (
  <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
    <h3 className="font-bold mb-3 text-green-400 text-lg flex items-center gap-2">
      🏷 Top Tags
    </h3>
    {tags.length > 0 ? (
      <ul className="space-y-1">
        {tags.map((tag, idx) => (
          <li
            key={idx}
            className="flex justify-between text-sm text-gray-300 hover:bg-gray-700 px-2 py-1 rounded transition"
          >
            <span className="truncate">{tag.tag}</span>
            <span className="text-gray-400">{tag.percent}%</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No tags data</p>
    )}
  </div>
);

export default TopTags;