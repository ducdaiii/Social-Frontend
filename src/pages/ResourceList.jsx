import React, { useState } from "react";
import { useGetResourcesQuery } from "../api/resourcesApi";
import SearchInput from "../components/resource/SearchInput";
import SourceSelect from "../components/resource/SourceSelect";
import ResourceCard from "../components/resource/ResourceCard";
import LoadingMotion from "../components/err/LoadingMotion";
import ErrorPage from "../components/err/ErrorPage";

export default function ResourceList() {
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const { data: resources = [], isLoading, error } = useGetResourcesQuery();

  const filtered = resources.filter((item) => {
    const matchSource =
      selectedSource === "all" || item.source === selectedSource;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchSource && matchSearch;
  });

  return (
    <div className=" mx-auto p-5 font-sans mt-15">
      <h1 className="text-3xl font-bold mb-8 text-blue-400 drop-shadow-lg">
        📚 Study materials on technology
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-grow min-w-[280px]">
          <SearchInput value={search} onChange={setSearch} />
        </div>
        <div className="flex-shrink min-w-[160px]">
          <SourceSelect value={selectedSource} onChange={setSelectedSource} />
        </div>
      </div>

      {isLoading && <LoadingMotion />}
      {error && <ErrorPage />}

      {!isLoading && !error && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Không tìm thấy kết quả nào.
            </p>
          )}
          {filtered.map((resource, i) => (
            <ResourceCard key={i} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
