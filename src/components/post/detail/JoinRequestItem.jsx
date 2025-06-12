import React from "react";
import { useGetJoinRequestByIdQuery } from "../../../api/projectJoinRequestApi";

const JoinRequestItem = ({ requestId, onAccept, onDecline }) => {
  const {
    data: req,
    isLoading,
    isError,
  } = useGetJoinRequestByIdQuery(requestId);

  if (isLoading) return null;
  if (isError || !req || req.status === "Approved") return null;

  return (
    <li className="w-full max-w-xs bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Header background + avatar */}
      <div className="relative h-20 bg-gradient-to-r from-emerald-400 to-green-500">
        <img
          src={req.user?.background || "/default-bg.jpg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <img
            src={req.user?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow object-cover"
          />
        </div>
      </div>

      {/* User info */}
      <div className="pt-8 pb-3 px-3 text-center space-y-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {req.user?.username}
        </h3>
        <p className="text-xs text-gray-500 italic truncate">
          {req.role || "No role specified"}
        </p>

        {/* Status badge if Rejected */}
        {req.status === "Rejected" && (
          <span className="inline-block text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full font-medium mt-2">
            Rejected
          </span>
        )}

        {/* Action buttons only if Pending */}
        {req.status === "Pending" && (
          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={() => onAccept(req._id)}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition"
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(req._id)}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default JoinRequestItem;