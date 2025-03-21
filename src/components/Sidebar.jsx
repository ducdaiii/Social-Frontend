import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0">

      <nav className="flex flex-col space-y-4 p-6">
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <span className="text-xl">🏠</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <span className="text-xl">📊</span>
          <span>Markets</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;