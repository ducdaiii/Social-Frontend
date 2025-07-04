import React from "react";

export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
}
