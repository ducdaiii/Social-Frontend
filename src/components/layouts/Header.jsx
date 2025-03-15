import { FaBars, FaBell, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import AuthLogo from "../logo/AuthLogo";
import Notifications from "../logo/Notifications";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleUserClick = () => {
    if (window.innerWidth < 768) {
      navigate("/user-profile"); // Chuyển đến trang user khi màn hình nhỏ
    } else {
      setIsDropdownOpen(!isDropdownOpen); // Hiển thị dropdown trên màn hình lớn
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
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white relative">
      {/* Menu Icon - Hiển thị khi thu nhỏ */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖️" : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Logo - Ở giữa khi thu nhỏ, bên trái khi lớn */}
      <Logo className="text-2xl md:flex-1 md:text-left text-center" />

      {/* Icons */}
      <div className="flex items-center gap-4 relative">
        <Notifications />
        <AuthLogo />
      </div>
    </header>
  );
};

export default Header;