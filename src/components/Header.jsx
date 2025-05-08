import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../api/userApi";
import Logo from "./Logo";
import AuthLogo from "./AuthLogo";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Xóa thông tin user khỏi localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");

      console.log("Đã logout thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Logout Failed:", err?.data?.message);
    }
  };

  const userId = userInfo?.sub;
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // Danh sách điều hướng
  const navItems = [
    { path: "/", icon: "fi fi-sr-home", label: "Home" },
    { path: "/userRequest", icon: "fi fi-sr-users", label: "Friends" },
    { path: "/maket", icon: "fi fi-sr-chart-simple", label: "Maket" },
    { path: "/mess", icon: "fi fi-sr-comment", label: "Chatting" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-900 text-white shadow-md border-b-1">
      {/* Logo bên trái */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Biểu tượng giữa (ẩn trên mobile) */}
      <div className="hidden md:flex flex-1 justify-center gap-30">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative p-3 rounded-lg transition-all duration-300 text-2xl ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <i className={item.icon}></i>
          </button>
        ))}
      </div>

      {/* User profile bên phải */}
      <div className="flex items-center gap-4">
        <AuthLogo user={user} isLoading={isLoading} error={error} />
        {userInfo ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
          >
            LOGOUT
          </button>
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
