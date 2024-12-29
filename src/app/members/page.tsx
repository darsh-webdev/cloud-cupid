import React from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";

const MembersPage = async () => {
  const members = await getMembers();

  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member: Member) => (
          <MemberCard key={member.id} member={member} likeIds={likeIds} />
        ))}
    </div>
  );
};

export default MembersPage;
