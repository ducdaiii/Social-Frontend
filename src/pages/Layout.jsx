import { Outlet } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = () => {

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-800 relative">
      <Header />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8  pb-6">
          <Outlet />
        </div>
      </main>

      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed top-1/2 right-8 transform -translate-y-1/2 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
          aria-label="Scroll to top"
          title="Lên đầu trang"
        >
          <FaArrowAltCircleUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </button>
      )}
    </div>
  );
};

export default Layout;