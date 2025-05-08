import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", icon: "🏠", label: "Dashboard" },
    { path: "/markets", icon: "📊", label: "Markets" },
    { path: "/profile", icon: "👤", label: "Profile" },
    { path: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className={`hidden md:block fixed left-0 h-screen w-1/5 text-white top-25`}>
      <nav className="flex flex-col space-y-4 p-6">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;