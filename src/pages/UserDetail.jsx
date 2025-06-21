import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AuthorCard from "../components/auth/AuthorCard";
import {
  useGetProjectsByAuthorQuery,
  useGetProjectsJoinQuery,
} from "../api/postApi";
import ProjectUserList from "../components/detail/ProjectUserList";
import UserProfileForm from "../components/auth/UserProfileForm";

const UserDetail = () => {
  const { id } = useParams();

  const authorProjects = useGetProjectsByAuthorQuery(id);
  const joinedProjects = useGetProjectsJoinQuery(id);

  const [activeTab, setActiveTab] = useState("created");

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 relative">
      <AuthorCard id={id} />

      <UserProfileForm id={id} />

      {/* Tab Header */}
      <div className="mt-10 border-b border-gray-300 flex justify-between">
        <button
          onClick={() => setActiveTab("created")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-2xl
            ${
              activeTab === "created"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
            }
          `}
        >
          Owner Projects
        </button>

        <button
          onClick={() => setActiveTab("joined")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-2xl
            ${
              activeTab === "joined"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
            }
          `}
        >
          Joined Projects
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "created" && <ProjectUserList {...authorProjects} />}
        {activeTab === "joined" && <ProjectUserList {...joinedProjects} />}
      </div>
    </div>
  );
};

export default UserDetail;