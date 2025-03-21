import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <span
        onClick={() => navigate("/maket")}
        className="text-[#00E0FF] hover:underline cursor-pointer"
      >
        Market
      </span>
    </div>
  );
};

export default Home;
