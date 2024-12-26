import React from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client";
import MemberCard from "./MemberCard";

const MembersPage = async () => {
  const members = await getMembers();
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member: Member) => (
          <MemberCard key={member.id} member={member} />
        ))}
    </div>
  );
};

export default MembersPage;
