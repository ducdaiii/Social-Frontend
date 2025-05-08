import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-800">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-grow w-full h-[calc(100vh-4rem)]">
        {/* Sidebar chiếm 25% */}
        <div className="w-1/5 text-white">
          {/* <Sidebar /> */}
        </div>

        {/* Nội dung chính (Outlet) chiếm 75% */}
        <div className="w-4/5 overflow-auto p-24 pr-0 pb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;