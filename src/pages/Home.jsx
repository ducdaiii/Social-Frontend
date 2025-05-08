import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-gray-800 text-white p-4">
        <span
          onClick={() => navigate("/maket")}
          className="text-[#00E0FF] hover:underline cursor-pointer"
        >
          Market
        </span>
      </div>
      <div className=" bg-gray-800 text-white p-4">
        <span
          onClick={() => navigate("/mess")}
          className="text-[#00E0FF] hover:underline cursor-pointer"
        >
          Chat
        </span>
      </div>
    </div>
  );
};

export default Home;
