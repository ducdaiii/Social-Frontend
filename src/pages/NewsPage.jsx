import React, { useEffect } from "react";
import Sidebar from "../components/news/Sidebar";
import ProjectCard from "../components/news/ProjectCard";
import { useRankProjectQuery } from "../api/postApi";
import LoadingMotion from "../components/err/LoadingMotion";

const NewsPage = () => {
  const {
    data: projects,
    error,
    isLoading,
  } = useRankProjectQuery(undefined, {
    pollingInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-gray-900 mt-18 rounded-lg text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="md:col-span-3 flex flex-col gap-6">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-glow mb-4">
            Highlighted Projects
          </h1>

          {isLoading ? (
            <LoadingMotion />
          ) : error ? (
            <p className="text-red-500">Error loading projects</p>
          ) : (
            projects?.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                rank={index + 1}
              />
            ))
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default NewsPage;
