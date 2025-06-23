import React from "react";

const TopPositions = ({ positions }) => (
  <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
    <h3 className="font-bold mb-3 text-blue-400 text-lg flex items-center gap-2">
      🔥 Top Positions
    </h3>
    {positions.length > 0 ? (
      <ul className="space-y-1">
        {positions.map((pos, idx) => (
          <li
            key={idx}
            className="flex justify-between text-sm text-gray-300 hover:bg-gray-700 px-2 py-1 rounded transition"
          >
            <span className="truncate">{pos.role}</span>
            <span className="text-gray-400">{pos.percent}%</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No positions data</p>
    )}
  </div>
);

export default TopPositions;