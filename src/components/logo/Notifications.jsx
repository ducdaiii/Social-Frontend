import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaExclamation, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleUserClick = () => {
    if (window.innerWidth < 768) {
      navigate("/notifications"); 
    } else {
      setIsDropdownOpen(!isDropdownOpen); 
    }
  };

  // Đóng dropdown khi bấm ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <FaBell
        className="h-6 w-6 cursor-pointer"
        onClick={handleUserClick}
      />

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-1/2 translate-x-1/3 mt-2 w-44 bg-white text-black shadow-lg rounded-lg">
          <ul className="py-2">
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <FaExclamation className="text-red-600" /> Alert Settings
            </li>
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => alert("Logged Out!")}
            >
              <FaExclamation className="text-gray-600" /> Alert Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;