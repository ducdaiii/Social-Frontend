import React from "react";

const sources = [
  { label: "ALL", value: "all" },
  { label: "GitHub", value: "GitHub" },
  { label: "FreeCodeCamp", value: "FreeCodeCamp" },
  { label: "Dev.to", value: "Dev.to" },
  { label: "StackOverflow", value: "StackOverflow" },
  { label: "UX Design.cc", value: "UX Design.cc" },
  { label: "Mind the Product", value: "Mind the Product" },
];

export default function SourceSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select"
    >
      {sources.map((src) => (
        <option key={src.value} value={src.value}>
          {src.label}
        </option>
      ))}
    </select>
  );
}
