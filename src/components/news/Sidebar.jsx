import React from "react";
import TopPositions from "./TopPositions";
import TopAuthorsFollowers from "./TopAuthorsFollowers";
import TopTags from "./TopTags";
import { useTopRolesQuery, useTopTagsQuery } from "../../api/postApi";
import LoadingMotion from "../err/LoadingMotion";
import { useGetTopFollowerQuery } from "../../api/userApi";

const Sidebar = () => {
  const {
    data: positions,
    isLoading: loadingRoles,
    error: errorRoles,
  } = useTopRolesQuery(undefined, {
    pollingInterval: 30000,
  });
  const {
    data: tags,
    isLoading: loadingTags,
    error: errorTags,
  } = useTopTagsQuery(undefined, {
    pollingInterval: 30000,
  });
  const {
    data: userF,
    isLoading: loadingUser,
    error: errorUser,
  } = useGetTopFollowerQuery(undefined, {
    pollingInterval: 30000,
  });

  return (
    <aside className="hidden md:block space-y-6">
      {loadingRoles ? (
        <LoadingMotion />
      ) : errorRoles ? (
        <p className="text-red-400 text-sm">Failed to load positions</p>
      ) : (
        <TopPositions positions={positions || []} />
      )}

      {loadingUser ? (
        <LoadingMotion />
      ) : errorUser ? (
        <p className="text-red-400 text-sm">Failed to load users</p>
      ) : (
        <TopAuthorsFollowers users={userF || []} />
      )}

      {loadingTags ? (
        <LoadingMotion />
      ) : errorTags ? (
        <p className="text-red-400 text-sm">Failed to load tags</p>
      ) : (
        <TopTags tags={tags || []} />
      )}
    </aside>
  );
};

export default Sidebar;
