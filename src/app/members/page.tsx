import React from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client/wasm";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParams } from "@/types";
import NoResultsCard from "@/components/NoResultsCard";

const MembersPage = async ({
  searchParams,
}: {
  searchParams: GetMemberParams;
}) => {
  const { items: members, totalCount } = await getMembers(searchParams);

  const likeIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) {
    return <NoResultsCard />;
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map((member: Member) => (
            <MemberCard key={member.id} member={member} likeIds={likeIds} />
          ))}
      </div>
      <PaginationComponent totalCount={totalCount} />
    </>
  );
};

export default MembersPage;
