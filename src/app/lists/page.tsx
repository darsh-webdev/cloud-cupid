import React from "react";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";
import ListsTab from "./ListsTab";

const ListsPage = async ({
  searchParams: { type },
}: {
  searchParams: { type: string };
}) => {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
