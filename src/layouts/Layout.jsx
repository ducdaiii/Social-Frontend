import { Outlet } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
