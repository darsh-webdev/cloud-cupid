import React from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client/wasm";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import PaginationComponent from "@/components/PaginationComponent";

const MembersPage = async () => {
  const members = await getMembers();

  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map((member: Member) => (
            <MemberCard key={member.id} member={member} likeIds={likeIds} />
          ))}
      </div>
      <PaginationComponent />
    </>
  );
};

export default MembersPage;
