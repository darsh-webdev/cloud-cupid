import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-default">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
