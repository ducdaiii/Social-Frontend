import { FaPlayCircle, FaTag } from "react-icons/fa";

const Badge = ({ children, color = "bg-blue-500" }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mr-2 mb-2 ${color}`}
  >
    {children}
  </span>
);

const ProjectCard = ({ project }) => {
  const renderMedia = () => {
    if (project.videos?.length) {
      return (
        <video
          src={project.videos[0]}
          controls
          className="w-full h-48 object-cover rounded-t-lg"
        />
      );
    }
    if (
      project.images?.length &&
      project.images[0] !==
        "https://i.pinimg.com/736x/9e/a5/e5/9ea5e5255688e5a7a3c6226d36139c.jpg"
    ) {
      return (
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      );
    }
    if (project.files?.length) {
      return (
        <a
          href={project.files[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-indigo-600 font-semibold text-center py-12 border rounded-t-lg hover:bg-indigo-50 transition"
        >
          📄 Tệp đính kèm
        </a>
      );
    }
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-lg text-gray-400">
        <FaPlayCircle size={50} />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col">
      {renderMedia()}

      <div className="p-4 flex-grow flex flex-col">
        {/* Title + badges */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <div className="flex flex-wrap items-center mb-3">
          <Badge color="bg-green-500">{project.status}</Badge>
          <Badge color="bg-purple-600">{project.workingMode}</Badge>
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} color="bg-indigo-400">
              <FaTag className="inline mr-1" /> {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge color="bg-indigo-600">+{project.tags.length - 3} tags</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 flex-grow line-clamp-3 mb-3">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
