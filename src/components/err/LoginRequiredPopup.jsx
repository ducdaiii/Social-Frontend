import React from "react";
import { FaConnectdevelop } from "react-icons/fa";

const LoginRequiredPopup = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Icon Connectdevelop */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 shadow-lg animate-pulse">
            <FaConnectdevelop className="text-blue-600 text-5xl" />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-gray-900 mb-4 text-center">
          Login request
        </h3>

        <p className="text-center text-gray-700 mb-8 leading-relaxed">
          <span>You need to log in to perform actions.</span> <br/> Please log in to continue.
        </p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onLogin}
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg transition"
          >
            Login
          </button>
        </div>

        {/* Close button góc trên phải */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredPopup;