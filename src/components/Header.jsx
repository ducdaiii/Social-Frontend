import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../api/userApi";
import Logo from "./Logo";
import AuthLogo from "./AuthLogo";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const userId = userInfo?.sub;
  const { data: user, error, isLoading } = useGetUserByIdQuery(userId, {
    skip: !userId, 
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      <div className="md:hidden">
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1">
        <Logo />
        <div className="w-64 h-8 bg-gray-700 rounded-md"></div>
      </div>

      <div className="md:hidden absolute left-1/2 -translate-x-1/2">
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        {/* Truyền thông tin user xuống AuthLogo */}
        <AuthLogo user={user} isLoading={isLoading} error={error} />

        {/* Ẩn LOGIN nếu user đã đăng nhập */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
          >
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;