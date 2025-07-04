import React from "react";

export default function ResourceCard({ resource }) {
  return (
    <div className="card">
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="title"
        title={resource.title}
      >
        {resource.title}
      </a>
      <p className="description">{resource.description || "No description"}</p>
      <div className="meta">
        <span className="source">{resource.source}</span>
        <span className="format">{resource.format}</span>
      </div>
    </div>
  );
}
