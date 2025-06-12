import React from "react";
import PartItem from "./PartItem"; // Đường dẫn tùy thuộc vào vị trí thực tế

const PartList = ({ partIds, isAuthorize, handleEdit }) => {
  if (!partIds || partIds.length === 0) {
    return <div className="p-4 text-gray-500 italic">No parts available.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {partIds.map((id) => (
        <PartItem
          key={id}
          id={id}
          isAuthorize={isAuthorize}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default PartList;