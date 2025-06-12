import React, { useState } from "react";
import JoinRequestItem from "./JoinRequestItem";

const JoinRequestList = ({ requests = [], onAccept, onDecline }) => {
  const [requestIds, setRequestIds] = useState(requests);

  const handleAccept = async (id) => {
    await onAccept(id);
    setRequestIds((prev) => prev.filter((r) => r !== id)); 
  };

  const handleDecline = async (id) => {
    await onDecline(id);
    setRequestIds((prev) => prev.filter((r) => r !== id)); 
  };

  if (!requestIds.length) return null;

  return (
    <section className="mb-8 p-4 bg-stone-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Join Requests</h2>
      <ul className="space-y-4">
        {requestIds.map((id) => (
          <JoinRequestItem
            key={id}
            requestId={id}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))}
      </ul>
    </section>
  );
};

export default JoinRequestList;