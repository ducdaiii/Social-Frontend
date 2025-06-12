import React from "react";
import LoadingMotion from "../err/LoadingMotion";
import ErrorPage from "../err/ErrorPage";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";

const ProjectUserList = ({ data, isLoading, error }) => {
  const projects = data?.data || [];

  if (isLoading) return <LoadingMotion />;
  if (error) return <ErrorPage error={error} />;
  if (!projects.length)
    return (
      <p className="text-center text-gray-400 mt-8">
        Let's explore our projects
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project._id}
            to={`/post/${project._id}`}
            className="block"
          >
            <ProjectCard key={project._id} project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectUserList;
