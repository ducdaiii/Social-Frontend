import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutSliceAction } from "../../redux/authSlice";

import Logo from "./Logo";
import AuthLogo from "./AuthLogo";

import { FiSettings, FiMoreHorizontal, FiUser } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logoutApi().unwrap();
      dispatch(logoutSliceAction());
      navigate("/login");
    } catch (err) {
      console.error("Logout Failed:", err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/", icon: "fi fi-sr-home", label: "Home" },
    { path: "/users", icon: "fi fi-sr-users", label: "People" },
    { path: "/news", icon: "fi fi-sr-chart-simple", label: "News" },
    { path: "/mess", icon: "fi fi-sr-comment", label: "Chatting" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 text-white shadow-md border-b border-gray-700 z-50 h-16 px-4">
      {/* Logo - trái */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* NavItems - giữa */}
      <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-10">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            title={item.label}
            className={`relative p-3 rounded-lg transition-all duration-300 text-2xl ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className={item.icon}></i>
          </button>
        ))}
      </nav>

      {/* User Info + Dropdown - phải */}
      <div
        className="flex items-center gap-4 ml-auto relative"
        ref={dropdownRef}
      >
        {isLoading ? (
          <p className="text-gray-400 px-2">Đang tải...</p>
        ) : user ? (
          <>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <AuthLogo user={user} isLoading={isLoading} error={error} />
              <FiMoreHorizontal className="w-6 h-6" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-35 w-44 rounded-md bg-gray-800 shadow-lg z-50 ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/detail/${user._id}`);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/settings");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={(e) => {
                    setDropdownOpen(false);
                    handleLogout(e);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <AiOutlineLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
          >
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
