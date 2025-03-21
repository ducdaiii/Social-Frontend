import React from "react";
import CryptoList from "../components/CryptoList";
import Sidebar from "../components/SideBar";

const CryptoOverview = () => {
  return (
    <div className="flex">
      {/* Sidebar chỉ hiển thị trên màn hình md trở lên */}
      <Sidebar className="hidden md:block w-64" />
      
      {/* Phần nội dung co giãn phù hợp */}
      <div className="flex-1 p-4 md:ml-64">
        <CryptoList />
      </div>
    </div>
  );
};

export default CryptoOverview;