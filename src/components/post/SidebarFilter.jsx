import React from "react";
import clsx from "clsx";
import {
  allLocationSuggestions,
  allRoleSuggestions,
  allStatusSuggestions,
  allTagSuggestions,
} from "../../utilities/data";

const SidebarFilter = ({ filters, setFilters, posts }) => {
  const sortOptions = [
    { value: "newest", label: "Recently" },
    { value: "oldest", label: "Before" },
  ];

  const workingModeOptions = ["Remote", "Onsite", "Hybrid"];
  const contributionsOptions = ["Code", "Design", "Test"];

  const allSuggestionsMap = {
    tags: allTagSuggestions,
    location: allLocationSuggestions,
    roles: allRoleSuggestions,
  };

  // Hàm lấy giá trị thực tế (unique) của 1 field trong posts
  const getActualValues = (field) => {
    const values = new Set();
    posts.forEach((post) => {
      if (Array.isArray(post[field])) {
        post[field].forEach((v) => values.add(v));
      } else if (post[field]) {
        values.add(post[field]);
      }
    });
    return Array.from(values);
  };

  const handleChange = (field, value) => {
    const suggestionList = allSuggestionsMap[field] || [];
    const actualValues = getActualValues(field);

    setFilters((prev) => {
      const prevValue = prev[field];

      if (value === "Other") {
        // Tính các giá trị actual ngoài suggestions
        const otherValues = actualValues.filter(
          (v) => !suggestionList.includes(v)
        );

        if (Array.isArray(prevValue)) {
          // Nếu đã chọn Other thì bỏ chọn, ngược lại chọn tất cả giá trị Other
          if (
            otherValues.every((v) => prevValue.includes(v)) &&
            prevValue.length === otherValues.length
          ) {
            return { ...prev, [field]: [] }; 
          } else {
            return { ...prev, [field]: otherValues };
          }
        } else {
          // Nếu filter là single value thì toggle
          if (prevValue === "Other") {
            return { ...prev, [field]: "" };
          } else {
            return { ...prev, [field]: "Other" };
          }
        }
      }

      if (Array.isArray(prevValue)) {
        if (prevValue.includes(value)) {
          return { ...prev, [field]: prevValue.filter((v) => v !== value) };
        } else {
          return { ...prev, [field]: [...prevValue, value] };
        }
      } else {
        return { ...prev, [field]: prevValue === value ? "" : value };
      }
    });
  };

  const renderOptionButtons = (label, field, options) => {
    const isMulti = Array.isArray(filters[field]);
    const suggestionList = allSuggestionsMap[field] || [];
    const actualValues = getActualValues(field);

    const extendedOptions = [...options];
    if (field in allSuggestionsMap) {
      extendedOptions.push("Other");
    }

    return (
      <div>
        <h3 className="font-semibold mb-2">{label}</h3>
        <div className="flex flex-wrap gap-2">
          {extendedOptions.map((opt) => {
            if (opt === "Other") {
              const selected =
                isMulti &&
                Array.isArray(filters[field]) &&
                filters[field].length > 0 &&
                filters[field].every((v) => !suggestionList.includes(v)) &&
                filters[field].length ===
                  actualValues.filter((v) => !suggestionList.includes(v))
                    .length;

              return (
                <button
                  key="Other"
                  onClick={() => handleChange(field, "Other")}
                  className={clsx(
                    "px-3 py-1 rounded border",
                    selected
                      ? "bg-emerald-700 text-white border-blue-500"
                      : "bg-white text-emerald-700 hover:bg-gray-100"
                  )}
                >
                  Other
                </button>
              );
            }

            const val = typeof opt === "string" ? opt : opt.value;
            const selected = isMulti
              ? filters[field]?.includes(val)
              : filters[field] === val;

            return (
              <button
                key={val}
                onClick={() => handleChange(field, val)}
                className={clsx(
                  "px-3 py-1 rounded border",
                  selected
                    ? "bg-emerald-700 text-white border-blue-500"
                    : "bg-white text-emerald-700 hover:bg-gray-100"
                )}
              >
                {typeof opt === "string" ? opt : opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="hidden md:block w-full md:w-80 lg:w-85 p-4 bg-white rounded-lg shadow space-y-6 sticky top-24 text-md text-stone-700">
      {renderOptionButtons("Sort", "sort", sortOptions)}
      {renderOptionButtons("Location", "location", allLocationSuggestions)}
      {renderOptionButtons("Working Mode", "workingMode", workingModeOptions)}
      {renderOptionButtons("Status", "status", allStatusSuggestions)}
      {renderOptionButtons("Tags", "tags", allTagSuggestions)}
      {renderOptionButtons("Roles", "roles", allRoleSuggestions)}
      {renderOptionButtons(
        "Contributions",
        "contributions",
        contributionsOptions
      )}
    </div>
  );
};

export default SidebarFilter;
