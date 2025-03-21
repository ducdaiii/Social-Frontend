import { Outlet } from "react-router-dom";
import Header from "../components/Header"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header/>
      <main className="flex-grow mt-25">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
